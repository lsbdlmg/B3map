
struct Instance {
    model : mat4x4<f32>,      // 0~63 bytes
    textureIndex : f32,        // 64-67 后面不用补 
};
struct sunLightUniform{
    position: vec4<f32>,
    intensity: f32,
}
// 单个聚光灯结构 (占用 64 Bytes)
struct SpotLight {
    position: vec3<f32>,  // [0, 1, 2]
    range: f32,           // [3] 光照有效距离（用于剔除）
    
    direction: vec3<f32>, // [4, 5, 6]
    intensity: f32,       // [7] 强度
    
    color: vec3<f32>,     // [8, 9, 10] 光的颜色（预留扩展）
    innerCone: f32,       // [11]
    
    outerCone: f32,       // [12]
    shadowIndex: f32,     // [13] 对应阴影贴图数组的下标，-1表示不开阴影
    _pad1: f32,           // [14] 填充位
    _pad2: f32,           // [15] 填充位
    matrix: mat4x4<f32>,  // [16-79] 矩阵数据
};

// 光源集合
struct LightData {
    lightCount: u32,      // 光源总数
    // _pad: vec3<u32>,      // 不要补齐 上一个没读完直接自动补齐的
    lights: array<SpotLight>, // 动态数组
};
//物体相关
@group(1) @binding(0) var<storage, read> instances : array<Instance>;// 实例数据存储缓冲区
@group(1) @binding(1) var renderSampler : sampler;// 普通采样器
@group(1) @binding(2) var textureArray : texture_2d_array<f32>;// 物体纹理数组

// 阴影相关
@group(1) @binding(3) var shadowSampler : sampler_comparison;// 阴影采样器 太阳光和聚光灯共用
// 太阳光相关
@group(1) @binding(4) var<uniform> sunLight : sunLightUniform;// 太阳光 属性
@group(1) @binding(5) var sunShadowMapHigh : texture_depth_2d;// 太阳光阴影 High
@group(1) @binding(6) var sunShadowMapMid : texture_depth_2d;// 太阳光阴影 Mid
@group(1) @binding(7) var sunShadowMapLow : texture_depth_2d;// 太阳光阴影 Low
@group(1) @binding(8) var<uniform> sunMatrixHigh : mat4x4<f32>; // 太阳光矩阵 High
@group(1) @binding(9) var<uniform> sunMatrixMid : mat4x4<f32>; // 太阳光矩阵 Mid
@group(1) @binding(10) var<uniform> sunMatrixLow : mat4x4<f32>; // 太阳光矩阵 Low
// 聚光灯相关
@group(1) @binding(11) var<storage, read> spotLights : LightData;
@group(1) @binding(12) var spotLightShadowMapArray : texture_depth_2d_array;

// 根据 textureIndex 获取纹理颜色
fn getTextureColor(uv: vec2<f32>, textureIndex: f32) -> vec3<f32> {
    if(textureIndex==100.0){
        return vec3<f32>(0.286, 0.369, 0.373);
    }
    else if(textureIndex==101.0){
        return vec3<f32>(0.24, 0.08, 0.08);
    }
    else if(textureIndex==102.0){
        return vec3<f32>(0.24, 1.0, 1.0);
    }
    else if(textureIndex==103.0){
        return vec3<f32>(215.0/255.0, 208.0/255.0, 198.0/255.0);
    }else{
        return textureSampleLevel(textureArray, renderSampler, uv, i32(textureIndex), 0.0).rgb;
    }
}
// 计算太阳光阴影
fn getSunShadow(worldPos: vec4<f32> , fragNormal: vec3<f32>) -> vec3<f32>{ 
    // 太阳光计算
    var sunShadow: f32 = 0.0;
    // 计算阴影坐标
    // 高中低级联阴影
    let ndc_sunHigh = (sunMatrixHigh * worldPos).xyz / (sunMatrixHigh * worldPos).w;
    var sunShadowPosHigh = vec3<f32>(ndc_sunHigh.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc_sunHigh.z);
    let ndc_sunMid = (sunMatrixMid * worldPos).xyz / (sunMatrixMid * worldPos).w;
    var sunShadowPosMid = vec3<f32>(ndc_sunMid.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc_sunMid.z);
    let ndc_sunLow = (sunMatrixLow * worldPos).xyz / (sunMatrixLow * worldPos).w;
    var sunShadowPosLow = vec3<f32>(ndc_sunLow.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc_sunLow.z);

    // 检查级联层级
    let inHigh = sunShadowPosHigh.x > 0.0 && sunShadowPosHigh.x < 1.0 && sunShadowPosHigh.y > 0.0 && sunShadowPosHigh.y < 1.0;
    let inMid = sunShadowPosMid.x > 0.0 && sunShadowPosMid.x < 1.0 && sunShadowPosMid.y > 0.0 && sunShadowPosMid.y < 1.0;
    // 根据级联层级采样阴影
    if (inHigh) {
        let size3 = f32(textureDimensions(sunShadowMapHigh).x);
        for(var y: i32 = -1; y <= 0; y = y + 1){
            for(var x: i32 = -1; x <= 0; x = x + 1){
                let offset = vec2<f32>(f32(x)/size3, f32(y)/size3);
                sunShadow = sunShadow + textureSampleCompareLevel(sunShadowMapHigh, shadowSampler, sunShadowPosHigh.xy + offset, sunShadowPosHigh.z - 0.002);
            }
        }
        sunShadow = sunShadow / 4.0;
        // sunShadow= textureSampleCompareLevel(sunShadowMapHigh, shadowSampler, sunShadowPosHigh.xy, sunShadowPosHigh.z - 0.002);
    } 
    else if (inMid) {
        let size4 = f32(textureDimensions(sunShadowMapMid).x);
         for(var y: i32 = -1; y <= 0; y = y + 1){
            for(var x: i32 = -1; x <= 0; x = x + 1){
                let offset = vec2<f32>(f32(x)/size4, f32(y)/size4);
                sunShadow = sunShadow + textureSampleCompareLevel(sunShadowMapMid, shadowSampler, sunShadowPosMid.xy + offset, sunShadowPosMid.z - 0.006);
            }
        }
        sunShadow = sunShadow / 4.0;
        // sunShadow = sunShadow + textureSampleCompareLevel(sunShadowMapMid, shadowSampler, sunShadowPosMid.xy, sunShadowPosMid.z - 0.006);
    } else {
        sunShadow = textureSampleCompareLevel(sunShadowMapLow, shadowSampler, sunShadowPosLow.xy, sunShadowPosLow.z - 0.015);
    }
    // sunShadow= textureSampleCompare(sunShadowMapLow, shadowSampler, sunShadowPosLow.xy , sunShadowPosLow.z - 0.005);
    var diffuse: f32=1.0;
    diffuse = max(dot(normalize(sunLight.position.xyz), fragNormal), 0.0);
    
    let lightFactor = min(0.3 + sunShadow * diffuse, 1.0) * sunLight.intensity;
    // 太阳光默认白色(或可扩展)
    let sunColor = vec3(1.0, 1.0, 1.0) * lightFactor; 
    return sunColor;
}
// 计算聚光灯阴影
fn getSpotLightShadow(worldPos: vec4<f32>, fragNormal : vec3<f32>,fragPosition: vec3<f32>) -> vec3<f32>{
    var totalSpotLight = vec3(0.0);
    let lightCount = spotLights.lightCount;

    // 循环遍历所有光源
    for (var i: u32 = 0u; i < lightCount; i++) {
        let light = spotLights.lights[i];

        // 1. 距离剔除
        let dist = distance(fragPosition, light.position);
        if (dist > light.range) { continue; }

        let lightDir = normalize(-light.direction);
        let L = normalize(light.position - fragPosition);
        let cosAngle = dot(lightDir, L);

        // 2. 角度剔除
        if (cosAngle < light.outerCone) { continue; }
        var shadow: f32 = 0.0;
        let diffuse = max(dot(L, fragNormal), 0.0);
        if(diffuse<=0.0){continue;}
        // 3. 阴影计算
        if (light.shadowIndex >= 0.0) {
            var sPos : vec3<f32>;
            var validShadow = false;
            let ndc = (light.matrix * worldPos).xyz / (light.matrix * worldPos).w;
            sPos = vec3<f32>(ndc.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc.z);

            // PCF (简化版)
            let size = f32(textureDimensions(spotLightShadowMapArray).x);
            // 3x3 PCF
            for(var y: i32 = -1; y <= 0; y = y + 1){
                for(var x: i32 = -1; x <= 0; x = x + 1){
                    let offset = vec2<f32>(f32(x)/size, f32(y)/size);
                    
                    shadow = shadow + textureSampleCompareLevel(
                        spotLightShadowMapArray, 
                        shadowSampler, 
                        sPos.xy + offset, 
                        i32(light.shadowIndex), // Layer Index
                        sPos.z - 0.0001
                    );
                }
            }
            shadow = shadow / 4.0;
        } else { shadow = 1.0; }

        // 4. 光照叠加
        var intensity = smoothstep(light.outerCone, light.innerCone, cosAngle);
        // // 距离衰减 (可选)
        // let att = 1.0 - smoothstep(light.range * 0.8, light.range, dist);
        // intensity = intensity * att;

      
        let factor = min(shadow * diffuse * intensity, 1.0) * light.intensity;
        
        // 累加 RGB 颜色
        totalSpotLight += light.color * factor;
    }
    return totalSpotLight;
}
// 片元着色器主函数
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) worldPos: vec4<f32>,
    @location(4) @interpolate(flat) instanceIndex : u32,
) -> @location(0) vec4<f32> {
    let instance = instances[instanceIndex]; // 获取实例数据
    let textureColor = getTextureColor(fragUV, instance.textureIndex);
    // 计算聚光灯
    let totalSpotLight = getSpotLightShadow(worldPos,fragNormal,fragPosition);
    // 计算太阳光
    let sunColor = getSunShadow(worldPos,fragNormal); 
    // 环境光
    let ambient = 0.2 ;
    let totalLight = (totalSpotLight * 0.3) + sunColor + vec3(ambient);
    return vec4<f32>(textureColor * totalLight, 1.0);
}
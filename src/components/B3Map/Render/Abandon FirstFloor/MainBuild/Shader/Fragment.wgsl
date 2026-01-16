
struct objectUniform{
    textureIndex: f32,
}

struct spotLightUniform{
    position: vec3<f32>,
    direction: vec3<f32>,
    _padding: f32,
    innerCone: f32,
    outerCone: f32,
}

struct sunLightUniform{
    position: vec4<f32>,
    intensity: f32,
}

@group(1) @binding(0) var<uniform> spotLight : spotLightUniform;
@group(1) @binding(1) var spotLightShadowMap : texture_depth_2d;
@group(1) @binding(2) var spotLightShadowSampler : sampler_comparison;
@group(1) @binding(3) var<uniform> spotLight2 : spotLightUniform;
@group(1) @binding(4) var spotLightShadowMap2 : texture_depth_2d;
@group(1) @binding(5) var spotLightShadowSampler2 : sampler_comparison;
@group(1) @binding(6) var<uniform> sunLight : sunLightUniform;
@group(1) @binding(7) var sunShadowMap : texture_depth_2d;
@group(1) @binding(8) var sunShadowSampler : sampler_comparison;
@group(1) @binding(9) var renderSampler : sampler;
@group(1) @binding(10) var<uniform> object : objectUniform;
@group(1) @binding(11) var woodTexture : texture_2d<f32>;
@group(1) @binding(12) var brickOneTexture : texture_2d<f32>;
@group(1) @binding(13) var grassTexture : texture_2d<f32>;
@group(1) @binding(14) var brickTwoTexture : texture_2d<f32>;
@group(1) @binding(15) var worldGroud : texture_2d<f32>;

fn getTexture(index: f32, uv: vec2<f32>, localPos: vec3<f32>) -> vec3<f32>{
    if(index == 0.0){
        return textureSample(woodTexture, renderSampler, uv).rgb;
    }else if(index == 1.0){
        return textureSample(brickOneTexture, renderSampler, uv).rgb;
    }else if(index == 2.0){
        return vec3<f32>(1.0, 0.5, 0.1);
    }else if(index == 3.0){
        return textureSample(grassTexture, renderSampler, uv).rgb;
    }else if(index == 4.0){
        return textureSample(brickTwoTexture, renderSampler, uv).rgb;
    }else if(index == 5.0){
        return textureSample(worldGroud, renderSampler, uv).rgb;
    }else if(index == 6.0){
        return vec3<f32>(0.286, 0.369, 0.373);
    }else if(index == 7.0){
        let uvLeft  = vec2<f32>(uv.x * 2.0, uv.y);
        let uvRight = vec2<f32>((uv.x - 0.5) * 2.0, uv.y);
        let uvFinal = select(uvRight, uvLeft, localPos.z > 0.0);
        let leftColor  = textureSample(brickOneTexture, renderSampler, uvFinal).rgb;
        let rightColor = textureSample(brickTwoTexture, renderSampler, uvFinal).rgb;
        return select(rightColor, leftColor, localPos.z > 0.0);
    }else if(index == 8.0){
        let uvLeft  = vec2<f32>(uv.x * 2.0, uv.y);
        let uvRight = vec2<f32>((uv.x - 0.5) * 2.0, uv.y);
        let uvFinal = select(uvRight, uvLeft, localPos.z < -0.2);
        let leftColor  = textureSample(brickOneTexture, renderSampler, uvFinal).rgb;
        let rightColor = textureSample(brickTwoTexture, renderSampler, uvFinal).rgb;
        return select(rightColor, leftColor, localPos.z < -0.2);
    }else if(index == 9.0){
        return vec3<f32>(0.24, 0.08, 0.08);
    }
    
    else{
        return vec3<f32>(1.0,1.0,1.0);
    }
}

@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
    @location(4) shadowPos2: vec3<f32>,
    @location(5) shadowPos3: vec3<f32>,
    @location(6) localPos: vec3<f32>,

) -> @location(0) vec4<f32> {
    let textureColor = getTexture(object.textureIndex, fragUV, localPos);

    let lightDir = normalize(-spotLight.direction);
    let L = normalize(spotLight.position - fragPosition);
    var cosAngle = dot(lightDir, L);
    var shadow: f32 = 0.0;
    let size = f32(textureDimensions(spotLightShadowMap).x);
    for(var y: i32 = -1; y <= 5; y = y + 1){
        for(var x: i32 = -1; x <= 5; x = x + 1){
            let offset = vec2<f32>(f32(x)/size, f32(y)/size);
            shadow = shadow + textureSampleCompare(spotLightShadowMap, spotLightShadowSampler, shadowPos.xy + offset, shadowPos.z - 0.0001);
        }
    }
    shadow = shadow / 36.0;
    var intensity = smoothstep(spotLight.outerCone, spotLight.innerCone, cosAngle);
    let diffuse = max(dot(normalize(spotLight.position - fragPosition), fragNormal), 0.0);
    let lightFactor = min(shadow * diffuse * intensity, 1.0);

    let lightDir2 = normalize(-spotLight2.direction);
    let L2 = normalize(spotLight2.position - fragPosition);
    var cosAngle2 = dot(lightDir2, L2);
    var shadow2: f32 = 0.0;
    let size2 = f32(textureDimensions(spotLightShadowMap2).x);
    for(var y: i32 = -1; y <= 5; y = y + 1){
        for(var x: i32 = -1; x <= 5; x = x + 1){
            let offset = vec2<f32>(f32(x)/size2, f32(y)/size2);
            shadow2 = shadow2 + textureSampleCompare(spotLightShadowMap2, spotLightShadowSampler2, shadowPos2.xy + offset, shadowPos2.z - 0.0001);
        }
    }
    shadow2 = shadow2 / 36.0;
    var intensity2 = smoothstep(spotLight2.outerCone, spotLight2.innerCone, cosAngle2);
    let diffuse2 = max(dot(normalize(spotLight2.position - fragPosition), fragNormal), 0.0);
    let lightFactor2 = min(shadow2 * diffuse2 * intensity2, 1.0);

    let L3 = normalize(sunLight.position.xyz - fragPosition);
    var shadow3: f32 = 0.0;
    let size3 = f32(textureDimensions(sunShadowMap).x);
    for(var y: i32 = -1; y <= 5; y = y + 1){
        for(var x: i32 = -1; x <= 5; x = x + 1){
            let offset = vec2<f32>(f32(x)/size3, f32(y)/size3);
            shadow3 = shadow3 + textureSampleCompare(sunShadowMap, sunShadowSampler, shadowPos3.xy + offset, shadowPos3.z - 0.005);
        }
    }
    shadow3 = shadow3 / 36.0;
    var diffuse3: f32=1.0;
    if(object.textureIndex==2.0){
        diffuse3=1.0;
    }else{
        diffuse3 = max(dot(normalize(sunLight.position.xyz), fragNormal), 0.0);
    }
    let lightFactor3 = min(0.3 + shadow3 * diffuse3, 1.0) * sunLight.intensity;

    let ambient = 0.3;
    let total = (lightFactor * 0.3) + (lightFactor2 * 0.3) + lightFactor3;
    return vec4<f32>(textureColor * (ambient + total), 1.0);
}


// struct objectUniform{
//     textureIndex: f32,
// }
// struct spotLightUniform{
//     position: vec3<f32>,
//     direction: vec3<f32>,
//     _padding: f32,
//     innerCone: f32,
//     outerCone: f32,
// }
// //灯光属性
// struct sunLightUniform{
//     position: vec4<f32>,
//     intensity: f32,
//     // dayTime: f32
// }
// @group(1) @binding(0) var<uniform> spotLight: spotLightUniform;
// @group(1) @binding(1) var spotLightShadowMap: texture_depth_2d;
// @group(1) @binding(2) var spotLightshadowSampler: sampler_comparison;
// @group(1) @binding(3) var renderSampler: sampler;
// @group(1) @binding(4) var<uniform> object: objectUniform;
// @group(1) @binding(5) var woodTexture: texture_2d<f32>;
// @group(1) @binding(6) var brickTexture: texture_2d<f32>;
// @group(1) @binding(7) var<uniform> spotLight2: spotLightUniform;
// @group(1) @binding(8) var spotLightShadowMap2: texture_depth_2d;
// @group(1) @binding(9) var spotLightshadowSampler2: sampler_comparison;
// @group(1) @binding(10) var<uniform> sunLight: sunLightUniform;
// @group(1) @binding(11) var spotLightShadowMap3: texture_depth_2d;
// @group(1) @binding(12) var spotLightshadowSampler3: sampler_comparison;

// fn getTexture(index: f32,uv: vec2<f32>) -> vec3<f32>{
//     if(index == 0.0){
//         return textureSample(woodTexture, renderSampler, uv).rgb;
//     }else if(index == 1.0){
//         return textureSample(brickTexture, renderSampler, uv).rgb;
//     }else if(index == 2.0){
//         //返回太阳光
//         return vec3<f32>(1.0, 0.5, 0.1);
//     }
//     else{
//         // 默认返回白色
//         return vec3<f32>(1.0,1.0,1.0);
//     }
// }
// @fragment
// fn main(
//     @location(0) fragPosition : vec3<f32>,
//     @location(1) fragNormal: vec3<f32>,
//     @location(2) fragUV: vec2<f32>,
//     @location(3) shadowPos: vec3<f32>,
//     @location(4) shadowPos2: vec3<f32>,
//     @location(5) shadowPos3: vec3<f32>,
    
// ) -> @location(0) vec4<f32> {
//     let textureColor = getTexture(object.textureIndex,fragUV);
//     let lightDir = normalize(-spotLight.direction); // 光从光源发出的方向
//     let L = normalize(spotLight.position-fragPosition); // 从光源到片元
//     var cosAngle = dot(lightDir, L);// 计算光线与聚光灯方向的夹角余弦值
//     // let shadow=textureSampleCompare(spotLightShadowMap, spotLightshadowSampler, shadowPos.xy, shadowPos.z- 0.0001);// 阴影
//     var shadow : f32 = 0.0;
//     // 使阴影更加柔和
//     let size = f32(textureDimensions(spotLightShadowMap).x);
//     for (var y : i32 = -1 ; y <= 5 ; y = y + 1) {
//         for (var x : i32 = -1 ; x <= 5 ; x = x + 1) {
//             let offset = vec2<f32>(f32(x) / size, f32(y) / size);
//             shadow = shadow + textureSampleCompare(
//                 spotLightShadowMap, 
//                 spotLightshadowSampler,
//                 shadowPos.xy + offset, 
//                 shadowPos.z - 0.0001  // apply a small bias to avoid acne
//             );
//         }
//     }
//     shadow = shadow / 36.0;
//     // if(shadow==0.0){
//     //     return vec4<f32>(0.5,0.5,0.5,1.0);
//     // }
//     // if(spotLight.outerCone==0.5){
//     //     return vec4<f32>(0.5,0.5,0.5,1.0);
//     // }
//     // return vec4<f32>(textureColor , 1.0);
//     var intensity = smoothstep(spotLight.outerCone, spotLight.innerCone, cosAngle);// 计算强度
//     let diffuse = max(dot(normalize(spotLight.position.xyz - fragPosition), fragNormal), 0.0);// 漫反射
//     let lightFactor = min(shadow*diffuse*intensity, 1.0);// 环境光+漫反射+阴影
//     // let lightFactor=vec3<f32>(0.0);

//     let lightDir2 = normalize(-spotLight2.direction); // 光从光源发出的方向
//     let L2 = normalize(spotLight2.position-fragPosition); // 从光源到片元
//     var cosAngle2 = dot(lightDir2, L2);// 计算光线与聚光灯方向的夹角余弦值
//     var shadow2 : f32 = 0.0;
//     // 使阴影更加柔和
//     let size2 = f32(textureDimensions(spotLightShadowMap2).x);
//     for (var y : i32 = -1 ; y <= 5 ; y = y + 1) {
//         for (var x : i32 = -1 ; x <= 5 ; x = x + 1) {
//             let offset = vec2<f32>(f32(x) / size2, f32(y) / size2);
//             shadow2 = shadow2 + textureSampleCompare(
//                 spotLightShadowMap2, 
//                 spotLightshadowSampler2,
//                 shadowPos2.xy + offset, 
//                 shadowPos2.z - 0.0001  // apply a small bias to avoid acne
//             );
//         }
//     }
//     shadow2 = shadow2 / 36.0;
//     var intensity2 = smoothstep(spotLight2.outerCone, spotLight2.innerCone, cosAngle2);// 计算强度
//     let diffuse2 = max(dot(normalize(spotLight2.position.xyz - fragPosition), fragNormal), 0.0);// 漫反射
//     let lightFactor2 = min(shadow2*diffuse2*intensity2, 1.0);// 环境光+漫反射+阴影

//     // 太阳光
//     let L3 = normalize(sunLight.position.xyz - fragPosition); // 从光源到片元    
//     var shadow3 : f32 = 0.0;
//     // 使阴影更加柔和
//     let size3 = f32(textureDimensions(spotLightShadowMap3).x);
//     for (var y : i32 = -1 ; y <= 5 ; y = y + 1) {
//         for (var x : i32 = -1 ; x <= 5 ; x = x + 1) {
//             let offset = vec2<f32>(f32(x) / size3, f32(y) / size3);
//             shadow3 = shadow3 + textureSampleCompare(
//                 spotLightShadowMap3, 
//                 spotLightshadowSampler3,
//                 shadowPos3.xy + offset, 
//                 shadowPos3.z - 0.005  // apply a small bias to avoid acne
//             );
//         }
//     }
//     shadow3 = shadow3 / 36.0;
//     var diffuse3: f32=1.0;
//     if(object.textureIndex==2.0){
//         diffuse3=1.0;
//     }else{
//         diffuse3 = max(dot(normalize(sunLight.position.xyz), fragNormal), 0.0);
//     }


//     let lightFactor3 = min(0.3 + shadow3 *diffuse3, 1.0)*sunLight.intensity;
//     // return vec4<f32>(textureColor * (0.3+lightFactor),1.0);
//     let ambient = 0.3;
//     let totalLight = clamp(lightFactor + lightFactor2, 0.0, 1.0);

//     let total = (lightFactor * 0.3) + (lightFactor2 * 0.3) + lightFactor3;
//     return vec4<f32>(textureColor * (ambient + total), 1.0);




// }

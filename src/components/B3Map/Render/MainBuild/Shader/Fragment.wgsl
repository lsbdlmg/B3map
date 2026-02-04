
struct Instance {
    model : mat4x4<f32>,      // 0~63 bytes
    textureIndex : f32,        // 64-67 后面不用补 
};
struct objectUniform{
    light1: f32,
    light2: f32,
    _padding: vec2<f32>,
};
struct spotLightUniform{
    position: vec3<f32>,
    direction: vec3<f32>,
    _padding: f32,
    innerCone: f32,
    outerCone: f32,
    intensity: f32,
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
@group(1) @binding(11) var textureArray : texture_2d_array<f32>;
@group(1) @binding(12) var<storage, read> instances : array<Instance>;
@group(1) @binding(13) var sunShadowMapMid : texture_depth_2d;
@group(1) @binding(14) var sunShadowSamplerMid : sampler_comparison;
@group(1) @binding(15) var sunShadowMapLow : texture_depth_2d;
@group(1) @binding(16) var sunShadowSamplerLow : sampler_comparison;
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
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
    @location(4) shadowPos2: vec3<f32>,
    @location(5) shadowPos3: vec3<f32>, // High
    @location(6) localPos: vec3<f32>,
    @location(7) textureIndex: f32,
    @location(8)
    @interpolate(flat)
    instanceIndex : u32,
    @location(9) shadowPos4: vec3<f32>, // Mid
    @location(10) shadowPos5: vec3<f32>, // Low
) -> @location(0) vec4<f32> {
    let instance = instances[instanceIndex]; // 获取实例数据
    let texIndex = instance.textureIndex;
    // var textureColor = textureSample(textureArray, renderSampler, fragUV, i32(textureIndex)).rgb;
    var textureColor = getTextureColor(fragUV, texIndex);

    let lightDir = normalize(-spotLight.direction);
    let L = normalize(spotLight.position - fragPosition);
    var cosAngle = dot(lightDir, L);
    var shadow: f32 = 0.0;
    let size = f32(textureDimensions(spotLightShadowMap).x);
    for(var y: i32 = -1; y <= 0; y = y + 1){
        for(var x: i32 = -1; x <= 0; x = x + 1){
            let offset = vec2<f32>(f32(x)/size, f32(y)/size);
            shadow = shadow + textureSampleCompareLevel(spotLightShadowMap, spotLightShadowSampler, shadowPos.xy + offset, shadowPos.z - 0.0001);
        }
    }
    shadow = shadow / 4.0;
    // shadow= textureSampleCompare(spotLightShadowMap, spotLightShadowSampler, shadowPos.xy , shadowPos.z - 0.0001);
    var intensity = smoothstep(spotLight.outerCone, spotLight.innerCone, cosAngle);
    let diffuse = max(dot(normalize(spotLight.position - fragPosition), fragNormal), 0.0);
    var lightFactor = min(shadow * diffuse * intensity, 1.0) * spotLight.intensity;





    let lightDir2 = normalize(-spotLight2.direction);
    let L2 = normalize(spotLight2.position - fragPosition);
    var cosAngle2 = dot(lightDir2, L2);
    var shadow2: f32 = 0.0;
    // if(texIndex==102.0){
    //     let size2 = f32(textureDimensions(spotLightShadowMap2).x);
    //     for(var y: i32 = -1; y <= 0; y = y + 1){
    //         for(var x: i32 = -1; x <= 0; x = x + 1){
    //             let offset = vec2<f32>(f32(x)/size2, f32(y)/size2);
    //             shadow2 = shadow2 + textureSampleCompareLevel(spotLightShadowMap2, spotLightShadowSampler2, shadowPos2.xy + offset, shadowPos2.z - 0.0001);
    //         }
    //     }
    //     shadow2 = shadow2 / 4.0;
    // }
    let size2 = f32(textureDimensions(spotLightShadowMap2).x);
    for(var y: i32 = -1; y <= 0; y = y + 1){
        for(var x: i32 = -1; x <= 0; x = x + 1){
            let offset = vec2<f32>(f32(x)/size2, f32(y)/size2);
            shadow2 = shadow2 + textureSampleCompareLevel(spotLightShadowMap2, spotLightShadowSampler2, shadowPos2.xy + offset, shadowPos2.z - 0.0001);
        }
    }
    shadow2 = shadow2 / 4.0;
    // shadow2= textureSampleCompare(spotLightShadowMap2, spotLightShadowSampler2, shadowPos2.xy , shadowPos2.z - 0.0001);

    var intensity2 = smoothstep(spotLight2.outerCone, spotLight2.innerCone, cosAngle2);
    let diffuse2 = max(dot(normalize(spotLight2.position - fragPosition), fragNormal), 0.0);
    var lightFactor2 = min(shadow2 * diffuse2 * intensity2, 1.0) * spotLight2.intensity;






    let L3 = normalize(sunLight.position.xyz - fragPosition);
    var shadow3: f32 = 0.0;
    
    // Check Cascade Level
    let inHigh = shadowPos3.x > 0.0 && shadowPos3.x < 1.0 && shadowPos3.y > 0.0 && shadowPos3.y < 1.0;
    let inMid = shadowPos4.x > 0.0 && shadowPos4.x < 1.0 && shadowPos4.y > 0.0 && shadowPos4.y < 1.0;

    if (inHigh) {
        // High Quality PCF (existing logic)
        let size3 = f32(textureDimensions(sunShadowMap).x);
        for(var y: i32 = -1; y <= 0; y = y + 1){
            for(var x: i32 = -1; x <= 0; x = x + 1){
                let offset = vec2<f32>(f32(x)/size3, f32(y)/size3);
                // 使用 Level 避免非均匀控制流错误
                shadow3 = shadow3 + textureSampleCompareLevel(sunShadowMap, sunShadowSampler, shadowPos3.xy + offset, shadowPos3.z - 0.002);
            }
        }
        shadow3 = shadow3 / 4.0;
        // shadow3= textureSampleCompareLevel(sunShadowMap, sunShadowSampler, shadowPos3.xy, shadowPos3.z - 0.002);
    } 
    else if (inMid) {
        // Mid Quality
        let size4 = f32(textureDimensions(sunShadowMapMid).x);
        // Reduce PCF or keep it
         for(var y: i32 = -1; y <= 0; y = y + 1){
            for(var x: i32 = -1; x <= 0; x = x + 1){
                let offset = vec2<f32>(f32(x)/size4, f32(y)/size4);
                // 使用 Level 避免非均匀控制流错误
                shadow3 = shadow3 + textureSampleCompareLevel(sunShadowMapMid, sunShadowSamplerMid, shadowPos4.xy + offset, shadowPos4.z - 0.006);
            }
        }
        shadow3 = shadow3 / 4.0;
        // shadow3 = shadow3 + textureSampleCompareLevel(sunShadowMapMid, sunShadowSamplerMid, shadowPos4.xy, shadowPos4.z - 0.006);

    } else {
        // Low Quality (Single sample or simple PCF)
        // 使用 Level 避免非均匀控制流错误
        shadow3 = textureSampleCompareLevel(sunShadowMapLow, sunShadowSamplerLow, shadowPos5.xy, shadowPos5.z - 0.015);
    }
    // shadow3= textureSampleCompare(sunShadowMap, sunShadowSampler, shadowPos3.xy , shadowPos3.z - 0.005);
    // if(shadow>0.0){return vec4<f32>(1.0, 1.0, 0.0, 1.0);}
    var diffuse3: f32=1.0;
    diffuse3 = max(dot(normalize(sunLight.position.xyz), fragNormal), 0.0);
    
    let lightFactor3 = min(0.3 + shadow3 * diffuse3, 1.0) * sunLight.intensity;

    let ambient = 0.3 ;
    let total = (lightFactor * 0.3) + (lightFactor2 * 0.3) + lightFactor3;
    // let total = lightFactor3;
    // let total = 0.0;

    // let ambient =0.3;
    // var total: f32 = 0.0;
    // if(texIndex==100.0){
    //     textureColor=vec3<f32>(0.286, 0.369, 0.373);
    // }
    // else if(texIndex==101.0){
    //     textureColor=vec3<f32>(0.24, 0.08, 0.08);
    // }
    // else if(texIndex==102.0){
    //     textureColor=vec3<f32>(0.24, 1.0, 1.0);
    // }
    // else if(texIndex==103.0){
    //     textureColor=vec3<f32>(215.0/255.0, 208.0/255.0, 198.0/255.0);
    // }
    
    return vec4<f32>(textureColor * (ambient + total), 1.0);
}


// fn getTexture(index: f32, uv: vec2<f32>, localPos: vec3<f32>) -> vec3<f32>{
//     if(index == 0.0){
//         return textureSample(woodTexture, renderSampler, uv).rgb;
//     }else if(index == 1.0){
//         return textureSample(brickOneTexture, renderSampler, uv).rgb;
//     }else if(index == 2.0){
//         return vec3<f32>(1.0, 0.5, 0.1);
//     }else if(index == 3.0){
//         return textureSample(grassTexture, renderSampler, uv).rgb;
//     }else if(index == 4.0){
//         return textureSample(brickTwoTexture, renderSampler, uv).rgb;
//     }else if(index == 5.0){
//         return textureSample(worldGroud, renderSampler, uv).rgb;
//     }else if(index == 6.0){
//         return vec3<f32>(0.286, 0.369, 0.373);
//     }else if(index == 7.0){
//         let uvLeft  = vec2<f32>(uv.x * 2.0, uv.y);
//         let uvRight = vec2<f32>((uv.x - 0.5) * 2.0, uv.y);
//         let uvFinal = select(uvRight, uvLeft, localPos.z > 0.0);
//         let leftColor  = textureSample(brickOneTexture, renderSampler, uvFinal).rgb;
//         let rightColor = textureSample(brickTwoTexture, renderSampler, uvFinal).rgb;
//         return select(rightColor, leftColor, localPos.z > 0.0);
//     }else if(index == 8.0){
//         let uvLeft  = vec2<f32>(uv.x * 2.0, uv.y);
//         let uvRight = vec2<f32>((uv.x - 0.5) * 2.0, uv.y);
//         let uvFinal = select(uvRight, uvLeft, localPos.z < -0.2);
//         let leftColor  = textureSample(brickOneTexture, renderSampler, uvFinal).rgb;
//         let rightColor = textureSample(brickTwoTexture, renderSampler, uvFinal).rgb;
//         return select(rightColor, leftColor, localPos.z < -0.2);
//     }else if(index == 9.0){
//         return vec3<f32>(0.24, 0.08, 0.08);
//     }
    
//     else{
//         return vec3<f32>(1.0,1.0,1.0);
//     }
// }
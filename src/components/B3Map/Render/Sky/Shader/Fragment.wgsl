struct objectUniform{
    textureIndex: f32,
}
@group(1) @binding(0) var renderSampler : sampler;
@group(1) @binding(1) var<uniform> object : objectUniform;
@group(1) @binding(2) var sky_daytime_Texture: texture_cube<f32>;
@group(1) @binding(3) var sky_night_Texture : texture_cube<f32>;
fn getTexture(index: f32, dir: vec3<f32>) -> vec3<f32>{
    if(index == 0.0){
        return textureSample(sky_daytime_Texture, renderSampler,normalize(dir)).rgb;
    }else if(index == 1.0){
        return textureSample(sky_night_Texture, renderSampler,normalize(dir)).rgb;
    }else{
        return vec3<f32>(1.0,1.0,1.0);
    }
}
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) dir : vec3<f32>
) -> @location(0) vec4<f32> {
    let textureColor = getTexture(object.textureIndex, dir);
    return vec4<f32>(textureColor, 1.0);
}
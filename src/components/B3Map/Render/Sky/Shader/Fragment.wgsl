struct objectUniform{
    textureIndex: f32,
}
@group(1) @binding(0) var renderSampler : sampler;
@group(1) @binding(1) var<uniform> object : objectUniform;
@group(1) @binding(2) var skyCubeArray : texture_cube_array<f32>;
@fragment
fn main(
    @location(0) dir : vec3<f32>
) -> @location(0) vec4<f32> {
    return textureSample(skyCubeArray, renderSampler, normalize(dir), (i32(object.textureIndex)));
}
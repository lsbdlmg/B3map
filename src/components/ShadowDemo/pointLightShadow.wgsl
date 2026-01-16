@group(0) @binding(0) var<uniform> model : mat4x4<f32>;
@group(0) @binding(1) var<uniform> pointLightMatrix: array<mat4x4<f32>, 6>;
struct VertexInput {
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
}

@vertex
fn main(
    in: VertexInput,
    @builtin(instance_index) face: u32, // 0~5
) -> VertexOutput {
    let world = model * vec4<f32>(in.position, 1.0);
    var out: VertexOutput;
    out.position = pointLightMatrix[face] * world;
    return out;
}

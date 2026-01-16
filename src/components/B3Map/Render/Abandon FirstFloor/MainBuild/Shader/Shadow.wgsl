@group(0) @binding(0) var<uniform> model : mat4x4<f32>;
@group(0) @binding(1) var<uniform> spotLightMatrix: mat4x4<f32>;
struct VertexInput {
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
}
struct VertexOutput {
    @builtin(position) position : vec4<f32>,
}
@vertex
fn main(in: VertexInput) -> VertexOutput{
    var output: VertexOutput;
    output.position = spotLightMatrix * model *  vec4<f32>(in.position, 1.0);
    return output;
}
struct Matrix {
    vp : mat4x4<f32>,
    model : mat4x4<f32>,
}
@group(0) @binding(0) var<uniform> matrix : Matrix;

struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) fragPosition: vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
};

@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>
) -> VertexOutput {
    let pos = vec4<f32>(position, 1.0);
    let worldPos = matrix.model * pos;
    let posFromCamera: vec4<f32> = matrix.vp * worldPos;

    var output : VertexOutput;
    output.Position = posFromCamera;
    output.fragPosition = worldPos.xyz;
    output.fragNormal =  normalize((matrix.model * vec4<f32>(normal, 0.0)).xyz);
    return output;
}
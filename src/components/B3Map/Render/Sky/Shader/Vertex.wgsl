@group(0) @binding(0) var<uniform> mvp : mat4x4<f32>;
@group(0) @binding(1) var<uniform> model : mat4x4<f32>;

struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) fragPosition: vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) dir : vec3<f32>
};

@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
) -> VertexOutput {
    let pos = vec4<f32>(position, 1.0);
    let posFromCamera: vec4<f32> = mvp * pos;
    var output : VertexOutput;

    output.Position = posFromCamera;
    output.fragPosition = (model * pos).xyz;
    output.fragNormal =  normalize((model * vec4<f32>(normal, 0.0)).xyz);
    output.fragUV = uv;
    output.dir = pos.xyz;
    return output;
}
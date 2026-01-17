@group(0) @binding(0) var<uniform> vp : mat4x4<f32>;

struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) dir : vec3<f32>
};

@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
) -> VertexOutput {
    let pos = vec4<f32>(position, 1.0);
    let posFromCamera: vec4<f32> = vp * pos;
    var output : VertexOutput;

    output.Position = posFromCamera;
    output.dir = pos.xyz;
    return output;
}
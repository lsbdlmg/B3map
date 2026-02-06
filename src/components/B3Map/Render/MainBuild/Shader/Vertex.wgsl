struct Instance {
    model : mat4x4<f32>,      // 0~63 bytes
    textureIndex : f32,        // 64-67 后面不用补 
};
@group(0) @binding(0) var<storage, read> instances : array<Instance>;
@group(0) @binding(1) var<uniform> vp : mat4x4<f32>;
struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) fragPosition: vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) worldPos: vec4<f32>, 
    @location(4) @interpolate(flat) instanceIndex: u32,
};

@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
    @builtin(instance_index) instance_idx: u32
) -> VertexOutput {
    let instance = instances[instance_idx]; // 获取实例数据
    let model = instance.model;
    let texIndex = instance.textureIndex;

    let pos = vec4<f32>(position, 1.0);
    let worldPos = model * pos;
    let outputPos = vp * worldPos;

    var output: VertexOutput;
    output.Position = outputPos;
    output.fragPosition = worldPos.xyz;
    output.fragNormal = normalize((model * vec4<f32>(normal, 0.0)).xyz);
    output.fragUV = uv;
    output.worldPos = worldPos;
    output.instanceIndex = instance_idx;
    return output;
}
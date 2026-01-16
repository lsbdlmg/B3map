struct Instance {
    model : mat4x4<f32>,      // 0~63 bytes
    textureIndex : f32,        // 64-67 后面不用补 
};
@group(0) @binding(0) var<storage, read> instances : array<Instance>;
@group(0) @binding(1) var<uniform> vp : mat4x4<f32>;
@group(0) @binding(2) var<uniform> lightMatrix : mat4x4<f32>;
@group(0) @binding(3) var<uniform> lightMatrix2 : mat4x4<f32>;
@group(0) @binding(4) var<uniform> lightMatrix3 : mat4x4<f32>;
struct VertexOutput {
    @builtin(position) Position: vec4<f32>,
    @location(0) fragPosition: vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
    @location(4) shadowPos2: vec3<f32>,
    @location(5) shadowPos3: vec3<f32>,
    @location(6) localPos: vec3<f32>,
    @location(7) textureIndex: f32,
        // ✅ 关键
    @location(8)
    @interpolate(flat)
    instanceIndex: u32,
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
    
    // 计算阴影坐标
    let ndc1 = (lightMatrix * worldPos).xyz / (lightMatrix * worldPos).w;
    output.shadowPos = vec3<f32>(ndc1.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc1.z);

    let ndc2 = (lightMatrix2 * worldPos).xyz / (lightMatrix2 * worldPos).w;
    output.shadowPos2 = vec3<f32>(ndc2.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc2.z);

    let ndc3 = (lightMatrix3 * worldPos).xyz / (lightMatrix3 * worldPos).w;
    output.shadowPos3 = vec3<f32>(ndc3.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc3.z);

    output.localPos = position;
    output.textureIndex = texIndex;
    output.instanceIndex = instance_idx;
    return output;
}
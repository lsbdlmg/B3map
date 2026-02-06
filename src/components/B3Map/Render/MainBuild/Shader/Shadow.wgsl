struct Instance {
    model : mat4x4<f32>,      // 0~63 bytes
    textureIndex : f32,        // 64-67 后面不用补 
};

@group(0) @binding(0) var<storage, read> instances : array<Instance>;
@group(0) @binding(1) var<uniform> lightMatrix: mat4x4<f32>;
struct VertexInput {
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>,
    @builtin(instance_index) instance_idx: u32
}
struct VertexOutput {
    @builtin(position) position : vec4<f32>,

}
@vertex
fn main(in: VertexInput) -> VertexOutput{
    var output: VertexOutput;
    let instance = instances[in.instance_idx]; // 获取实例数据
    let model = instance.model;
    output.position = lightMatrix * model *  vec4<f32>(in.position, 1.0);
    return output;
}
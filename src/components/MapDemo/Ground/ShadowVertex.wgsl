//ShadowVertex.wgsl
struct ModelUniforms {
    model: mat4x4<f32>, // 物体模型矩阵
};

struct SunLight {
    lightMatrix: mat4x4<f32>, // 光源投影*视图矩阵
};

struct VertexInput {
    @location(0) position: vec3<f32>,
};

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
};

@group(0) @binding(0) var<uniform> modelUniforms: ModelUniforms;
@group(1) @binding(0) var<uniform> sunLight: SunLight;

@vertex
fn main(in: VertexInput) -> VertexOutput {
    var out: VertexOutput;
    // 物体先乘模型矩阵，再乘光源矩阵 → 光源空间位置 写入到shadowDepthTexture
    out.position = sunLight.lightMatrix * modelUniforms.model * vec4<f32>(in.position, 1.0);
    return out;
};

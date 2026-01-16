//CubeVertex.wgsl
struct GroundMatUniforms {
    mvp: mat4x4<f32>,
    model: mat4x4<f32>,
    // view: mat4x4<f32>,
    // proj: mat4x4<f32>
};
@group(0) @binding(0) var<uniform> groundMatUniforms: GroundMatUniforms;
struct SunLightUniform{
    lightDir: vec3<f32>,// 太阳光方向 
    _pad0: f32,    // padding 16 字节对齐
    lightColor: vec3<f32>,// 太阳光颜色 从16字节开始
    lightIntensity: f32,// 太阳光强度 从28字节开始
    lightMatrix: mat4x4<f32>,
}
@group(2) @binding(0) var<uniform> sunlight: SunLightUniform;
struct VertexInput{
    @location(0) position:vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>
}
struct VertexOutput{
    @builtin(position) position:vec4<f32>,
    @location(0) worldPos : vec3<f32>,
    @location(1) fragNormal : vec3<f32>,
    @location(2) fragUv : vec2<f32>,
    @location(3) shadowPos : vec3<f32>
}

@vertex
fn main(in:VertexInput)->VertexOutput{
    var output:VertexOutput;
    output.position=groundMatUniforms.mvp*vec4<f32>(in.position,1.0);
    output.worldPos = (groundMatUniforms.model * vec4<f32>(in.position, 1.0)).xyz;
    output.fragNormal = normalize((groundMatUniforms.model * vec4<f32>(in.normal, 0.0)).xyz);
    output.fragUv=in.uv;
    let posFromLight: vec4<f32> = sunlight.lightMatrix * groundMatUniforms.model * vec4<f32>(in.position,1.0);
    output.shadowPos = vec3<f32>(posFromLight.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), posFromLight.z);
    return output;
    //还要计算光源mvp
    // let lightClip =sunlight.lightMatrix*vec4<f32>(output.worldPos, 1.0);
    // let ndc = lightClip / lightClip.w;       // 透视除法
    // let uv = ndc.xy*0.5+0.5  ;             // [-1,1] → [0,1]
    // let depth = ndc.z*0.5+0.5 ;           // [-1,1] → [0,1]
    // output.shadowPos = vec3<f32>(uv, depth);
}
const vertex = /*wgsl*/ `
struct Uniforms{
    mvp:mat4x4<f32>,
    cameraPos:vec3<f32>,
    color:vec4<f32>,
    lightPos:vec3<f32>,
    model:mat4x4<f32>,
    intensity:f32,
    lightOff: f32,
    padding: vec2<f32>,      // 8 bytes (补齐对齐)
}
@group(0) @binding(0) var<uniform> uniforms:Uniforms;
struct VertexOutput{
    @builtin(position) position:vec4<f32>,
    @location(0) worldPos : vec3<f32>,
    @location(1) fragNormal : vec3<f32>,
    @location(2) fragUv : vec2<f32>,
    @location(3) RGBColor : vec4<f32>
}
struct VertexInput{
    @location(0) position:vec3<f32>,
    @location(1) normal : vec3f,
    @location(2) uv : vec2f
}
@vertex
fn main(in:VertexInput)->VertexOutput{
    var output:VertexOutput;
    output.position=uniforms.mvp*vec4<f32>(in.position,1.0);
    output.worldPos = (uniforms.model * vec4<f32>(in.position, 1.0)).xyz;
    output.fragNormal = normalize((uniforms.model * vec4<f32>(in.normal, 0.0)).xyz);
    output.fragUv=in.uv;
    output.RGBColor=vec4<f32>(in.position,1.0);
    return output;
}
`
const fragment = /*wgsl*/ `
struct Uniforms{
    mvp:mat4x4<f32>,
    cameraPos:vec3<f32>,
    color:vec4<f32>,
    lightPos:vec3<f32>,
    model:mat4x4<f32>,
    intensity:f32,
    lightOff: f32,
    isRGBTex: f32,
    isColorTex: f32,
    padding: vec2<f32>    // 8 bytes (补齐对齐)
}
@group(0) @binding(0) var<uniform> uniforms:Uniforms;
@group(1) @binding(0) var mySampler: sampler;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
struct FragmentOutput{
    @location(0) color:vec4<f32>,
}
struct FragmentInput{
   @location(0) worldPos: vec3<f32>,
   @location(1) fragNormal : vec3<f32>,
   @location(2) fragUv : vec2<f32>,
   @location(3) RGBColor : vec4<f32>
};
@fragment
fn main(in:FragmentInput)->FragmentOutput{
    var output: FragmentOutput;
    // 纹理颜色
    let texColor = textureSample(myTexture, mySampler, in.fragUv);
    // 归一化法线
    let N = normalize(in.fragNormal);
    // 点光源方向
    let L = uniforms.lightPos - in.worldPos;
    let dist = length(L);
    let Ldir = normalize(L);

    // 漫反射，带距离衰减 距离越近，光越强
    let attenuation = 10 / (dist*dist);
    let diff = max(dot(N, Ldir), 0.0) * attenuation * uniforms.intensity;
    // 环境光 背光处不会全黑
    let ambient = 0.25;
    var baseColor : vec4<f32>;
    // 材质类型决定基本颜色
    if (uniforms.isRGBTex > 0.5) {
        // RGB 材质
        baseColor = (in.RGBColor + 1.2) / 2.0; 
    } else if (uniforms.isColorTex > 0.5) {
        // 纯色材质
        baseColor =uniforms.color;
    } else {
        // 纹理材质
        baseColor = texColor * uniforms.color;
    }
    // 光照计算
    var finalColor : vec4<f32>;
    if (uniforms.lightOff < 0.5) {
        // 光源关闭
        finalColor = baseColor;
    } else {
        // 光源开启，乘上 diffuse + ambient 光照
        finalColor = baseColor * (diff + ambient);
    }
    
    output.color = finalColor;
    return output;
}
`
export { vertex, fragment }

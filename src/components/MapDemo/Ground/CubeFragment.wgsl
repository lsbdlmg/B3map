//CubeFragment.wgsl
struct FragmentInput{
   @builtin(position) position:vec4<f32>,
   @location(0) worldPos: vec3<f32>,
   @location(1) fragNormal : vec3<f32>,
   @location(2) fragUv : vec2<f32>,
   @location(3) shadowPos : vec3<f32>
};
struct SunLightUniform{
    lightDir: vec3<f32>,// 太阳光方向 
    _pad0: f32,    // padding 16 字节对齐
    lightColor: vec3<f32>,// 太阳光颜色 从16字节开始
    lightIntensity: f32,// 太阳光强度 从28字节开始
    lightMatrix: mat4x4<f32>,
}
@group(2) @binding(0) var<uniform> sunlight: SunLightUniform;
@group(1) @binding(0) var mySampler: sampler;
@group(1) @binding(1) var myTexture: texture_2d<f32>;
@group(3) @binding(0) var shadowSampler: sampler_comparison;
@group(3) @binding(1) var shadowMap: texture_depth_2d;
struct FragmentOutput{
    @location(0) color:vec4<f32>,
};
@fragment
fn main(in:FragmentInput)->FragmentOutput {
    var output: FragmentOutput;

    // 纹理颜色
    let albedo = textureSample(myTexture, mySampler, in.fragUv).rgb;

    // 环境光（不受阴影影响）
    var ambient = 0.2;

    // 漫反射计算
    let L = normalize(-sunlight.lightDir);   // 光方向
    let N = normalize(in.fragNormal);
    let diff = max(dot(N, L), 0.0);// 漫反射系数 0~1 0是背面 0-1 在中间 1是正面

    // 阴影计算（0~1）shadowMap是深度图 对比相同xy的z值 如果shadowMap的z值大于shadowPos的z值 则在阴影中 否则在光照中
    //shadow 0是在阴影中 1是在光照中
    let shadow = textureSampleCompare(shadowMap, shadowSampler, in.shadowPos.xy, in.shadowPos.z-0.0005);
    output.color = vec4<f32>(albedo * (diff * sunlight.lightColor * sunlight.lightIntensity * shadow + ambient), 1.0);
    return output;
}

//灯光属性
struct sunLightUniform{
    position: vec4<f32>,
    intensity: f32,
    // dayTime: f32
}
//物体属性
struct objectUniform{
    textureIndex: f32,
}


@group(1) @binding(0) var<uniform> sunLight: sunLightUniform;
@group(1) @binding(1) var shadowMap: texture_depth_2d;
@group(1) @binding(2) var shadowSampler: sampler_comparison;
@group(1) @binding(3) var renderSampler: sampler;
@group(1) @binding(4) var<uniform> object: objectUniform;
@group(1) @binding(5) var woodTexture: texture_2d<f32>;
@group(1) @binding(6) var brickTexture: texture_2d<f32>;
fn getTexture(index: f32,uv: vec2<f32>) -> vec3<f32>{
    if(index == 0.0){
        return textureSample(woodTexture, renderSampler, uv).rgb;
    }else if(index == 1.0){
        return textureSample(brickTexture, renderSampler, uv).rgb;
    }else if(index == 2.0){
        //返回太阳光
        return vec3<f32>(1.0, 0.5, 0.1);
    }
    else{
        // 默认返回白色
        return vec3<f32>(1.0,1.0,1.0);
    }
}
@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal: vec3<f32>,
    @location(2) fragUV: vec2<f32>,
    @location(3) shadowPos: vec3<f32>,
) -> @location(0) vec4<f32> {
    let textureColor = getTexture(object.textureIndex,fragUV);
    // 漫反射
    var diffuse: f32=1.0;
    if(object.textureIndex==2.0){
        diffuse=1.0;
    }else{
        diffuse = max(dot(normalize(sunLight.position.xyz), fragNormal), 0.0);
    }
    var shadow : f32 = 0.0;
    // 使阴影更加柔和
    let size = f32(textureDimensions(shadowMap).x);
    for (var y : i32 = -1 ; y <= 5 ; y = y + 1) {
        for (var x : i32 = -1 ; x <= 5 ; x = x + 1) {
            let offset = vec2<f32>(f32(x) / size, f32(y) / size);
            shadow = shadow + textureSampleCompare(
                shadowMap, 
                shadowSampler,
                shadowPos.xy + offset, 
                shadowPos.z - 0.005  // apply a small bias to avoid acne
            );
        }
    }
    shadow = shadow / 36.0;
    // var shadow=textureSampleCompare(shadowMap, shadowSampler, shadowPos.xy, shadowPos.z - 0.01);
    // 环境光+漫反射
    var lightFactor=0.0;
    if(sunLight.intensity == 0.0){
        lightFactor=0.3;
    }else{
        lightFactor = min(0.3 + shadow *diffuse, 1.0)*sunLight.intensity;
    }
    return vec4<f32>(textureColor * lightFactor,1.0);
}
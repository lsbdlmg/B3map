@group(0) @binding(0) var<uniform> mvp : mat4x4<f32>;
@group(0) @binding(1) var<uniform> model : mat4x4<f32>;
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
};

@vertex
fn main(
    @location(0) position : vec3<f32>,
    @location(1) normal : vec3<f32>,
    @location(2) uv : vec2<f32>
) -> VertexOutput {
    let pos = vec4<f32>(position, 1.0);
    let posFromCamera: vec4<f32> = mvp * pos;

    var output : VertexOutput;
    output.Position = posFromCamera;
    output.fragPosition = (model * pos).xyz;
    output.fragNormal =  normalize((model * vec4<f32>(normal, 0.0)).xyz);
    output.fragUV = uv;
    let posFromLight: vec4<f32> = lightMatrix * model * pos;
    // output.shadowPos = vec3<f32>(posFromLight.xy * vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), posFromLight.z);
    let ndc = posFromLight.xyz / posFromLight.w;  // 透视除法
    output.shadowPos = vec3<f32>(ndc.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc.z); // NDC -> [0,1]
    let posFromLight2: vec4<f32> = lightMatrix2 * model * pos;
    let ndc2 = posFromLight2.xyz / posFromLight2.w;  // 透视除法
    output.shadowPos2 = vec3<f32>(ndc2.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc2.z); // NDC -> [0,1]
    let posFromLight3: vec4<f32> = lightMatrix3 * model * pos;
    let ndc3 = posFromLight3.xyz / posFromLight3.w;  
    output.shadowPos3 = vec3<f32>(ndc3.xy* vec2<f32>(0.5, -0.5) + vec2<f32>(0.5, 0.5), ndc3.z); // NDC -> [0,1]

    return output;
}
@fragment
fn main(
) -> @location(0) vec4<f32> {
    // 假设玻璃是蓝色半透明
    let color = vec3<f32>(0.5, 0.8, 1.0);
    let alpha = 0.3; // 透明度
    return vec4<f32>(color, alpha);
}
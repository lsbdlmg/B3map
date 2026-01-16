fn hash(p: vec2<f32>) -> f32 {
    let h = dot(p, vec2<f32>(127.1, 311.7));
    return fract(sin(h) * 43758.5453);
}

@fragment
fn main(
    @location(0) fragPosition : vec3<f32>,
    @location(1) fragNormal   : vec3<f32>,
) -> @location(0) vec4<f32> {
    let normal = normalize(fragNormal);
    let viewDir = normalize(-fragPosition);
    // ===== 基础 rim 光晕 =====
    let ndv = max(dot(normal, viewDir), 0.0);
    let rim = pow(1.0 - ndv, 2.0);
    // ===== 屏幕方向（用于射线）=====
    let dir = normalize(viewDir.xy);
    let angle = atan2(dir.y, dir.x);   // -PI ~ PI
    // ===== 射线噪声 =====
    let rays = hash(vec2<f32>(angle * 20.0, 0.0));
    let rayMask = smoothstep(0.4, 1.0, rays);
    // ===== 射线随边缘增强 =====
    let rayStrength = rayMask * rim * 3.0;
    let glowColor = vec3<f32>(1.0, 0.85, 0.4);
    let color = glowColor * (rim * 1.5 + rayStrength);
    let alpha = clamp(rim + rayStrength, 0.0, 1.0);
    return vec4<f32>(color, alpha * 0.6);
}

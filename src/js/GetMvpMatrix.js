import { mat4 } from 'gl-matrix'
const getMvpMatrix = (aspect, position, rotation, scale, eye, center, up) => {
    // 初始化矩阵 角度为45度的视角 沿着y轴旋转的透视矩阵
    const model = mat4.create()
    const view = mat4.create()
    const proj = mat4.create()
    const mvp = mat4.create()

    // 构建proj透视投影矩阵
    mat4.perspective(proj, Math.PI / 4, aspect, 1, 200)

    // 构建View矩阵（相机） 目前相机视角在0 0 20 看向0 0 0 屏幕里看向屏幕外
    mat4.lookAt(view, [eye.x, eye.y, eye.z], [center.x, center.y, center.z], [up.x, up.y, up.z])

    // 构建Model矩阵
    mat4.identity(model)
    mat4.translate(model, model, [position.x, position.y, position.z])
    mat4.rotateX(model, model, rotation.x)
    mat4.rotateY(model, model, rotation.y)
    mat4.rotateZ(model, model, rotation.z)
    mat4.scale(model, model, [scale.x, scale.y, scale.z])

    // 组合MVP
    const temp = mat4.create()
    mat4.multiply(temp, view, model)
    mat4.multiply(mvp, proj, temp)
    return {
        model,
        mvp,
    }
}
export { getMvpMatrix }

import * as THREE from '@/assets/three/three.module'
export default class Star {
    constructor(texture, position = [], size = 20) {
        this.mesh = new THREE.Object3D()
        this.mesh.castShadow = true
        this.mesh.receiveShadow = true
        // 添加球
        this.ball = this.createBall(size, texture, position)
        this.mesh.add(this.ball)
        // 添加轨道
        this.track = this.createTrack(position)
        this.mesh.add(this.track)
    }

    createBall(size, texture, position) {
        var geometry = new THREE.SphereGeometry(size, 32, 32)
        var material = new THREE.MeshStandardMaterial()
        material.map = texture
        var star = new THREE.Mesh(geometry, material)
        star.position.set(...position)

        const mesh = new THREE.Object3D()
        mesh.add(star)
        return mesh
    }

    createTrack([x]) {
        var geometry = new THREE.TorusGeometry(x, 1, x / 5, x / 5)
        var material = new THREE.MeshBasicMaterial()
        const track = new THREE.Mesh(geometry, material)
        track.rotation.x = Math.PI / 2
        return track
    }
}

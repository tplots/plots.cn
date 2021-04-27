import * as THREE from '@/assets/three/three.module'
import { OrbitControls } from '@/assets/three/OrbitControls.js'
import { random } from '@/utils'
import Star from './star'
import stats from '@/utils/stats.js'
import sunImg from '@/assets/images/sunCore.jpg'
import venusImg from '@/assets/images/venus.jpg'

export default class Galaxy {
    constructor(id) {
        // console.log(Three)
        this.Colors = {
            red: 0xf25346,
            white: 0xd8d0d1,
            brown: 0x59332e,
            pink: 0xf5986e,
            brownDark: 0x23190f,
            blue: 0x68c3c0,
        }

        const width = window.innerWidth
        const height = window.innerHeight

        // 初始化场景
        this.scene = new THREE.Scene()

        // 透视相机
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 10000000)
        this.camera.position.z = 600

        this.iteration = []
        // 渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 允许背景透明，这样可以显示我们在css中定义的背景色
            alpha: true,
            // 开启抗锯齿效果; 性能变低
            antialias: true,
        })
        // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
        this.renderer.setSize(width, height)
        // 允许渲染器接受阴影
        this.renderer.shadowMap.enabled = true

        document.querySelector(id).appendChild(this.renderer.domElement)

        window.onresize = () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
        }

        // 初始化loader
        this.loader = new THREE.TextureLoader()
        this.init()
        this.initControls()
    }
    initControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        // controls.enableDamping = true
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        //controls.dampingFactor = 0.25;
        //是否可以缩放
        this.controls.enableZoom = true
        //是否自动旋转
        // this.controls.autoRotate = true
        //设置相机距离原点的最小距离
        this.controls.minDistance = 200
        //设置相机距离原点的最远距离
        this.controls.maxDistance = 10000

        //是否开启右键拖拽
        this.controls.enablePan = true
    }
    start() {
        const loop = () => {
            stats.begin()
            for (let i = 0; i < this.iteration.length; i++) {
                this.iteration[i]()
            }
            this.renderer.render(this.scene, this.camera)
            stats.end()
            this.controls.update()
            requestAnimationFrame(loop)
        }
        loop()
    }

    init() {
        // 初始化太阳
        this.initSun()

        for (let i = 1; i < 20; i++) {
            this.loader.load(venusImg, texture => {
                const { mesh, ball } = new Star(texture, [300 * i, 0, 0], random(20, 200))
                mesh.rotation.z = (random(0, 60) - 30) / 100
                mesh.rotation.x = (random(0, 60) - 30) / 100
                this.scene.add(mesh)
                const speed = random(1, 10) / 1000 - 0.005
                this.iteration.push(() => {
                    ball.rotation.y += speed
                })
            })
        }

        this.scene.rotation.x = Math.PI / 20
    }

    initSun() {
        this.loader.load(sunImg, texture => {
            var geometry = new THREE.SphereGeometry(100, 32, 32)
            var material = new THREE.MeshBasicMaterial()
            material.map = texture
            var sun = new THREE.Mesh(geometry, material)

            var pointLight = new THREE.PointLight(this.Colors.white, 1)
            pointLight.add(sun)

            this.scene.add(pointLight)

            this.iteration.push(time => {
                sun.rotation.y += 0.002
            })
        })
    }
}

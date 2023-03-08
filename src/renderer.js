import * as THREE from 'three'
import Experience from './experience.js'


export default class Renderer
{
    constructor()
    {
        
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.camera = this.experience.camera

        this.setInstance()



        
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias : false  

        })
      //  this.instance.renderer.setClearColor(0xEEEEEE);


        
        this.instance.shadowMap.enabled = false;
 this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.shadowMap.autoUpdate = false
        this.instance.shadowMap.needsUpdate = false
        this.instance.setSize(this.sizes.width, this.sizes.height)
        
        this.instance.setPixelRatio(this.sizes.pixelRatio * 0.9)
      //  this.composer = new Composer()

    }
    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio *0.9 )
      
    
    }
    update()
    {
        this.instance.render(this.scene, this.camera.instance)

    }
}
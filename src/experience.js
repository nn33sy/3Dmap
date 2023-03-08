import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './renderer.js'
import * as THREE from 'three'
import World from './World/world.js'
import Loading from './loadingManager.js'

import Raycaster from './Raycaster.js'

let instance = null 
export default class Experience
{
    constructor(canvas)
    {
        if (instance)
        {
            return instance
        }
        instance = this

        window.experience = this

        this.canvas = canvas
  this.loading = new Loading()
     
        this.scene = new THREE.Scene()

        this.sizes = new Sizes()
        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
       // this.composer = new Composer()
        this.world = new World()
        this.raycaster = new Raycaster()
        
        this.intro = document.querySelector('.intro')
     
        this.start = false
  






        this.sizes.on('resize', () =>
        {
            this.resize()
        })
        this.time.on('tick',()=>
        {
                
                this.update()
        })


        
    }



    resize()
    {
       this.camera.resize()
       this.renderer.resize()
    
    }

    update()
    {
        if (this.start != false)
        {

       
        this.camera.update()
        this.raycaster.instance.setFromCamera(this.raycaster.pointer,this.camera.instance)
      
        if (this.time.delta >12)
            this.raycaster.raycast()
        }
        this.renderer.update()

       // console.log('tick called')
    }
}
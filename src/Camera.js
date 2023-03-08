import Experience from "./experience.js"
import * as THREE from 'three'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import { Vector3 } from "three"

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.createCamera()
        this.setControls()
    }

    createCamera()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 4, 1.5)
        this.instance.layers.enable(1)
  
       
        this.experience.scene.add(this.instance)
        
       
        
    }

    setControls()
    {
        this.controls =  new FirstPersonControls(this.instance, document) 
        this.controls.lookSpeed = 0.01
        this.controls.lookVertical = true
        this.controls.constrainVertical = true
        this.controls.verticalMin= Math.PI * 0.35
        this.controls.verticalMax = Math.PI * 0.55
        
        this.controls.movementSpeed =0.9;
      
        this.controls.heightSpeed = true
        this.controls.autoForward = false
        
        console.log('First Person Controls created')


    }
    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
        this.controls.handleResize()
    }

    update()
    {
        this.instance.position.y = 4
        if (this.experience.raycaster.rotate == true)
        {
            this.controls.update(0.02)


        }
            
       else
       {
       
        this.controls.update(0.0008)
     
       }
        
    }
}
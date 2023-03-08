import * as THREE from 'three'
import { Vector2 } from 'three'
import Experience from './experience.js'
import {TAB} from './table.js'
export default class Raycaster
{
    constructor()
    {
        this.experience = new Experience()
        this.canvas = this.experience.canvas
        this.pointer = new Vector2()
        this.instance =  new THREE.Raycaster();
        this.model = this.experience.world.model.gltfscene
        this.instance.params.Points.threshold = 0.1;
        this.instance.params.Line.threshold = 0.1
        this.instance.far = 3.5
        this.instance.near = 0
        this.instance.layers.set( 0);
        this.popup = document.querySelector('.point-0')
        this.disable = document.querySelector('.point_')
        this.material = new THREE.MeshBasicMaterial( { color: 0xffffff} );
        this.hit =  true
        this.rotate = true 
        this.popup.addEventListener('mouseenter', event => {
            this.rotate = false
            this.hit = false
        })
        this.popup.addEventListener('mouseleave', event => {
            this.rotate = true
            this.hit= true
        })
        window.addEventListener('mousemove',(event) =>
        {
            this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        })
        this.disable.addEventListener('click', event => {
        if(this.hit == true)
        {
      
            this.hit = false
            this.popup.classList.remove('visible')
            this.disable.classList.add('negatif')
            this.disable.innerHTML = "Afficher les informations"
        }
        else
        {
        
            this.hit = true
            this.disable.innerHTML = "Masquer les informations"
            this.disable.classList.remove("negatif")
        }
        }
        
        )
    

    }
    raycast()
    {
       if (this.model == null)
        this.model = this.experience.world.model.gltfscene
       else if (this.hit == true)
       {

        this.intersect = this.instance.intersectObject(this.model)
        
        if (this.intersect.length > 0 && this.intersect[0].object && this.lastIntersect != this.intersect[0].object)
        {
      

            this.intersect[0].object.material = this.material
            let id = parseInt(this.intersect[0].object.name)
            this.popup.innerHTML = TAB[id]
            this.popup.scrollTop = 0
            this.popup.classList.add('visible')
            this.lastIntersect = this.intersect[0].object
        }
    }

    }
    
}
import Experience from "../experience";
import * as THREE from 'three'

export default class Environment {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

      //  this.setAmbientLight()
        this.setDirectionnalLight()
    }
    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.1)
        this.scene.add(this.ambientLight)
        this.ambientLight.castShadow= false

    }
    setDirectionnalLight()
    {
        this.directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.9)
        this.directionalLight.castShadow = false
        this.directionalLight.position.set(10, 8, 10)
        this.scene.add( this.directionalLight)

        this.directionalLight_back = new THREE.DirectionalLight(0xFFFFFF, 0.9)
        this.directionalLight_back.castShadow = false
        this.directionalLight_back.position.set(-10,8, -10)
        this.scene.add(this.directionalLight_back)
    }
}
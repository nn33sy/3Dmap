import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import Experience from "../experience"

export default class Model {

    constructor()
    {
        this.experience = new Experience()
        this.loadingManager = this.experience.loading.instance
        this.scene = this.experience.scene

        this.dracoLoader = new DRACOLoader()
        this.dracoLoader.setDecoderPath('/draco/')

this.gltfLoader = new GLTFLoader(this.loadingManager)
this.gltfLoader.setDRACOLoader(this.dracoLoader)


this.gltfLoader.load(
    '/models/v6.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025,0.025)
   
        this.scene.add(gltf.scene)
        this.gltfscene = gltf.scene


        
        gltf.scene.getObjectByName('Objet_3644_1').layers.set(1)

        gltf.scene.getObjectByName('Liens').layers.set(1)
        
        
        gltf.scene.getObjectByName('RESTE_T1').layers.set(1)
        gltf.scene.getObjectByName('Objet_1').layers.set(1)

        gltf.scene.getObjectByName('Liens002').layers.set(1)
        gltf.scene.castShadow = false

    }
)
    }

}
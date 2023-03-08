import Experience from "../experience";
import * as THREE from 'three'
import Environment from "./environment.js";
import Models from "./mdl.js";
export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene

        console.log('The World')

       
   

        this.environment = new Environment()
        this.model = new Models()
       
    }
}
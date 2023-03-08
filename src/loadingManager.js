import Experience from "./experience";
import * as THREE from 'three'
export default class loading {
    constructor()
    {
        this.experience = new Experience()
        console.log('loaded')
        this.loader = document.querySelector('.loading-bar')
        this.nb = document.querySelector('.nb')
        this.instance = new THREE.LoadingManager(
            () =>
            {
               
                this.loader.classList.add('invisible')
                this.setButton()


                
            },
        
            (itemUrl, itemsLoaded, itemsTotal) =>
            {
                const progressRatio = itemsLoaded / itemsTotal
                
                this.nb.innerHTML = Math.floor(progressRatio * 100) + '%'
                this.loader.style.transform = `scaleX(${progressRatio})`
            }
            // Progress
         
        )
    }
    setButton()
    {
        this.nb.innerHTML = "Commencer l'exploration"
        this.button = document.querySelector('.button')

        this.button.addEventListener('click', event => {
            
            this.experience.start = true;
            this.button.classList.add('invisible')
            this.experience.intro.classList.add('invisible')
            
        })
    }

}
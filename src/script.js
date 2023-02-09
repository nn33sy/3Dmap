import './style.css'
import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js'
import Stats from 'stats.js'


/**
 * Base
 */
// Debug


const stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)
let lastObjectRaycast = null



const patrick = "Patrick <b> Pouyanné </b>est le visage de Total. <br /><br />Après y avoir pantouflé, il n’a jamais quitté le groupe. Il occupe d’autres fonctions représentatives par ailleurs, qui visent à accroître son influence et améliorer son image. Issu du corps des Mines à la suite de sa formation à Polytechnique, Patrick Pouyanné a commencé sa carrière au sein du ministère de l’Industrie. Il est ensuite devenu conseiller technique du Premier ministre Edouard Balladur en 1993, puis directeur de cabinet du ministre des Technologies de l'information et de la Poste François Fillon. C’est en 1997 qu'il rejoint la compagnie pétrolière Elf Aquitaine, absorbée par le groupe Total en 2000. Patrick Pouyanné est un exemple parmi d’autres, nombreux chez Total, de “pantouflage”, c’est-à-dire le fait qu’un haut fonctionnaire parte travailler dans une entreprise privée.Patrick Pouyanné fait partie de cercles liant les grands patrons français, il est notamment membre du conseil d’administration de l’Association Française des Entreprises Privées depuis 2014, une association de représentation patronale qui réunit uniquement les dirigeants des plus grands groupes considérant que leurs intérêts peuvent diverger des positions du Medef.Il s’est approché du monde des grandes écoles ces dernières années, en intégrant le conseil d’administration de l’Ecole Polytechnique et de l’Institut Polytechnique au moment où il souhaitait imposer l’installation d’un site Total en plein centre du campus. Il dispose d’une forte influence dans le monde associatif comme membre du conseil d’administration de la Fondation La France s’engage, présidée par François Hollande, une fondation dont Total a activement participé à la création en 2017 pour jouer un rôle de structure chapeau de nombreuses associations.Il soigne également son image en siégeant au conseil d’administration de l’Institut du Monde Arabe, une institution culturelle spécialisée sur cette zone géographique riche en hydrocarbures financée par la Fondation Total.Patrick Pouyanné a été choisi en 2019 comme co-président de la Partnering Against Corruption Initiative, alors même que le groupe a été condamné pour de telles pratiques par le passé. Total a par exemple été condamné en 2018 par le Tribunal correctionnel de Paris pour avoir versé 30 millions de pots-de-vin en Iran entre 2000 et 2004.Il est même président de l’Association Française des Entreprises pour l’Environnement depuis 2022. Cette association est l’outil de communication de grandes entreprises françaises sur les sujets environnementaux. Elle a pour l’un de ses trois buts principaux “d’améliorer la crédibilité de ses entreprises en matière d’environnement” et regroupe une soixantaine de grandes entreprises françaises dont la plupart ont été épinglées pour leur inconséquence à l’égard du dérèglement climatique.";
const Les_actionnaires = "En 2021, le groupe a consacré plus de 8,5 milliards d’euros à la rémunération de ses actionnaires, soit près de trois fois plus que les sommes investies dans le renouvelable. “Total appartient à ses actionnaires”, répète souvent Patrick Pouyanné pour justifier des orientations stratégiques du groupe. Qui sont donc ces fameux actionnaires, qui décident du sort du groupe et font rente de ses bénéfices ? Ce sont principalement des géants financiers (BlackRock, le Cré- dit Agricole...) et des acteurs étrangers (seuls 6,9 % des actionnaires principaux sont immatriculés en France). Par ailleurs fortement reliés au monde des banques et des assurances, leur intérêt n’est que financier."
const Le_groupe_Crédit_Agricole = "Le Groupe Crédit Agricole est le premier actionnaire de Total au monde : il détient pour 15,66 milliards d’euros d’actions chez Total, soit 10,2% du groupe. Le 29 mai 2020, lorsque l’assemblée générale de Total a fait l’objet d’un vote au sujet de l’adoption ou non d’une résolution climat, première de ce genre en France, le Crédit Agricole a fait partie des 83,2% des actionnaires qui ont voté contre la résolution. Selon l’association Reclaim Finance, les engagements annoncés par cet acteur ont donc été relégués au profit de la perspective de dividendes plus élevées à court terme. Le groupe Crédit Agricole est présent au capital de Total principalement via Amundi, la deuxième société de gestion d’actifs en Europe. Les connexions entre Total et cet acteur sont par ailleurs multiples : Amu- ndi gère, entre autres, le Plan d’Epargne Entreprises du groupe"
const blackrock="Première société gestionnaire d’actifs au monde, BlackRock est le second actionnaire de Total avec 6,2 % des parts, pour une valeur de 9,49 milliards d’eu- ros. En janvier 2021, les ONG Reclaim Finance et Urgewald ont qualifié de “greenwashing” les annonces de BlackRock et son PDG Laurence D. Fink, qui ont notamment souhaité se positionner comme champion de la transition en arrêtant tout investissement dans une entreprise réalisant plus de 25% de son acti- vité à partir des énergies fossiles, mais maintiennent pour 85 milliards de dollars de participations dans des compagnies inscrites sur la Global Coal Exit List assemblée par l’ONG Urgewald."

const pointer = new THREE.Vector2()


// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()
let gltfscene = null
/**
 * Models
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)


gltfLoader.load(
    '/models/v4.gltf',
    (gltf) =>
    {
        gltf.scene.scale.set(0.025, 0.025,0.025)
        scene.add(gltf.scene)
        gltfscene = gltf.scene
   
       
        gltf.scene.getObjectByName('Liens').layers.set(1)
      
        
        gltf.scene.getObjectByName('Reste_T1').layers.set(1)
        gltf.scene.getObjectByName('Objet_1').layers.set(1)

        gltf.scene.getObjectByName('Liens002').layers.set(1)
     

    }
)



let hit = false;

let raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.0001;
raycaster.params.Line.threshold = 0.0001
raycaster.far = 20;
raycaster.layers.set( 0);

console.log(raycaster)
raycaster.near =0;

document.addEventListener( 'mousemove', onPointerMove );


const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xFFffff, 0.5)
directionalLight.castShadow = false

directionalLight.position.set(0, 8, 0)
scene.add(directionalLight)

const material3 = new THREE.MeshBasicMaterial( {color: 0x0000ff, side: THREE.DoubleSide} );
 

const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio * 0.7)
})






/**
 * Camera
 */
// Base camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 4, 2)
scene.add(camera)
camera.layers.enable(1)

// Controls



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias : false 
})
renderer.shadowMap.enabled = false;
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const controls = new FirstPersonControls(camera,renderer.domElement )
controls.movementSpeed =0.5;


let element= document.querySelector('.point-0')


			
/**
 * Animate
 */



const tick = () =>
{
  stats.begin()
 controls.update(0.05)
raycaster.setFromCamera( pointer, camera );
raycast()
/*
if (Date.now() - lastRaycast > raycastInterval && qRaycast) {
   
   lastRaycast = Date.now();
    qRaycast = false;
}*/




    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    stats.end();

}











function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  

}









function raycast() {
    if (gltfscene )
{

    
    const intersects = raycaster.intersectObject(gltfscene);


    if ( intersects.length > 0 && intersects[ 0 ].object && intersects[ 0 ].object != lastObjectRaycast ) {
   
        intersects[0].object.material = material3
       console.log(intersects[0].object.name)
            switch (intersects[0].object.name) {
                case '0':
                    element.innerHTML="hello world";
                    element.classList.add('visible')
                    break;
                case 'Patrick_Pouyanné':
                    element.innerHTML= patrick;
                    element.classList.add('visible')
                    break;
                case 'Marie-Christine':
                    element.innerHTML="marieiei";
                    element.classList.add('visible')
                    break;
                case 'Universitées et écoles':
                    element.innerHTML= "ecole";
                    element.classList.add('visible')
                    break;
                case 'Le_conseil_d\'administration':
                    element.innerHTML= "ecole";
                    element.classList.add('visible');
                    break;
                case 'Associations_environnementales':
                    element.innerHTML= "ecole";
                    element.classList.add('visible')
                    break;
                case 'Les_actionnaires':
                    element.innerHTML= Les_actionnaires;
                    element.classList.add('visible')
                    break;
                case "Le_groupe_Crédit_Agricole":
                    element.innerHTML = Le_groupe_Crédit_Agricole
                    element.classList.add('visible')
                    break;
                case "blackrock":
                    element.innerHTML=blackrock
                    element.classList.add('visible')
                    break;

                default :  
               
                break;
            
      
    }  
    lastObjectRaycast = intersects[0].object
    
}


}
    
}


        

tick()
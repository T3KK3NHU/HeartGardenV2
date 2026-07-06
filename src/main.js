import * as THREE from "three";
import "./style.css";
import { Player } from "./player.js";
import { createTerrain } from "./world/terrain.js";
import { createTrees } from "./world/trees.js";
import { createGrass } from "./world/grass.js";
import { createFarm } from "./world/farm.js";
import { createHouse } from "./world/house.js";

// =====================
// HEARTGARDEN V2 ENGINE
// First 3D Scene
// =====================

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

createGrass(scene);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// RENDERER
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const player = new Player(
    camera,
    renderer.domElement
);


// =====================
// LIGHT
// =====================

const sun = new THREE.DirectionalLight(
    0xffffff,
    2
);

sun.position.set(
    5,
    10,
    5
);

sun.castShadow = true;

scene.add(sun);


const ambient = new THREE.AmbientLight(
    0xffffff,
    0.5
);

scene.add(ambient);

createTerrain(scene);
createTrees(scene);
createFarm(scene);
createHouse(scene);

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// =====================
// LOOP
// =====================

function animate(){

    requestAnimationFrame(
        animate
    );


    player.update();


    renderer.render(
        scene,
        camera
    );
}


animate();
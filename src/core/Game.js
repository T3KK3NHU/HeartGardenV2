import * as THREE from "three";
import { HUD } from "../ui/HUD.js";

import { Player } from "../player/player.js";

import { createTerrain } from "../world/terrain.js";
import { createTrees } from "../world/trees.js";
import { createGrass } from "../world/grass.js";
import { createFarm } from "../world/farm.js";
import { createHouse } from "../world/house.js";

import { InteractionManager } from "./InteractionManager.js";
// import { HUD } from "../ui/HUD.js";

export class Game {

    constructor() {

        this.scene = new THREE.Scene();
        this.scene.background =
            new THREE.Color(0x87ceeb);

        this.camera =
            new THREE.PerspectiveCamera(
                75,
                window.innerWidth /
                window.innerHeight,
                0.1,
                1000
            );

        this.renderer =
            new THREE.WebGLRenderer({
                antialias: true
            });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        this.renderer.shadowMap.enabled = true;

        document.body.appendChild(
            this.renderer.domElement
        );

        this.player =
            new Player(
                this.camera,
                this.renderer.domElement
            );

        this.interactionManager =
            new InteractionManager(
                this.camera,
                this.scene
            );

        const hud = new HUD();

        this.hud = hud;
    }

    start() {

        this.setupLighting();

        createGrass(this.scene);
        createTerrain(this.scene);
        createTrees(this.scene);

        const farm =
            createFarm(this.scene);

        farm.interactables.forEach(
            object => {

                this.interactionManager.register(
                    object
                );

            }
        );

        console.log(this.interactionManager.interactables);

        createHouse(this.scene);

        window.addEventListener(
            "resize",
            () => this.onResize()
        );

        this.animate();

    }

    setupLighting() {

        const sun =
            new THREE.DirectionalLight(
                0xffffff,
                2
            );

        sun.position.set(
            5,
            10,
            5
        );

        sun.castShadow = true;

        this.scene.add(sun);

        const ambient =
            new THREE.AmbientLight(
                0xffffff,
                0.5
            );

        this.scene.add(ambient);

    }

    onResize() {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }

    animate = () => {

        requestAnimationFrame(
            this.animate
        );

        this.player.update();


        const target =
            this.interactionManager.getTarget();


        if (target) {

            this.hud.showMessage(
                "E - Interakció"
            );

        }
        else {

            this.hud.hideMessage();

        }


        this.renderer.render(
            this.scene,
            this.camera
        );

    }

}
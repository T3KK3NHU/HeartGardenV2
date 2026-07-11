import * as THREE from "three";
import { Interactable } from "../core/Interactable.js";

export class Gate extends Interactable {

    constructor(scene, x, z) {

        const group = new THREE.Group();

        super(group);

        this.scene = scene;
        this.open = false;

        const woodMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x8b5a2b,
                roughness: 1

            });

        // ===== Bal oszlop =====

        const postGeometry =
            new THREE.BoxGeometry(
                0.25,
                1.5,
                0.25
            );

        const leftPost =
            new THREE.Mesh(
                postGeometry,
                woodMaterial
            );

        leftPost.position.set(
            -1.2,
            0.75,
            0
        );

        group.add(leftPost);

        // ===== Jobb oszlop =====

        const rightPost =
            new THREE.Mesh(
                postGeometry,
                woodMaterial
            );

        rightPost.position.set(
            1.2,
            0.75,
            0
        );

        group.add(rightPost);

        // ===== Kapuszárny =====

        const gateGeometry =
            new THREE.BoxGeometry(
                2.2,
                1.2,
                0.15
            );

        this.door =
            new THREE.Mesh(
                gateGeometry,
                woodMaterial
            );

        this.door.position.set(
            0,
            0.6,
            0
        );

        group.add(this.door);

        group.position.set(
            x,
            0,
            z
        );

        scene.add(group);

    }

    interact() {

        this.open =
            !this.open;

        this.door.rotation.y =
            this.open
                ? -Math.PI / 2
                : 0;

    }

}
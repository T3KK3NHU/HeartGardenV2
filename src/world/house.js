import * as THREE from "three";
import { farmLayout } from "./layout.js";


export function createHouse(scene) {


    const x = farmLayout.house.x;
    const z = farmLayout.house.z;


    // ===== FALAK =====

    const wallMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xc28b52,

            roughness: 1

        });


    const wallGeometry =
        new THREE.BoxGeometry(
            8,
            3,
            6
        );


    const house =
        new THREE.Mesh(
            wallGeometry,
            wallMaterial
        );


    house.position.set(
        x,
        1.5,
        z
    );


    house.castShadow = true;
    house.receiveShadow = true;


    scene.add(house);



    // ===== TETŐ =====


    const roofGeometry =
        new THREE.ConeGeometry(
            5.2,
            2,
            4
        );


    const roofMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x8b3a2b,

            roughness: 1

        });


    const roof =
        new THREE.Mesh(
            roofGeometry,
            roofMaterial
        );


    roof.rotation.y =
        Math.PI / 4;


    roof.position.set(
        x,
        4,
        z
    );


    roof.castShadow = true;


    scene.add(roof);



    // ===== AJTÓ =====


    const doorGeometry =
        new THREE.BoxGeometry(
            1.2,
            2,
            0.1
        );


    const doorMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x4b2e15

        });


    const door =
        new THREE.Mesh(
            doorGeometry,
            doorMaterial
        );


    door.position.set(
        x,
        1,
        z + 3.05
    );


    scene.add(door);



    // ===== ABLAK =====


    const windowGeometry =
        new THREE.BoxGeometry(
            1.2,
            1,
            0.05
        );


    const windowMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x87ceeb,

            metalness: 0.2,

            roughness: 0.3

        });


    const windowMesh =
        new THREE.Mesh(
            windowGeometry,
            windowMaterial
        );


    windowMesh.position.set(
        x + 2,
        2,
        z + 3.05
    );


    scene.add(windowMesh);


}
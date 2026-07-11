import * as THREE from "three";
import { farmLayout } from "./layout.js";
import { Gate } from "./Gate.js";


export function createFarm(scene) {

    // ===== FÖLDPARCELLA =====

    const soilGeometry =
        new THREE.PlaneGeometry(
            12,
            12
        );


    const soilMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x6b4423,

            roughness: 1

        });


    const soil =
        new THREE.Mesh(
            soilGeometry,
            soilMaterial
        );


    soil.rotation.x =
        -Math.PI / 2;


    soil.position.set(
        farmLayout.garden.x,
        0.03,
        farmLayout.garden.z
    );


    soil.receiveShadow = true;

    scene.add(soil);



    // ===== ÖSVÉNY =====


    const pathGeometry =
        new THREE.PlaneGeometry(
            4,
            30
        );


    const pathMaterial =
        new THREE.MeshStandardMaterial({

            color: 0xb89b72,

            roughness: 1

        });


    const path =
        new THREE.Mesh(
            pathGeometry,
            pathMaterial
        );


    path.rotation.x =
        -Math.PI / 2;


    path.position.set(
        farmLayout.path.x,
        0.04,
        farmLayout.path.z
    );


    scene.add(path);



    // ===== KERÍTÉS =====

    createFence(scene);


    // ===== KAPU =====

    createFence(scene);

const gate =
    new Gate(
        scene,
        farmLayout.fence.gate.x,
        farmLayout.fence.gate.z
    );

return {

    interactables: [
        gate
    ]

};
}




function createFence(scene) {


    const fence = farmLayout.fence;


    const postGeometry =
        new THREE.BoxGeometry(
            0.15,
            1.2,
            0.15
        );


    const woodMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x8b5a2b,

            roughness: 1

        });



    function addPost(x, z) {


        const post =
            new THREE.Mesh(
                postGeometry,
                woodMaterial
            );


        post.position.set(
            x,
            0.6,
            z
        );


        post.castShadow = true;


        scene.add(post);

    }



    const startX =
        fence.x - fence.width / 2;


    const endX =
        fence.x + fence.width / 2;


    const startZ =
        fence.z - fence.depth / 2;


    const endZ =
        fence.z + fence.depth / 2;



    // első oldal

    for (
        let x = startX;
        x <= endX;
        x += 2
    ) {

        addPost(
            x,
            startZ
        );

    }



    // hátsó oldal

    for (
        let x = startX;
        x <= endX;
        x += 2
    ) {

        addPost(
            x,
            endZ
        );

    }



    // oldalak

    for (
        let z = startZ;
        z <= endZ;
        z += 2
    ) {

        addPost(
            startX,
            z
        );


        addPost(
            endX,
            z
        );

    }

}





function createGate(scene, x, z) {


    const woodMaterial =
        new THREE.MeshStandardMaterial({

            color: 0x8b5a2b,

            roughness: 1

        });



    const postGeometry =
        new THREE.BoxGeometry(
            0.25,
            1.5,
            0.25
        );



    // bal kapuoszlop

    const left =
        new THREE.Mesh(
            postGeometry,
            woodMaterial
        );


    left.position.set(
        x - 1.2,
        0.75,
        z
    );


    left.castShadow = true;


    scene.add(left);




    // jobb kapuoszlop

    const right =
        new THREE.Mesh(
            postGeometry,
            woodMaterial
        );


    right.position.set(
        x + 1.2,
        0.75,
        z
    );


    right.castShadow = true;


    scene.add(right);


}
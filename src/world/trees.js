import * as THREE from "three";
import { colliders } from "./collision.js";
import { farmLayout } from "./layout.js";


export function createTrees(scene) {


    const trees = [];


    function createTree(x, z, scale = 1) {


        // ===== TÖRZS =====

        const trunkGeometry =
            new THREE.CylinderGeometry(
                0.35 * scale,
                0.5 * scale,
                3 * scale,
                8
            );


        const trunkMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x6b3e1e,

                roughness: 1

            });


        const trunk =
            new THREE.Mesh(
                trunkGeometry,
                trunkMaterial
            );


        trunk.position.set(
            x,
            1.5 * scale,
            z
        );


        trunk.castShadow = true;


        scene.add(trunk);

        colliders.push({
            x,
            z,
            radius: 0.6 * scale
        });



        // ===== LOMBKORONA =====


        const leafMaterial =
            new THREE.MeshStandardMaterial({

                color: 0x2f8f35,

                roughness: 1

            });



        const leafLayers = [

            {
                size: 1.8,
                height: 3.5
            },

            {
                size: 1.4,
                height: 4.5
            },

            {
                size: 0.9,
                height: 5.3
            }

        ];



        const leaves = [];



        leafLayers.forEach(layer => {


            const geometry =
                new THREE.ConeGeometry(
                    layer.size * scale,
                    2 * scale,
                    8
                );


            const mesh =
                new THREE.Mesh(
                    geometry,
                    leafMaterial
                );


            mesh.position.set(
                x,
                layer.height * scale,
                z
            );


            mesh.castShadow = true;


            scene.add(mesh);


            leaves.push(mesh);

        });



        trees.push({

            trunk,

            leaves,

            x,

            z

        });

    }



    // ===== TESZT FÁK =====
    
    farmLayout.trees.forEach(tree => {

        createTree(
            tree.x,
            tree.z,
            tree.scale
        );

    });



    return trees;

}
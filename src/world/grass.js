import * as THREE from "three";


export function createGrass(scene) {

    const grassCount = 8000;


    const geometry =
        new THREE.BufferGeometry();


    const positions = [];


    for(let i = 0; i < grassCount; i++){

        const x =
            (Math.random() - 0.5) * 80;

        const z =
            (Math.random() - 0.5) * 80;


        const y = 0.08;


        positions.push(
            x,
            y,
            z
        );

    }


    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            positions,
            3
        )
    );


    const material =
        new THREE.PointsMaterial({

            color: 0x1f6b1f,

            size: 0.15

        });


    const grass =
        new THREE.Points(
            geometry,
            material
        );


    scene.add(grass);


    return grass;

}
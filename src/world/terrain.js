import * as THREE from "three";


export function createTerrain(scene) {


    const size = 100;
    const segments = 50;


    const geometry =
        new THREE.PlaneGeometry(
            size,
            size,
            segments,
            segments
        );


    // enyhe terep hullámzás

    const vertices =
        geometry.attributes.position;


    for(let i = 0; i < vertices.count; i++){

        const x = vertices.getX(i);
        const y = vertices.getY(i);


        const height =
            Math.sin(x * 0.15) *
            0.15 +
            Math.cos(y * 0.12) *
            0.15;


        vertices.setZ(
            i,
            height
        );

    }


    geometry.computeVertexNormals();



    const material =
        new THREE.MeshStandardMaterial({

            color: 0x4f9f45,

            roughness: 1,

            metalness: 0

        });



    const terrain =
        new THREE.Mesh(
            geometry,
            material
        );


    terrain.rotation.x =
        -Math.PI / 2;


    terrain.receiveShadow = true;


    scene.add(terrain);


    return terrain;

}
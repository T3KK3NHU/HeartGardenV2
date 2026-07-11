import * as THREE from "three";

export class InteractionManager {

    constructor(camera, scene) {

        this.camera = camera;
        this.scene = scene;

        this.raycaster = new THREE.Raycaster();

        this.interactables = [];

        this.maxDistance = 4;

        this.setupInput();

    }


    setupInput() {

        window.addEventListener(
            "keydown",
            (event) => {

                if (event.key.toLowerCase() !== "e")
                    return;

                const target =
                    this.getTarget();

                if (target) {

                    target.interact();

                }

            }
        );

    }


    register(object) {

        this.interactables.push(object);

    }


    unregister(object) {

        this.interactables =
            this.interactables.filter(
                item => item !== object
            );

    }


    getTarget() {

        this.raycaster.setFromCamera(
            new THREE.Vector2(0, 0),
            this.camera
        );

        const meshes =
            this.interactables.map(
                item => item.mesh
            );

        const hits =
            this.raycaster.intersectObjects(
                meshes,
                true
            );

        if (hits.length === 0)
            return null;

        const hit = hits[0];

        if (hit.distance > this.maxDistance)
            return null;

        let object = hit.object;

        while (object) {

            const interactable =
                this.interactables.find(
                    item => item.mesh === object
                );

            if (interactable)
                return interactable;

            object = object.parent;

        }

        return null;

    }

}
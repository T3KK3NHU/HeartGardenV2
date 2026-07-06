import * as THREE from "three";
import { colliders } from "./world/collision.js";

export class Player {

    constructor(camera, canvas) {

        this.camera = camera;
        this.canvas = canvas;

        this.position = new THREE.Vector3(
            0,
            1.7,
            5
        );

        this.speed = 0.12;

        this.velocityY = 0;

        this.gravity = -0.02;

        this.jumpPower = 0.35;

        this.grounded = true;

        this.height = 1.7;

        this.keys = {};

        this.pitch = 0;
        this.yaw = 0;

        this.sensitivity = 0.002;


        this.camera.position.copy(
            this.position
        );


        this.setupKeyboard();
        this.setupMouse();

    }


    setupKeyboard() {

        window.addEventListener(
            "keydown",
            e => {

                const key = e.key.toLowerCase();

                this.keys[key] = true;


                if (
                    e.code === "Space" &&
                    this.grounded
                ) {

                    this.velocityY = this.jumpPower;

                    this.grounded = false;

                }

            }
        );


        window.addEventListener(
            "keyup",
            e => {

                const key = e.key.toLowerCase();

                this.keys[key] = false;

            }
        );

    }



    setupMouse() {


        this.canvas.addEventListener(
            "click",
            () => {

                this.canvas.requestPointerLock();

            }
        );


        document.addEventListener(
            "mousemove",
            e => {


                if (
                    document.pointerLockElement !== this.canvas
                )
                    return;



                this.yaw -=
                    e.movementX *
                    this.sensitivity;



                this.pitch -=
                    e.movementY *
                    this.sensitivity;



                // fej fel/le limit

                this.pitch = Math.max(
                    -Math.PI / 2 + 0.1,
                    Math.min(
                        Math.PI / 2 - 0.1,
                        this.pitch
                    )
                );


            }
        );


    }



    update() {


        // kamera forgatás

        this.camera.rotation.order =
            "YXZ";


        this.camera.rotation.y =
            this.yaw;


        this.camera.rotation.x =
            this.pitch;



        const direction =
            new THREE.Vector3();


        if (this.keys["w"])
            direction.z -= 1;

        if (this.keys["s"])
            direction.z += 1;

        if (this.keys["a"])
            direction.x -= 1;

        if (this.keys["d"])
            direction.x += 1;


        direction.normalize();



        // mozgás kamera irányába

        direction.applyEuler(
            new THREE.Euler(
                0,
                this.yaw,
                0
            )
        );


        const oldX = this.position.x;
        const oldZ = this.position.z;


        // mozgás

        this.position.x +=
            direction.x *
            this.speed;


        this.position.z +=
            direction.z *
            this.speed;



        // ütközés ellenőrzés

        for (const collider of colliders) {

            const dx =
                this.position.x - collider.x;

            const dz =
                this.position.z - collider.z;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dz * dz
                );


            if (
                distance <
                collider.radius
            ) {

                this.position.x = oldX;
                this.position.z = oldZ;

            }

        }

        // ===== GRAVITY =====

        this.velocityY += this.gravity;


        this.position.y += this.velocityY;


        // talaj

        if (this.position.y <= this.height) {

            this.position.y = this.height;

            this.velocityY = 0;

            this.grounded = true;

        }

        this.camera.position.copy(
            this.position
        );


    }

}
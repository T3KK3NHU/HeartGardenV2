export class HUD {

    constructor() {

        this.container =
            document.createElement("div");

        this.container.id =
            "hud";

        document.body.appendChild(
            this.container
        );


        this.crosshair =
            document.createElement("div");

        this.crosshair.innerHTML = "+";

        this.crosshair.id =
            "crosshair";


        this.container.appendChild(
            this.crosshair
        );


        this.message =
            document.createElement("div");

        this.message.id =
            "interaction-text";


        this.container.appendChild(
            this.message
        );

    }


    showMessage(text) {

        this.message.innerText =
            text;

    }


    hideMessage() {

        this.message.innerText =
            "";

    }

}
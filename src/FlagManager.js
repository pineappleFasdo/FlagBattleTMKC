import Phaser from "phaser";
import countries from "./countries.js";
import { COLORS } from "./assets.js";

export default class FlagManager {

    constructor(scene) {
        this.scene = scene;
        this.tokens = [];
        this.labels = [];
    }

    spawn(count, cx, cy, radius) {

        this.clear();

        for (let i = 0; i < count; i++) {

            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            const dist = Phaser.Math.FloatBetween(0, radius - 70);

            const x = cx + Math.cos(angle) * dist;
            const y = cy + Math.sin(angle) * dist;

            const token = this.scene.matter.add.image(
                x,
                y,
                "token"
            );

            token.setCircle(20);

            token.setBounce(1);

            token.setFriction(0);

            token.setFrictionAir(0);

            token.setMass(1);

            token.setTint(
                COLORS[i % COLORS.length]
            );

            token.country =
                countries[i % countries.length];

            const label = this.scene.add.text(

    x,

    y,

    token.country.code,

    {

        fontSize: "11px",

        color: "#ffffff",

        fontStyle: "bold",

        fontFamily: "Arial"

    }

).setOrigin(0.5);

            label.setOrigin(0.5);

            this.tokens.push(token);
            this.labels.push(label);

        }

    }

    launch() {

        for (const token of this.tokens) {

            token.setVelocity(

                Phaser.Math.FloatBetween(-4, 4),

                Phaser.Math.FloatBetween(-4, 4)

            );

            token.setAngularVelocity(

                Phaser.Math.FloatBetween(-0.08, 0.08)

            );

        }

    }

    update() {

        for (let i = 0; i < this.tokens.length; i++) {

            const token = this.tokens[i];
            const label = this.labels[i];

            if (!token || !label) continue;

            label.x = token.x;
            label.y = token.y;
            label.rotation = token.rotation;

        }

    }

    clear() {

        for (const token of this.tokens) {

            if (token) {
                token.destroy();
            }

        }

        for (const label of this.labels) {

            if (label) {
                label.destroy();
            }

        }

        this.tokens = [];
        this.labels = [];

    }

    removeToken(index) {

        if (index < 0 || index >= this.tokens.length) return;

        this.tokens[index].destroy();
        this.labels[index].destroy();

        this.tokens.splice(index, 1);
        this.labels.splice(index, 1);

    }

    getRemainingCount() {

        return this.tokens.length;

    }

}
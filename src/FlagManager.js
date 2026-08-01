import Phaser from "phaser";
import countries from "./countries";

export default class FlagManager {

    constructor(scene) {

        this.scene = scene;
        this.tokens = [];

        this.colors = [
            0xff5252,
            0x42a5f5,
            0x66bb6a,
            0xffca28,
            0xab47bc,
            0xff7043,
            0x26c6da,
            0xec407a,
            0x8d6e63,
            0x7e57c2
        ];

    }

    spawn(count, cx, cy, radius) {

        this.tokens = [];

        for (let i = 0; i < count; i++) {

            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
            const dist = Phaser.Math.FloatBetween(0, radius - 60);

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

            token.setTint(
                this.colors[i % this.colors.length]
            );

            token.country =
                countries[
                    i % countries.length
                ];

            this.tokens.push(token);

        }

    }

    launch() {

        for (const token of this.tokens) {

            token.setVelocity(

                Phaser.Math.FloatBetween(-4,4),

                Phaser.Math.FloatBetween(-4,4)

            );

        }

    }

}
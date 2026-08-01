import Phaser from "phaser";

export default class Arena {

    constructor(scene) {

        this.scene = scene;
        this.graphics = null;

    }

    draw(cx, cy, radius) {

        if (this.graphics) {

            this.graphics.destroy();

        }

        this.graphics = this.scene.add.graphics();

        const gap = Phaser.Math.DegToRad(46);

        const start = -Math.PI / 2 + gap / 2;
        const end = Math.PI * 1.5 - gap / 2;

        // Glow
        this.graphics.lineStyle(16, 0x00ffff, 0.08);
        this.graphics.beginPath();
        this.graphics.arc(cx, cy, radius, start, end);
        this.graphics.strokePath();

        // Main ring
        this.graphics.lineStyle(8, 0xffffff, 1);
        this.graphics.beginPath();
        this.graphics.arc(cx, cy, radius, start, end);
        this.graphics.strokePath();

        // Outer highlight
        this.graphics.lineStyle(2, 0x66ffff, 0.5);
        this.graphics.beginPath();
        this.graphics.arc(cx, cy, radius + 8, start, end);
        this.graphics.strokePath();

    }

}
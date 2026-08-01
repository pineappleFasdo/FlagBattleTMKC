import Phaser from "phaser";

export default class Arena {

    constructor(scene) {
        this.scene = scene;
        this.graphics = scene.add.graphics();
    }

    draw(cx, cy, radius) {

        this.graphics.clear();

        // Background
        this.graphics.fillStyle(0x08111f);
        this.graphics.fillCircle(cx, cy, radius);

        const gap = Phaser.Math.DegToRad(50);

        const start = -Math.PI / 2 + gap / 2;
        const end = Math.PI * 1.5 - gap / 2;

        // Outer glow
        this.graphics.lineStyle(10, 0x39d5ff, 0.35);
        this.graphics.beginPath();
        this.graphics.arc(cx, cy, radius + 4, start, end, false);
        this.graphics.strokePath();

        // White ring
        this.graphics.lineStyle(8, 0xffffff);
        this.graphics.beginPath();
        this.graphics.arc(cx, cy, radius, start, end, false);
        this.graphics.strokePath();
    }

}
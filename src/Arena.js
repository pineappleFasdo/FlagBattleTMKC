import Phaser from "phaser";

export default class Arena {

    constructor(scene) {

        this.scene = scene;
        this.graphics = scene.add.graphics();

    }

    draw(cx, cy, radius) {

        this.graphics.clear();

        // Background
        this.graphics.fillStyle(0x0a1525, 1);
        this.graphics.fillCircle(cx, cy, radius);

        // Glow
        this.graphics.lineStyle(18, 0x00ffff, 0.18);
        this.drawArc(cx, cy, radius + 6);

        // Main border
        this.graphics.lineStyle(8, 0xffffff, 1);
        this.drawArc(cx, cy, radius);

        // Inner border
        this.graphics.lineStyle(3, 0x66ddff, 0.9);
        this.drawArc(cx, cy, radius - 10);

    }

    drawArc(cx, cy, radius) {

        const gap = Phaser.Math.DegToRad(50);

        const start = -Math.PI / 2 + gap / 2;
        const end = Math.PI * 1.5 - gap / 2;

        this.graphics.beginPath();

        this.graphics.arc(
            cx,
            cy,
            radius,
            start,
            end,
            false
        );

        this.graphics.strokePath();

    }

}
import Phaser from "phaser";
import { ARENA_GAP_DEGREES } from "./assets.js";

export default class Arena {

    constructor(scene) {

        this.scene = scene;

        this.graphics = scene.add.graphics();

    }

    draw(cx, cy, radius) {

        this.graphics.clear();

        // Arena background
        this.graphics.fillStyle(0x10223d, 1);
        this.graphics.fillCircle(cx, cy, radius);

        // Soft glow
        this.graphics.lineStyle(14, 0x00d4ff, 0.25);
        this.drawRing(cx, cy, radius + 5);

        // Main border
        this.graphics.lineStyle(8, 0xffffff, 1);
        this.drawRing(cx, cy, radius);

        // Inner border
        this.graphics.lineStyle(3, 0x7fdfff, 0.8);
        this.drawRing(cx, cy, radius - 10);

    }

    drawRing(cx, cy, radius) {

        const gap = Phaser.Math.DegToRad(ARENA_GAP_DEGREES);

        const start = (-Math.PI / 2) + gap / 2;
        const end = (Math.PI * 1.5) - gap / 2;

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
import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("game");
    }

    preload() {

    }

    create() {

        // Screen dimensions
        const width = this.scale.width;
        const height = this.scale.height;

        // Center of screen
        const cx = width / 2;
        const cy = height / 2;

        // Arena radius (responsive)
        const radius = Math.min(width, height) * 0.42;

        // Background
        this.cameras.main.setBackgroundColor("#050814");

        // ---------- TITLE ----------
        this.add.text(cx, 80, "FLAG BATTLE", {
            fontFamily: "Arial",
            fontSize: "56px",
            color: "#ffffff",
            fontStyle: "bold"
        }).setOrigin(0.5);

        // ---------- SUBTITLE ----------
        this.add.text(cx, 145, "Prototype v0.1", {
            fontFamily: "Arial",
            fontSize: "26px",
            color: "#7fdfff"
        }).setOrigin(0.5);

        // ---------- ARENA ----------
        const graphics = this.add.graphics();

        graphics.lineStyle(12, 0x00ffff, 1);

        graphics.strokeCircle(
            cx,
            cy,
            radius
        );

        // Glow effect
        graphics.lineStyle(4, 0x44ffff, 0.35);

        graphics.strokeCircle(
            cx,
            cy,
            radius + 6
        );

        graphics.lineStyle(2, 0x66ffff, 0.15);

        graphics.strokeCircle(
            cx,
            cy,
            radius + 12
        );

        // ---------- CENTER DOT ----------
        graphics.fillStyle(0xffffff);

        graphics.fillCircle(
            cx,
            cy,
            5
        );

        // ---------- DEBUG TEXT ----------
        this.add.text(
            20,
            height - 40,
            `Resolution : ${width} x ${height}`,
            {
                fontFamily: "Arial",
                fontSize: "20px",
                color: "#aaaaaa"
            }
        );

        // Save values for later
        this.cx = cx;
        this.cy = cy;
        this.radius = radius;

    }

    update() {

    }

}
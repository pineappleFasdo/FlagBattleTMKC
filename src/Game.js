import Phaser from "phaser";

import Arena from "./Arena";
import PhysicsManager from "./Physics";
import FlagManager from "./FlagManager";
import Tournament from "./Tournament";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {

        const g = this.make.graphics({ add: false });

        g.fillStyle(0xffffff, 1);
        g.fillCircle(20, 20, 20);

        g.lineStyle(2, 0x222222);
        g.strokeCircle(20, 20, 20);

        g.generateTexture("token", 40, 40);

        g.destroy();

    }

    create() {

        this.started = false;
        this.timeLeft = 60;

        this.resizeGame();

        this.scale.on(
            "resize",
            this.resizeGame,
            this
        );

        this.arena = new Arena(this);

        this.physicsManager = new PhysicsManager(this);

        this.flagManager = new FlagManager(this);

        this.tournament = new Tournament();

        this.arena.draw(
            this.cx,
            this.cy,
            this.radius
        );

        // Build Matter wall with opening
        this.physicsManager.buildArena(
            this.cx,
            this.cy,
            this.radius
        );

        this.createUI();

        this.flagManager.spawn(
            50,
            this.cx,
            this.cy,
            this.radius - 30
        );

    }

    resizeGame() {

        this.w = this.scale.width;

        this.h = this.scale.height;

        this.cx = this.w / 2;

        this.cy = this.h * 0.60;

        this.radius = Math.min(
            this.w,
            this.h
        ) * 0.43;

        this.cameras.main.setBackgroundColor(
            "#08111f"
        );

    }

    createUI() {

        this.title = this.add.text(
            this.cx,
            60,
            "FLAG BATTLE",
            {
                fontSize: "46px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(.5);

        this.timer = this.add.text(
            this.cx,
            110,
            "QUALIFYING • 60",
            {
                fontSize: "28px",
                color: "#7fdfff"
            }
        ).setOrigin(.5);

        this.counter = this.add.text(
            this.cx,
            150,
            "Flags : 50",
            {
                fontSize: "24px",
                color: "#ffffff"
            }
        ).setOrigin(.5);

        this.roundText = this.add.text(
            this.cx,
            185,
            this.tournament.getRoundName(),
            {
                fontSize: "22px",
                color: "#ffd54f"
            }
        ).setOrigin(.5);

        this.startButton = this.add.text(
            this.cx,
            this.h - 90,
            "START BATTLE",
            {
                fontSize: "34px",
                color: "#000000",
                backgroundColor: "#00ffff",
                padding: {
                    left: 18,
                    right: 18,
                    top: 10,
                    bottom: 10
                }
            }
        ).setOrigin(.5).setInteractive();

        this.startButton.on(
            "pointerdown",
            () => this.beginBattle()
        );

    }

    beginBattle() {

        if (this.started) return;

        this.started = true;

        this.startButton.setVisible(false);

        this.flagManager.launch();
this.shakeTimer = this.time.addEvent({

    delay: 250,

    loop: true,

    callback: () => {

        for (const token of this.flagManager.tokens) {

            if (!token || !token.body) continue;

            token.applyForce({

                x: Phaser.Math.FloatBetween(-0.00018, 0.00018),

                y: Phaser.Math.FloatBetween(-0.00018, 0.00018)

            });

        }

    }

});

        this.time.addEvent({

            delay: 1000,

            repeat: 59,

            callback: () => {

                this.timeLeft--;

                this.timer.setText(
                    "QUALIFYING • " + this.timeLeft
                );

                if (this.timeLeft <= 0) {

                    this.endQualifying();

                }

            }

        });

    }
endQualifying() {

    if (this.shakeTimer) {
        this.shakeTimer.remove();
    }

    this.tournament.nextRound();

    this.roundText.setText(
        this.tournament.getRoundName()
    );

}

    update() {

        this.flagManager.update();
this.physicsManager.update(
    this.flagManager.tokens,
    this.cx,
    this.cy,
    this.radius
);

    }

}
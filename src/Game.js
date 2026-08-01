import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  preload() {}

  create() {
    // Screen size
    this.w = this.scale.width;
    this.h = this.scale.height;

    // Arena
    this.cx = this.w / 2;
    this.cy = this.h / 2;
    this.radius = Math.min(this.w, this.h) * 0.42;

    // Background
    this.cameras.main.setBackgroundColor("#08111f");

    // ===== Title =====
    this.add
      .text(this.cx, 60, "FLAG BATTLE", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#ffffff",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    // ===== Timer =====
    this.timeLeft = 60;

    this.timerText = this.add
      .text(this.cx, 115, `QUALIFYING • ${this.timeLeft}`, {
        fontFamily: "Arial",
        fontSize: "28px",
        color: "#7fdfff",
      })
      .setOrigin(0.5);

    // Countdown
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
          this.timerText.setText(
            `QUALIFYING • ${this.timeLeft}`
          );
        }
      },
    });

    // ===== Arena =====
    const graphics = this.add.graphics();

    graphics.lineStyle(18, 0x00ffff, 0.12);
    graphics.strokeCircle(this.cx, this.cy, this.radius);

    graphics.lineStyle(8, 0xffffff, 1);
    graphics.strokeCircle(this.cx, this.cy, this.radius);

    graphics.lineStyle(2, 0x66ffff, 0.5);
    graphics.strokeCircle(this.cx, this.cy, this.radius + 8);

    // ===== Create Ball Texture =====
    const g = this.add.graphics();

    g.fillStyle(0xffffff, 1);
    g.fillCircle(16, 16, 16);

    g.generateTexture("ball", 32, 32);

    g.destroy();

    // ===== Physics Balls =====
    this.balls = [];

    for (let i = 0; i < 40; i++) {
      const angle = Phaser.Math.FloatBetween(
        0,
        Math.PI * 2
      );

      const dist = Phaser.Math.FloatBetween(
        0,
        this.radius - 50
      );

      const x = this.cx + Math.cos(angle) * dist;
      const y = this.cy + Math.sin(angle) * dist;

      const ball = this.matter.add.image(
        x,
        y,
        "ball"
      );

      ball.setCircle(16);
      ball.setBounce(1);
      ball.setFriction(0);
      ball.setFrictionAir(0);
      ball.setMass(1);

      ball.setVelocity(
        Phaser.Math.FloatBetween(-4, 4),
        Phaser.Math.FloatBetween(-4, 4)
      );

      this.balls.push(ball);
    }

    // ===== Start Button =====
    this.startButton = this.add
      .text(this.cx, this.h - 90, "START BATTLE", {
        fontFamily: "Arial",
        fontSize: "34px",
        color: "#000000",
        backgroundColor: "#00E5FF",
        padding: {
          left: 18,
          right: 18,
          top: 10,
          bottom: 10,
        },
      })
      .setOrigin(0.5)
      .setInteractive();

    this.startButton.on("pointerdown", () => {
      this.startButton.setText("COMING SOON");
    });
  }

  update() {
    // Keep balls inside arena

    for (const ball of this.balls) {
      const dx = ball.x - this.cx;
      const dy = ball.y - this.cy;

      const d = Math.sqrt(dx * dx + dy * dy);

      if (d > this.radius - 16) {
        const nx = dx / d;
        const ny = dy / d;

        ball.setPosition(
          this.cx + nx * (this.radius - 16),
          this.cy + ny * (this.radius - 16)
        );

        ball.setVelocity(
          -ball.body.velocity.x,
          -ball.body.velocity.y
        );
      }
    }
  }
}
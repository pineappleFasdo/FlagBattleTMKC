import Phaser from "phaser";

export default class PhysicsManager {

    constructor(scene) {
        this.scene = scene;
        this.walls = [];
    }

    clear() {

        this.walls.forEach(body => {
            this.scene.matter.world.remove(body);
        });

        this.walls = [];

    }

    buildArena(cx, cy, radius) {

        this.clear();

        const segments = 72;
        const gapSize = 50;

        for (let i = 0; i < segments; i++) {

            const angle = (Math.PI * 2 / segments) * i;

            // Opening at top
            let deg = Phaser.Math.RadToDeg(angle) - 90;

            if (deg < 0) deg += 360;

            if (deg < gapSize || deg > 360 - gapSize) {
                continue;
            }

            const x = cx + Math.cos(angle) * radius;
            const y = cy + Math.sin(angle) * radius;

            const wall = this.scene.matter.add.rectangle(
                x,
                y,
                radius * 0.11,
                10,
                {
                    isStatic: true,
                    angle: angle + Math.PI / 2
                }
            );

            this.walls.push(wall);
        }
    }

    update(tokens, cx, cy, radius) {

        for (let i = tokens.length - 1; i >= 0; i--) {

            const token = tokens[i];

            const dx = token.x - cx;
            const dy = token.y - cy;

            const distance = Math.sqrt(dx * dx + dy * dy);

            // Ball has completely left the arena
            if (distance > radius + 40) {

                token.destroy();
                tokens.splice(i, 1);

            }

        }

    }

}
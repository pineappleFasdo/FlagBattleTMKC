import Phaser from "phaser";

export default class PhysicsManager {

    constructor(scene) {

        this.scene = scene;
        this.walls = [];

    }

    buildArena(cx, cy, radius) {

        // Remove previous walls
        this.walls.forEach(w => {
            this.scene.matter.world.remove(w);
        });

        this.walls = [];

        const SEGMENTS = 72;
        const GAP = Phaser.Math.DegToRad(50);

        for (let i = 0; i < SEGMENTS; i++) {

            const a1 = (Math.PI * 2 / SEGMENTS) * i;
            const a2 = (Math.PI * 2 / SEGMENTS) * (i + 1);

            let mid = (a1 + a2) / 2;

            // normalize
            if (mid > Math.PI)
                mid -= Math.PI * 2;

            // TOP opening
            if (
                mid >
                    (-Math.PI / 2 - GAP / 2) &&
                mid <
                    (-Math.PI / 2 + GAP / 2)
            ) {
                continue;
            }

            const x1 = cx + Math.cos(a1) * radius;
            const y1 = cy + Math.sin(a1) * radius;

            const x2 = cx + Math.cos(a2) * radius;
            const y2 = cy + Math.sin(a2) * radius;

            const length = Phaser.Math.Distance.Between(
                x1,
                y1,
                x2,
                y2
            );

            const wall = this.scene.matter.add.rectangle(

                (x1 + x2) / 2,

                (y1 + y2) / 2,

                length,

                8,

                {

                    isStatic: true,

                    angle: Phaser.Math.Angle.Between(
                        x1,
                        y1,
                        x2,
                        y2
                    )

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

            const d = Math.sqrt(dx * dx + dy * dy);

            // escaped arena
            if (d > radius + 60) {

                token.destroy();
                tokens.splice(i, 1);

            }

        }

    }

}
import Phaser from "phaser";

export default class PhysicsManager {

    constructor(scene) {

        this.scene = scene;
        this.walls = [];

    }

    buildArena(cx, cy, radius) {

        // Remove old walls
        this.walls.forEach(w => this.scene.matter.world.remove(w));
        this.walls = [];

        const segments = 64;
        const gapAngle = Phaser.Math.DegToRad(50);

        for (let i = 0; i < segments; i++) {

            const a1 = (Math.PI * 2 / segments) * i;
            const a2 = (Math.PI * 2 / segments) * (i + 1);

            // Skip the opening at the top
            const mid = (a1 + a2) / 2;

            if (
                mid > (Math.PI * 1.5 - gapAngle / 2) ||
                mid < (gapAngle / 2 - Math.PI / 2 + Math.PI * 2)
            ) {
                continue;
            }

            const x1 = cx + Math.cos(a1) * radius;
            const y1 = cy + Math.sin(a1) * radius;

            const x2 = cx + Math.cos(a2) * radius;
            const y2 = cy + Math.sin(a2) * radius;

            const wall = this.scene.matter.add.rectangle(
                (x1 + x2) / 2,
                (y1 + y2) / 2,
                Phaser.Math.Distance.Between(x1, y1, x2, y2),
                10,
                {
                    isStatic: true,
                    angle: Phaser.Math.Angle.Between(x1, y1, x2, y2)
                }
            );

            this.walls.push(wall);

        }

    }

}
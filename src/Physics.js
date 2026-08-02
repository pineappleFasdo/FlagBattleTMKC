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

    const segments = 120;
    const gapDegrees = 36;

    for (let i = 0; i < segments; i++) {

        const angle1 = (Math.PI * 2 * i) / segments;
        const angle2 = (Math.PI * 2 * (i + 1)) / segments;

        let deg = Phaser.Math.RadToDeg((angle1 + angle2) / 2);

        // Convert so 0° is at the TOP
        deg = (deg + 90) % 360;

        // Skip only the top opening
        if (
            deg > 360 - gapDegrees / 2 ||
            deg < gapDegrees / 2
        ) {
            continue;
        }

        const x1 = cx + Math.cos(angle1) * radius;
        const y1 = cy + Math.sin(angle1) * radius;

        const x2 = cx + Math.cos(angle2) * radius;
        const y2 = cy + Math.sin(angle2) * radius;

        const length = Phaser.Math.Distance.Between(
            x1,
            y1,
            x2,
            y2
        );

        const wall = this.scene.matter.add.rectangle(

            (x1 + x2) / 2,

            (y1 + y2) / 2,

            length + 3,

            12,

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

        if (!token || !token.body) continue;

        const dx = token.x - cx;
        const dy = token.y - cy;

        const distance = Math.sqrt(dx * dx + dy * dy);

        // Remove token once it is clearly outside the arena
        if (distance > radius + 12) {

            token.destroy();
            tokens.splice(i, 1);

            if (this.scene.flagManager) {
                this.scene.flagManager.labels[i].destroy();
                this.scene.flagManager.labels.splice(i, 1);
            }

            if (this.scene.counter) {
                this.scene.counter.setText(
                    "Flags : " + tokens.length
                );
            }

        }

    }

}

}
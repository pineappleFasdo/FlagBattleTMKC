export default class Arena {

    constructor(scene){

        this.scene=scene;

        this.graphics=null;

    }

    draw(cx,cy,radius){

        if(this.graphics){

            this.graphics.destroy();

        }

        this.graphics=this.scene.add.graphics();

        this.graphics.lineStyle(16,0x00ffff,0.08);
        this.graphics.strokeCircle(cx,cy,radius);

        this.graphics.lineStyle(8,0xffffff,1);
        this.graphics.strokeCircle(cx,cy,radius);

        this.graphics.lineStyle(2,0x66ffff,0.5);
        this.graphics.strokeCircle(cx,cy,radius+8);

    }

}
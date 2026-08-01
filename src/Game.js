import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

        this.flags = [];
        this.gameStarted = false;
        this.timeLeft = 60;
    }

    preload() {

        // Temporary white circle texture
        const g = this.make.graphics({ x: 0, y: 0, add: false });

        g.fillStyle(0xffffff);
        g.fillCircle(20,20,20);

        g.generateTexture("flag",40,40);

    }

    create() {

        this.w = this.scale.width;
        this.h = this.scale.height;

        this.cx = this.w / 2;
        this.cy = this.h / 2;

        this.radius = Math.min(this.w,this.h)*0.42;

        this.cameras.main.setBackgroundColor("#08111f");

        this.drawArena();

        this.createBoundary();

        this.createUI();

        this.spawnFlags(50);

    }

    drawArena(){

        const g=this.add.graphics();

        g.lineStyle(20,0x00ffff,0.08);
        g.strokeCircle(
            this.cx,
            this.cy,
            this.radius
        );

        g.lineStyle(8,0xffffff,1);

        g.strokeCircle(
            this.cx,
            this.cy,
            this.radius
        );

        g.lineStyle(2,0x66ffff,0.5);

        g.strokeCircle(
            this.cx,
            this.cy,
            this.radius+8
        );

    }

    createUI(){

        this.add.text(

            this.cx,

            60,

            "FLAG BATTLE",

            {

                fontSize:"48px",

                color:"#ffffff",

                fontStyle:"bold"

            }

        ).setOrigin(.5);

        this.timer=this.add.text(

            this.cx,

            115,

            "QUALIFYING • 60",

            {

                fontSize:"28px",

                color:"#7fdfff"

            }

        ).setOrigin(.5);

        this.startButton=this.add.text(

            this.cx,

            this.h-80,

            "START",

            {

                fontSize:"34px",

                backgroundColor:"#00ffff",

                color:"#000",

                padding:{

                    left:20,

                    right:20,

                    top:10,

                    bottom:10

                }

            }

        ).setOrigin(.5).setInteractive();

        this.startButton.on("pointerdown",()=>{

            this.startBattle();

        });

    }

    createBoundary() {

        const pieces = 64;

        for (let i = 0; i < pieces; i++) {

            const a = (Math.PI * 2 / pieces) * i;

            const x = this.cx + Math.cos(a) * this.radius;
            const y = this.cy + Math.sin(a) * this.radius;

            this.matter.add.circle(x, y, 6, {
                isStatic: true
            });

        }

    }

    spawnFlags(count) {

        for (let i = 0; i < count; i++) {

            const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);

            const dist = Phaser.Math.FloatBetween(0, this.radius - 60);

            const x = this.cx + Math.cos(angle) * dist;
            const y = this.cy + Math.sin(angle) * dist;

            const flag = this.matter.add.image(
                x,
                y,
                "flag"
            );

            flag.setCircle(20);

            flag.setBounce(1);

            flag.setFriction(0);

            flag.setFrictionAir(0);

            flag.setVelocity(

                Phaser.Math.FloatBetween(-2,2),

                Phaser.Math.FloatBetween(-2,2)

            );

            this.flags.push(flag);

        }

    }

    startBattle(){

        if(this.gameStarted) return;

        this.gameStarted=true;

        this.startButton.setVisible(false);

        this.time.addEvent({

            delay:1000,

            repeat:59,

            callback:()=>{

                this.timeLeft--;

                this.timer.setText(
                    "QUALIFYING • " + this.timeLeft
                );

            }

        });

    }

    update(){

        for(const flag of this.flags){

            const dx=flag.x-this.cx;
            const dy=flag.y-this.cy;

            const d=Math.sqrt(dx*dx+dy*dy);

            if(d>this.radius-20){

                const nx=dx/d;
                const ny=dy/d;

                flag.setPosition(

                    this.cx+nx*(this.radius-20),

                    this.cy+ny*(this.radius-20)

                );

                flag.setVelocity(

                    -flag.body.velocity.x,

                    -flag.body.velocity.y

                );

            }

        }

    }

}
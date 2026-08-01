import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");

        this.tokens = [];
        this.started = false;
        this.timeLeft = 60;
    }

    preload() {

        // Create placeholder token texture
        const g = this.make.graphics({ add: false });

        g.fillStyle(0xffffff, 1);
        g.fillCircle(20,20,20);

        g.lineStyle(2,0x222222);
        g.strokeCircle(20,20,20);

        g.generateTexture("token",40,40);

        g.destroy();

    }

    create(){

        this.resize();

        this.scale.on(
            "resize",
            this.resize,
            this
        );

        this.drawArena();

        this.createWalls();

        this.createUI();

        this.spawnTokens(50);

    }

    resize(){

        this.w=this.scale.width;
        this.h=this.scale.height;

        this.cx=this.w/2;
        this.cy=this.h/2;

        this.radius=Math.min(this.w,this.h)*0.40;

        this.cameras.main.setBackgroundColor("#08111f");

    }

    drawArena(){

        if(this.arena){

            this.arena.destroy();

        }

        this.arena=this.add.graphics();

        this.arena.lineStyle(
            16,
            0x00ffff,
            .08
        );

        this.arena.strokeCircle(
            this.cx,
            this.cy,
            this.radius
        );

        this.arena.lineStyle(
            8,
            0xffffff,
            1
        );

        this.arena.strokeCircle(
            this.cx,
            this.cy,
            this.radius
        );

        this.arena.lineStyle(
            2,
            0x66ffff,
            .5
        );

        this.arena.strokeCircle(
            this.cx,
            this.cy,
            this.radius+8
        );

    }

    createUI(){

        this.title=this.add.text(

            this.cx,

            55,

            "FLAG BATTLE",

            {

                fontSize:"46px",

                color:"#ffffff",

                fontStyle:"bold"

            }

        ).setOrigin(.5);

        this.timer=this.add.text(

            this.cx,

            105,

            "QUALIFYING • 60",

            {

                fontSize:"28px",

                color:"#7fdfff"

            }

        ).setOrigin(.5);

        this.counter=this.add.text(

            this.cx,

            145,

            "Flags : 50",

            {

                fontSize:"24px",

                color:"#ffffff"

            }

        ).setOrigin(.5);

        this.start=this.add.text(

            this.cx,

            this.h-80,

            "START",

            {

                fontSize:"34px",

                backgroundColor:"#00ffff",

                color:"#000",

                padding:{
                    left:18,
                    right:18,
                    top:10,
                    bottom:10
                }

            }

        ).setOrigin(.5).setInteractive();

        this.start.on(

            "pointerdown",

            ()=>{

                this.beginBattle();

            }

        );

    }

    createWalls(){

        this.wallRadius=this.radius-18;

    }

    spawnTokens(count){

        const colors=[
            0xff5252,
            0x42a5f5,
            0x66bb6a,
            0xffca28,
            0xab47bc,
            0xff7043,
            0x26c6da,
            0xec407a,
            0x8d6e63,
            0x7e57c2
        ];

        for(let i=0;i<count;i++){

            const angle=Phaser.Math.FloatBetween(0,Math.PI*2);

            const dist=Phaser.Math.FloatBetween(0,this.radius-60);

            const x=this.cx+Math.cos(angle)*dist;
            const y=this.cy+Math.sin(angle)*dist;

            const token=this.matter.add.image(
                x,
                y,
                "token"
            );

            token.setCircle(20);
            token.setBounce(1);
            token.setFriction(0);
            token.setFrictionAir(0);
            token.setMass(1);

            token.setTint(colors[i%colors.length]);

            this.tokens.push(token);

        }

    }

    beginBattle(){

        if(this.started) return;

        this.started=true;

        this.start.setVisible(false);

        for(const token of this.tokens){

            token.setVelocity(

                Phaser.Math.FloatBetween(-4,4),

                Phaser.Math.FloatBetween(-4,4)

            );

        }

        this.time.addEvent({

            delay:1000,

            repeat:59,

            callback:()=>{

                this.timeLeft--;

                this.timer.setText(
                    "QUALIFYING • "+this.timeLeft
                );

            }

        });

    }

    update(){

        for(const token of this.tokens){

            const dx=token.x-this.cx;
            const dy=token.y-this.cy;

            const d=Math.sqrt(dx*dx+dy*dy);

            if(d>this.wallRadius){

                const nx=dx/d;
                const ny=dy/d;

                token.setPosition(

                    this.cx+nx*this.wallRadius,

                    this.cy+ny*this.wallRadius

                );

                token.setVelocity(

                    -token.body.velocity.x,

                    -token.body.velocity.y

                );

            }

        }

    }

}
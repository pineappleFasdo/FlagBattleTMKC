import Phaser from "phaser";

export default class GameScene extends Phaser.Scene{

constructor(){

super("game");

}

preload(){

}

create(){

this.add.text(

540,

70,

"FLAG BATTLE",

{

fontSize:54,

color:"#ffffff"

}

).setOrigin(.5);

const radius=450;

const graphics=this.add.graphics();

graphics.lineStyle(10,0x00ffff);

graphics.strokeCircle(540,950,radius);

}
}
import Phaser from "phaser";
import GameScene from "./Game";

new Phaser.Game({

type:Phaser.AUTO,

width:1080,

height:1920,

backgroundColor:"#050814",

physics:{

default:"matter",

matter:{

gravity:{
x:0,
y:0
},

debug:false

}

},

scene:[GameScene]

});
import Phaser from "phaser";
import GameScene from "./Game";

const config = {
    type: Phaser.AUTO,

    parent: "game",

    backgroundColor: "#050814",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },

    physics: {
        default: "matter",
        matter: {
            gravity: {
                x: 0,
                y: 0
            },
            debug: false
        }
    },

    scene: [GameScene]
};

new Phaser.Game(config);
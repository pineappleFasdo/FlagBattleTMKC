import Phaser from "phaser";
import GameScene from "./Game.js";

const config = {
    type: Phaser.AUTO,

    parent: "game",

    backgroundColor: "#08111f",

    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
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
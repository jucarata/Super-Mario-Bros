import { createMarioAnimations } from "../animations/mario-animations.js"

const PLAYER = (game) => {
    const mario = game.physics.add.sprite(50, 100, "mario")
                        .setOrigin(0, 1)
                        .setDepth(10)
                        .setCollideWorldBounds(true)

    mario.body.setGravityY(600)
    //Animations
    createMarioAnimations(game)

    return mario
}

export default PLAYER
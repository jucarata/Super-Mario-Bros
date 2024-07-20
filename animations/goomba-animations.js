export const createGoombaAnimations = (game) => {
    game.anims.create({
        key: "goomba-walk",
        frames: game.anims.generateFrameNumbers(
            "goomba", {start: 1, end: 0}
        ),
        frameRate: 12
    })

    game.anims.create({
        key:"goomba-dead",
        frames: [{key: "goomba", frame: 2}]
    })
}
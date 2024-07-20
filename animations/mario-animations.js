export const createAnimations = (game) => {
    game.anims.create({
        key: "mario-walk",
        frames: game.anims.generateFrameNumbers(
            "mario", {start: 3, end: 1}
        ),
        frameRate: 12
    })

    game.anims.create({
        key: "mario-idle",
        frames: [{key: "mario", frame: 0}]
    })

    game.anims.create({
        key:"mario-jump",
        frames: [{key: "mario", frame: 5}]
    })

    game.anims.create({
        key:"mario-dead",
        frames: [{key: "mario", frame: 4}]
    })
}
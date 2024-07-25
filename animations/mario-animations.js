export const createMarioAnimations = (game) => {
    if(!game.anims.exists("mario-walk")){
        game.anims.create({
            key: "mario-walk",
            frames: game.anims.generateFrameNumbers(
                "mario", {start: 3, end: 1}
            ),
            frameRate: 12
        })
    }

    if(!game.anims.exists("mario-idle")){
        game.anims.create({
            key: "mario-idle",
            frames: [{key: "mario", frame: 0}]
        })
    }
    
    if(!game.anims.exists("mario-jump")){
        game.anims.create({
            key:"mario-jump",
            frames: [{key: "mario", frame: 5}],
            frameRate: 20
        })
    }

    if(!game.anims.exists("mario-dead")){
        game.anims.create({
            key:"mario-dead",
            frames: [{key: "mario", frame: 4}]
        })
    }
}
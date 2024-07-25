export const createGoombaAnimations = (game) => {

    if(!game.anims.exists("goomba-walk")){
        game.anims.create({
            key: "goomba-walk",
            frames: game.anims.generateFrameNumbers(
                "goomba", {start: 1, end: 0}
            ),
            frameRate: 12
        })
    }

    if(!game.anims.exists("goomba-dead")){
        game.anims.create({
            key:"goomba-dead",
            frames: [{key: "goomba", frame: 2}],
            frameRate: 2
        })
    }
}
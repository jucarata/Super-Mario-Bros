import GOOMBA from "../entities/goomba.js"

let context = {}

let player = {}
let enviroment = {}
let entities = {}
let sounds = {}
let config = {}

const createScenary = (game, CONFIG, PLAYER, SOUNDS) => {
    //Set LEVEL CONFIG
    context = game
    sounds = SOUNDS
    config = CONFIG
    player = PLAYER
    entities = {
        GOOMBA: context.physics.add.group({
            classType: Phaser.Physics.Arcade.Sprite,
            runChildUpdate: true
        })
    }

    GOOMBA(context, entities.GOOMBA, 250, 200)
    
    //Start level
    sounds.MAINTHEME.play()

    //Static groups
    enviroment.floor = context.physics.add.staticGroup()
    
    //Scenary
    sky()
    bush()
    mountains()
    floor()
    

    //Collisions
    context.physics.add.collider(player, enviroment.floor)
    context.physics.add.collider(entities.GOOMBA, enviroment.floor)
    context.physics.add.collider(player, entities.GOOMBA, hitGombat)
}

const updateScenary = () => {
    Phaser.Actions.Call(entities.GOOMBA.getChildren(), (goomba) => {
        goomba.x -= 0.3;
        goomba.anims.play("goomba-walk", true);
    });
}


const floor = () => {
    enviroment.floor.create(0, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()

    enviroment.floor.create(120, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()

    enviroment.floor.create(230, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()

    enviroment.floor.create(340, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()

    enviroment.floor.create(450, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()

    enviroment.floor.create(670, config.height - 16, "floorbricks")
        .setOrigin(0, 0.5)
        .setDepth(2)
        .refreshBody()
    
}

const mountains = () => {
    context.add.image(0, 200, "mountain2")
        .setOrigin(0, 0)
        .setScale(1)
        .setDepth(1)

    context.add.image(450, 230, "mountain1")
        .setOrigin(0, 0)
        .setScale(1)
        .setDepth(1)
}

const bush = () => {
    context.add.image(350, 250, "bush1")
        .setOrigin(0, 0)
        .setScale(0.8)
        .setDepth(1)
}

const sky = () => {
    context.add.image(100, 50, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)

    context.add.image(200, 10, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)

    context.add.image(300, 30, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)
    
    context.add.image(400, 60, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)
}


const hitGombat = (player, goomba) => {
    if (player.body.touching.down && goomba.body.touching.up) {
        goomba.anims.play("goomba-dead", true);
        goomba.destroy()

        player.setVelocityY(-500);
    } else {
        config.STOP_GAME = true
        player.isDead = true
        player.body.checkCollision.none = true
        sounds.MAINTHEME.stop()
        player.anims.play("mario-dead", true)
        player.setCollideWorldBounds(false)
        sounds.GAMEOVER.play()

        setTimeout(() => {
            player.setVelocityY(-600)
        }, 100)

        setTimeout(() => {
            sounds.GAMEOVER.stop()
            context.scene.restart()
            config.STOP_GAME = false
        }, 2500);
    }
}

export {createScenary, updateScenary}
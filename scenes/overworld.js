import { goomba } from "../entities/goomba.js"
import { createGoombaAnimations } from "../animations/goomba-animations.js"

let player = {}
let enviroment = {}
let entities = {}

const createScenary = (game, config, mario) => {
    player = mario
    //Everything related with the enviroment

    //Static groups
    enviroment.floor = game.physics.add.staticGroup()
    entities.GOOMBA = goomba(game)
    
    createGoombaAnimations(game)
    
    //Scenary
    sky(game)
    bush(game)
    mountains(game)
    
    floor(config, enviroment)
    
    


    //Collisions
    game.physics.add.collider(player.MARIO, enviroment.floor)
    game.physics.add.collider(entities.GOOMBA, enviroment.floor)
    game.physics.add.collider(player.MARIO, entities.GOOMBA, hitGombat)
}

const updateScenary = (game) => {
    entities.GOOMBA.setVelocityX(-30)
    entities.GOOMBA.anims.play("goomba-walk", true)
}


const floor = (config, enviroment) => {
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

const mountains = (game) => {
    game.add.image(0, 230, "mountain1")
        .setOrigin(0, 0)
        .setScale(1)
        .setDepth(1)
}

const bush = (game) => {
    game.add.image(250, 250, "bush1")
        .setOrigin(0, 0)
        .setScale(0.8)
        .setDepth(1)
}

const sky = (game) => {
    game.add.image(100, 50, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)

    game.add.image(200, 10, "cloud1")
        .setOrigin(0, 0)
        .setScale(0.15)
}


const hitGombat = () => {
    if(player.MARIO.body.touching.down && entities.GOOMBA.body.touching.up){
        console.log("Te mate jeje")
    } else {
        console.log("Me mataste jeje")
    }
}

export {createScenary, updateScenary}
import { 
    createScenary as STARTLEVEL1,
    updateScenary as UPDATELEVEL1
} from "./scenes/LEVEL1.js"
import PLAYER from "./entities/player.js"
import { createSounds } from "./sounds/general.js"

const CONFIG = {
    type: Phaser.AUTO,
    width: 512,
    height: 300,
    backgroundColor: "049cd8",
    parent: "game",
    STOP_GAME: false, //Reference to div id in html
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 1000},
            debug: false
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

//Create the game
new Phaser.Game(CONFIG)

//Entities
let MARIO = {}
let BASE_SOUNDS = {}
let STOP_GAME = false


function preload(){
    this.load.image("cloud1", "assets/scenery/overworld/cloud1.png")
    this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png")
    this.load.image("mountain1", "assets/scenery/overworld/mountain1.png")
    this.load.image("mountain2", "assets/scenery/overworld/mountain2.png")
    this.load.image("bush1", "assets/scenery/overworld/bush1.png")

    //Entities
    this.load.spritesheet("mario", "assets/entities/mario.png", {frameWidth: 18, frameHeight: 16})
    this.load.spritesheet("goomba", "assets/entities/overworld/goomba.png", {frameWidth: 16, frameHeight: 16})

    //Audios
    this.load.audio("main-theme", "assets/sound/music/overworld/theme.mp3")
    this.load.audio("gameover", "assets/sound/music/gameover.mp3")
}

function create(){

    // Create player
    MARIO = PLAYER(this)
    
    //Create base sounds (General sounds, not a specefic level sound)
    BASE_SOUNDS = createSounds(this)

    //GENERAL CONFIG
    this.physics.world.setBounds(0, 0 , 2000, CONFIG.height)
    this.cameras.main.setBounds(0, 0 , 2000, CONFIG.height)
    this.cameras.main.startFollow(MARIO)

    this.keys = this.input.keyboard.createCursorKeys()
    STARTLEVEL1(this, CONFIG, MARIO, BASE_SOUNDS, STOP_GAME)
}

function update(){
    if(!CONFIG.STOP_GAME){
        UPDATELEVEL1()
        if(MARIO.isDead){return}
            
        if(this.keys.left.isDown){
            MARIO.anims.play("mario-walk", true)
            MARIO.x -= 2
            MARIO.flipX = true
        } else if(this.keys.right.isDown){
            MARIO.anims.play("mario-walk", true)
            MARIO.x += 2
            MARIO.flipX = false
        } else if(this.keys.down.isDown){
            MARIO.y += 2
        } else{MARIO.anims.play("mario-idle", true)}

        //I split the key up cause we can press down the key up and other key at same time
        if(this.keys.up.isDown && MARIO.body.touching.down){
            MARIO.setVelocityY(-500)
            MARIO.anims.play("mario-jump", true)
        }

        if(MARIO.y >= CONFIG.height){
            BASE_SOUNDS.MAINTHEME.stop()
            MARIO.isDead = true
            MARIO.anims.play("mario-dead", true)
            MARIO.setCollideWorldBounds(false)
            BASE_SOUNDS.GAMEOVER.play()

            setTimeout(() => {
                MARIO.setVelocityY(-600)
            }, 100)

            setTimeout(() => {
                BASE_SOUNDS.GAMEOVER.stop()
                this.scene.restart()
            }, 2500)
        }
    } else {
        return
    }
}
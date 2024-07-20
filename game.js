import { createAnimations } from "./animations/mario-animations.js"
import { createScenary, updateScenary} from "./scenes/overworld.js"

const config = {
    type: Phaser.AUTO,
    width: 512,
    height: 300,
    backgroundColor: "049cd8",
    parent: "game", //Reference to div id in html
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
new Phaser.Game(config)

//Entities
let player = {}
let sounds = {}


function preload(){
    this.load.image("cloud1", "assets/scenery/overworld/cloud1.png")
    this.load.image("floorbricks", "assets/scenery/overworld/floorbricks.png")
    this.load.image("mountain1", "assets/scenery/overworld/mountain1.png")
    this.load.image("mountain2", "assets/scenery/overworld/mountain2.png")
    this.load.image("bush1", "assets/scenery/overworld/bush1.png")

    //Entities
    this.load.spritesheet("mario", "assets/entities/mario.png", {frameWidth: 18, frameHeight: 16})
    this.load.spritesheet("goomba", "assets/entities/overworld/goomba.png", {frameWidth: 16, frameHeight: 16})

    this.load.audio("main-theme", "assets/sound/music/overworld/theme.mp3")
    this.load.audio("gameover", "assets/sound/music/gameover.mp3")
}

function create(){
    

    sounds.mainTheme = this.sound.add("main-theme")
    sounds.gameover = this.sound.add("gameover")
    sounds.mainTheme.play()

    player.MARIO = this.physics.add.sprite(50, 100, "mario")
        .setOrigin(0, 1)
        .setDepth(10)
        .setCollideWorldBounds(true)

    
    //Limits and camera
    this.physics.world.setBounds(0, 0 , 2000, config.height)
    

    this.cameras.main.setBounds(0, 0 , 2000, config.height)
    this.cameras.main.startFollow(player.MARIO)

    createScenary(this, config, player)

    // Animations
    createAnimations(this)

    this.keys = this.input.keyboard.createCursorKeys()
}

function update(){
   if(player.MARIO.isDead){return}
    
   if(this.keys.left.isDown){
        player.MARIO.anims.play("mario-walk", true)
        player.MARIO.x -= 2
        player.MARIO.flipX = true
   } else if(this.keys.right.isDown){
        player.MARIO.anims.play("mario-walk", true)
        player.MARIO.x += 2
        player.MARIO.flipX = false
   } else if(this.keys.down.isDown){
        player.MARIO.y += 2
   } else{player.MARIO.anims.play("mario-idle", true)}

   //I split the key up cause we can press down the key up and other key at same time
   if(this.keys.up.isDown && player.MARIO.body.touching.down){
        player.MARIO.anims.play("mario-jump", true)
        player.MARIO.setVelocityY(-400)
   }

   if(player.MARIO.y >= config.height){
        sounds.mainTheme.stop()
        player.MARIO.isDead = true
        player.MARIO.anims.play("mario-dead", true)
        player.MARIO.setCollideWorldBounds(false)
        sounds.gameover.play()

        setTimeout(() => {
            player.MARIO.setVelocityY(-400)
        }, 100)

        setTimeout(() => {
            sounds.gameover.stop()
            this.scene.restart()
        }, 2500)
        
   }
}
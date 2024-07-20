export const goomba = (game) => {
    return game.physics.add.sprite(200, 200, "goomba")
        .setOrigin(0, 1)
        .setDepth(10)
        .setCollideWorldBounds(true)
}
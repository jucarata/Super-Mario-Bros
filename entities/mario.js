export const mario = (game) => {
    return game.physics.add.sprite(50, 100, "mario")
    .setOrigin(0, 1)
    .setDepth(10)
    .setCollideWorldBounds(true)
}
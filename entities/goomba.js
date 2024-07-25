import { createGoombaAnimations } from "../animations/goomba-animations.js"

const GOOMBA = (game, entity, x, y) => {
    const goomba = entity.create(x, y, "goomba")
        .setOrigin(0, 1)
        .setDepth(10)
        .setCollideWorldBounds(true);

    goomba.setCollideWorldBounds(false); // Ajusta esto según sea necesario
    createGoombaAnimations(game);

    return goomba;
}

export default GOOMBA
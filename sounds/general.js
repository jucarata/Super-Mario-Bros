let SOUNDS = {}

const createSounds = (game) => {
    const maintheme = game.sound.add("main-theme")
    const gameover = game.sound.add("gameover")
    return SOUNDS = {
        MAINTHEME: maintheme,
        GAMEOVER: gameover
    }
}

export {createSounds}
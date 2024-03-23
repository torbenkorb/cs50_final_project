import { trackKeys } from "./utils.js";
const arrowKeys = trackKeys(['ArrowUp', 'ArrowDown', 'w', 's']);

/**
 * status: playing|paused|player1goal|player2goal
 */
class State {
    constructor(sprites, status) {
        this.sprites = sprites;
        this.status = status;
        this.strokes = 0;
    }

    static start(sprites) {
        return new State(sprites, 'playing');
    }

    update(display) {
        this.sprites = this.sprites.map(sprite => {
            return sprite.update(display, this, arrowKeys);
        });

        if (this.status === 'player2goal') {
            this.sprites[1].score++;
        } else if (this.status === 'player1goal') {
            this.sprites[0].score++;
        }

        return;
    }
}

export default State;

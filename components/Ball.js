import Vec from "./Vec.js";
import { overlap, randomNumber } from "./utils.js";

const sounds = {
    bounce: new Audio('assets/sfx_sounds_Blip4.wav'),
    point: new Audio('assets/sfx_sounds_interaction15.wav')
};

sounds.bounce.volume = 0.1;
sounds.point.volume = 0.2;

class Ball {
    constructor(pos, speed) {
        this.pos = pos;
        this.speed = speed;
    }

    update(display, state) {
        let position = new Vec(this.pos.x, this.pos.y);
        let speed = new Vec(this.speed.x, this.speed.y);

        if (position.y + speed.y < 0 || position.y + this.size.y + speed.y > display.canvas.height) {
            sounds.bounce.play();
            speed = new Vec(speed.x, speed.y * -1);
        } else if (position.x < 0) {
            sounds.point.play();
            position = new Vec(0, position.y);
            speed = new Vec(0, 0);
            state.sprites[1].score++;
            state.status = 'player2goal';
        } else if (position.x + this.size.x + speed.x > display.canvas.width) {
            sounds.point.play();
            position = new Vec(display.canvas.width - this.size.x, position.y);
            speed = new Vec(0, 0);
            state.sprites[0].score++;
            state.status = 'player1goal';
        }

        for (const player of state.sprites) {
            if (player !== this && overlap(this, player)) {
                sounds.bounce.play();
                state.strokes++;
                let newPosition = position;
                if (player.pos.x > display.canvas.width / 2) {
                    newPosition = new Vec(player.pos.x - this.size.x, position.y);
                } else {
                    newPosition = new Vec(player.pos.x + player.size.x, position.y);
                }

                position = newPosition;
                let newSpeed = state.strokes % 5 === 0 ? -1.1 : -1;
                speed = new Vec(speed.x * newSpeed, randomNumber());
            }
        }

        position = position.plus(speed);
        return new Ball(position, speed);
    }
}

Ball.prototype.size = new Vec(40, 40);

export default Ball;

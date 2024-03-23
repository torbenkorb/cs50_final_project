import Vec from "./Vec.js";

const playerSpeed = 20;

class Player {
    constructor(pos, speed = new Vec(0, 0), score = 0, controls = { up: 'ArrowUp', down: 'ArrowDown' }) {
        this.pos = pos;
        this.speed = speed;
        this.controls = controls;
        this.score = score;
    }

    update(display, state, keys) {
        let position = new Vec(this.pos.x, this.pos.y);
        let speed = new Vec(this.speed.x, this.speed.y);

        if (keys[this.controls.down]) speed.y = playerSpeed;
        else if (keys[this.controls.up]) speed.y = -playerSpeed;
        else speed.y = 0;

        if (position.y + speed.y < 0) {
            position.y = 0;
            speed.y = 0;
        } else if (position.y + this.size.y + speed.y > display.canvas.height) {
            position.y = display.canvas.height - this.size.y;
            speed.y = 0;
        }

        position.y += speed.y;
        return new Player(position, speed, this.score, this.controls);
    }
}

Player.prototype.size = new Vec(60, 220);


export default Player;

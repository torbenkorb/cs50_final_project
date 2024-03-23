import Player from "./Player.js";

let background = new Image();
background.src = 'assets/background.jpg';
let paddle = new Image();
paddle.src = 'assets/paddle.png';
let ball = new Image();
ball.src = 'assets/ball.png';


class Display {
    constructor(parent) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.ctx = this.canvas.getContext('2d');
        parent.appendChild(this.canvas);
    }

    remove() {
        this.canvas.remove();
    }

    clearDisplay() {
        this.ctx.drawImage(background, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawNet() {
        let center = this.canvas.width / 2;
        this.ctx.beginPath();
        this.ctx.lineWidth = '10';
        this.ctx.setLineDash([10, 5]);
        this.ctx.moveTo(center, -5);
        this.ctx.lineTo(center, this.canvas.height);
        this.ctx.strokeStyle = '#fff';
        this.ctx.stroke();
    }

    drawSprites(sprites) {
        for (let i = 0; i < sprites.length; i++) {
            let sprite = sprites[i];
            const { x, y } = sprite.pos;
            this.ctx.fillStyle = '#fff';

            if (sprite instanceof Player) {
                this.ctx.drawImage(paddle, sprite.pos.x, sprite.pos.y, 60, 220);
                this.drawScore(sprite, i);
            } else {
                this.ctx.drawImage(ball, sprite.pos.x, sprite.pos.y, 40, 40);
            }
        }
    }

    drawScore(player, i) {
        const center = this.canvas.width / 2;
        const textAlign = i === 0 ? 'end' : 'start';
        const scorePos = i === 0 ? center - 50 : center + 70;
        this.ctx.textAlign = textAlign;
        this.ctx.font = 'bold 96px Pixeled';
        this.ctx.fillText(player.score, scorePos, 160);
    }

    drawBegin() {
        let xCenter = this.canvas.width / 2;
        this.clearDisplay();
        this.ctx.fillStyle = '#fff';
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 192px Pixeled';
        this.ctx.fillText('PONG', xCenter, this.canvas.height / 2.5);
        this.ctx.font = 'bold 64px Pixeled';
        this.ctx.fillText('HIT SPACE TO START GAME', xCenter, (this.canvas.height / 3) * 2);
    }

    drawGameOver(restart) {
        this.ctx.textAlign = 'center';
        this.ctx.font = 'bold 96px Pixeled';
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2);

        window.setTimeout(() => {
            this.remove();
            restart();
        }, 3000);
    }

    syncState(state) {
        this.clearDisplay();
        this.drawNet();
        this.drawSprites(state.sprites);
    }
}

export default Display;

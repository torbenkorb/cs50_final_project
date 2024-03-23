import State from './components/State.js';
import Vec from './components/Vec.js';
import Display from './components/Display.js';
import Player from './components/Player.js';
import Ball from './components/Ball.js';
import { runAnimation } from './components/utils.js';

function runRound(state, display) {
    let ball = new Ball(new Vec(450, 250), new Vec(20, 2));
    state.sprites.push(ball);

    return new Promise(resolve => {
        function pauseHandler(e) {
            if (e.code === 'Escape') {
                state.status = state.status === 'playing' ? 'paused' : 'playing';
                if (state.status === 'playing') runAnimation(frame);
                e.preventDefault();
            }
        }
        window.addEventListener('keydown', pauseHandler);

        function frame(time) {
            state.update(display);
            display.syncState(state);
            if (state.status === 'paused') return false;

            if (state.status === 'player1goal' || state.status === 'player2goal') {
                window.removeEventListener('keydown', pauseHandler);
                state.sprites = state.sprites.filter(sprite => !(sprite instanceof Ball));
                state.strokes = 0;
                resolve(state);
                return false;
            }

            return true;
        }

        runAnimation(frame);
    });
}

async function runGame(display) {
    let sprites = [
        new Player(new Vec(60, 390), new Vec(0, 0), 0, { up: 'w', down: 's' }),
        new Player(new Vec(1800, 390))
    ];
    let state = State.start(sprites);

    for (let highestScore = 0; highestScore < 11;) {
        state = await runRound(state, display);
        console.log(state);
        highestScore = Math.max(state.sprites[0].score, state.sprites[1].score);
        state.status = 'playing';
    }
    display.drawGameOver(startGame);
}

function startGame() {
    let display = new Display(document.querySelector('#app'));
    display.drawBegin();
    function startHandler(e) {
        if (e.code === 'Space') {
            window.removeEventListener('keydown', startHandler);
            runGame(display);
            e.preventDefault();
        }
    }
    window.addEventListener('keydown', startHandler);
}

document.fonts.ready.then(e => {
    startGame();
});

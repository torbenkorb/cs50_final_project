/**
 * Generate a random number between 2 and -2
 */
export function randomNumber() {
    return Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1);
}

/**
 * Set up keyboard events
 * return an object on keydown
 */
export function trackKeys(keys) {
    const down = Object.create(null);
    function track(event) {
        if (keys.includes(event.key)) {
            down[event.key] = event.type === 'keydown';
            event.preventDefault();
        }
    }
    window.addEventListener('keydown', track);
    window.addEventListener('keyup', track);
    return down;
}


/**
 * Detect if two sprites have an intersection
 * returns true or false
 */
export function overlap(sprite1, sprite2) {
    return (
        sprite1.pos.x + sprite1.size.x > sprite2.pos.x &&
        sprite1.pos.x < sprite2.pos.x + sprite2.size.x &&
        sprite1.pos.y + sprite1.size.y > sprite2.pos.y &&
        sprite1.pos.y < sprite2.pos.y + sprite2.size.y
    );
}

/**
 * Handles the animation frame
 */
export function runAnimation(frameFunc) {
    let lastTime = null;
    function frame(time) {
        if (lastTime !== null) {
            let timeStep = Math.min(time - lastTime, 100) / 1000;
            if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

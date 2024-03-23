# My CS50 Final Project: A PONG Clone with OOP and Functional Flair

#### Video Demo: https://youtu.be/L_DorF4UlfM

#### Description:

For my CS50 final project, I dove into the world of game development by creating a classic - a PONG clone! This project involved a blend of Object-Oriented Programming (OOP) and functional programming techniques within a JavaScript framework.

## Getting started

To start the project run following in the root folder:

```
http-server
```

If http-server command is not available locally in your machine run following

```
npm install --global http-server
```

Press Space to start the game. It's a two player game.

Player 1 can control the paddle with the keys `w` for up and `s` for down on the keyboard.

Player 2 can control the paddle with the keys `arrowUp` and `arrowDown` on the keyboard.

Try to always pass back the ball to your opponent. When a player misses the ball the other player makes one point.

Every five strokes the ball accelerates it's velocity to increase game difficulty and fun.

When one player has 11 points the game is over.

With the `escape` key the game can be paused.

## Design choices

Here's a breakdown of the key design choices:

**Modular Structure with ES6 Modules:**

The codebase is cleanly organized using ES6 modules. This approach promotes code reusability and maintainability. Each module encapsulates functionalities like rendering, player controls, and game logic, making collaboration and future modifications easier.

The directory looks like this:

```
.
├── README.md
├── assets
│   ├── Pixeled.ttf
│   ├── background.jpg
│   ├── ball.png
│   ├── paddle.png
│   ├── sfx_sounds_Blip4.wav
│   └── sfx_sounds_interaction15.wav
├── components
│   ├── Ball.js
│   ├── Display.js
│   ├── Player.js
│   ├── State.js
│   ├── Vec.js
│   └── utils.js
├── index.html
├── index.js
└── style.css
```

**Object-Oriented Paddle and Ball:**

The core entities of the game, the paddles and the ball, the state and a vector helper are represented as objects leveraging OOP principles. These objects possess properties like position, velocity, and methods for movement and collision detection. This structure allows for better organization and control over the game's elements.

**Functional Programming for Updates and Collision Detection:**

While the game objects live in the OOP paradigm, functional programming shines in handling game updates and collision detection. Functions take the current game state as input and return if a collision is detected. This approach creates a more concise and declarative way to handle game logic.

The `runAnimation` function takes a function itself as input where one frame (step) is rendered in the canvas and the entire state updates itself.

The `overlap` function takes two sprites as input and returns true if they both intersect somehow.

The `trackKeys` function handles the setup of control keys. It takes the selected keys as input and return an object that is updated whenever a chosen key is pressed.

**Rendering on HTML5 Canvas:**

The visual aspect of the game comes to life through an HTML5 canvas element. The game loop constantly updates the positions of the ball and paddles, and these updated positions are translated into visual changes on the canvas using JavaScript drawing functions. This approach allows for dynamic and real-time visual feedback for the player.

**Keyboard Controls:**

Players control their paddles using keyboard input. Event listeners detect key presses and translate them into paddle movements, providing an intuitive way to interact with the game.

**Engaging Sound Effects:**

To enhance the gameplay experience, sound effects are implemented. These include sounds for ball collisions with the paddles and scoring events, adding an auditory layer to the game and making it more engaging.

**Overall, this project provided a valuable learning experience in combining OOP and functional programming principles to create a classic game. The modular design with ES6 modules promotes reusability and future development, while the mix of programming paradigms offered a chance to explore different approaches to game development.**

-   Images: Adobe Stock
-   Pixeled Font: dafont.com
-   Sounds: Unknown

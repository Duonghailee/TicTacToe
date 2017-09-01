var Game = {
    preload: function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './images/gameboard.png');
    },

    create: function() {
        // Add menu screen.
        // It will act as a button to start the game.

    },

    startGame: function() {
        this.state.start('Game');
    }
};
var Menu = {
    preload: function() {
        // Loading images is required so that later on we can create sprites based on the them.
        // The first argument is how our image will be refered to, 
        // the second one is the path to our file.
        game.load.image('menu', './images/background.png');
    },

    create: function() {
        // Add menu screen.
        // It will act as a button to start the game.

        // display game name
        const gameName = game.add.text(
            game.world.centerX, 200, 'Tic Tac Toe', { fill: '#ffffff' }
        )
        gameName.anchor.setTo(0.5, 0.5)

        // Click to start the game
        const startGame = game.add.text(
            game.world.centerX, 250, 'click to start', { fill: '#ffffff' }
        )
        startGame.anchor.setTo(0.5, 0.5);
        // start game on click
        game.input.onDown.add(this.startGame, this);

    },

    startGame: function() {

        this.state.start('Game');
    }
};
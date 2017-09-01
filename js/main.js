var game;

//create a new game instane width 480 and height 480
game = new Phaser.Game(480, 480, Phaser.AUTO, '#main_menu');


// First parameter is how our state will be called.
// Second parameter is an object containing the needed methods for state functionality
//game.state.add('Menu', Menu);

game.state.start('menu');
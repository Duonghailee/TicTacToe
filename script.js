// switch between main screen and one player screen or two-player screen
var p1; // player 1
var p2; // player 2


$('#option1, #option2').click(function() {
    chooseX();
});


function chooseX() {
    $('#intro').hide();
    $('#mode').show();
}


// x or o iss chosen
$('#x, #o').click(function() {
    player = $(this).attr('value');
    startGame();
});


function startGame() {

    //hide mode menu
    $('#mode').hide();
    // print board
    $('#game_board').show();
}
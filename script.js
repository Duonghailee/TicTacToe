// switch between main screen and one player screen or two-player screen
var newGame;
var p1 = 1, // player 1 
    p2 = -1; // player 2
var x = "<img src='./Images/X.png' width='130' height='100' >",
    o = "<img src='./Images/O.jpg' width='130' height='100' >",
    isP1 = true,
    isP2 = !isP1;

var isX = 1,
    isY = -1;
var Arr = Array(3).fill(0).map(() => Array(3).fill("0"));
var winner = document.getElementById("winner");

//single player 
$('#option1').click(function() {
    $('#intro').hide();
    $('#one_player_mode').show();
});

//2 players
$('#option2').click(function() {
    $('#intro').hide();
    $('#two_player_mode').show();
    // newGame = new TicTacToe();
});


//when back and reset are click, reset all things
$('#back, #reset').click(function() {
    $('#intro').show();
    $('.mode').hide();
    $('#game_board').hide();
    clearGameBoard();

});



// x or o iss chosen
$('.x, .o').click(function() {
    isX = $(this).attr('value'); //true if choose x, false if choose o
    $('#turn').html("Player 1 's turn");
    startGame();

});


function startGame() {

    //hide mode menu
    $('.mode').hide();
    // print board
    $('#game_board').show();
    //default p1 play first
    isP1 = true;
}


$('.square').click(function() {
    $(this).attr('disabled', true); //lock further click
    if (isP1) {
        $('#turn').html("Player 2 's turn");
        $(this).attr('value', 1);
        // if player 1 is currently play the game
        if (isX == 1) { // choose X
            isY = -1;
            $(this).html(x); //print X on boardgame

        } else {
            $(this).html(o);
            isY = 1;
        }
        isP1 = false;
    } else { //player 2 's turn

        $('#turn').html("Player 1 's turn");
        $(this).attr('value', -1);

        if (isY == 1) {
            $(this).html(x);
            isX = -1;
        } else {
            $(this).html(o);
            isX = 1;
        }
        isP1 = true;
    }
    var win = checkWinner(p1);
    if (win === 1) {
        winner.innerHTML = "Player 1 win";
        lockClick();

        return;
    } else if (win === -1) {
        winner.innerHTML = "Player 2 win";
        lockClick();
        return;
    } else if (win === 0) {
        winner.innerHTML = "Game tie";
    }


});


function clearGameBoard() {
    winner.innerHTML = "Game tie";
    $('.square').each(function() {
        $(this).attr('disabled', false); //unlock further click
        $(this).text("");
        $(this).attr('value', '0');
    })
}

function lockClick() {
    $('.square').each(function() {
        $(this).attr('disabled', true); //unlock further click
    });
}


function checkWinner(p1) {
    p1 = 1;

    // console.log(Arr); test Arr
    var nth = 0;
    //adding button value into array element 
    for (var i = 0; i < Arr.length; i++) {
        var entry = Arr[i];
        for (var j = 0; j < entry.length; j++) {
            var mark = $('.square').eq(nth).attr('value');
            entry[j] = parseInt(mark);
            nth++;
            //console.log("entry " + j + "-button: " + nth + "-attr: " + mark); test button in order
        }
    }

    // console.log(Arr[0][0] + Arr[0][1] + Arr[0][2]); test check row,..

    //check if P1 is winner
    if ((Arr[0][0] + Arr[0][1] + Arr[0][2] == p1 * 3) ||
        (Arr[1][0] + Arr[1][1] + Arr[1][2] == p1 * 3) ||
        (Arr[2][0] + Arr[2][1] + Arr[2][2] == p1 * 3) ||
        (Arr[0][0] + Arr[1][0] + Arr[2][0] == p1 * 3) ||
        (Arr[0][1] + Arr[1][1] + Arr[2][1] == p1 * 3) ||
        (Arr[0][2] + Arr[1][2] + Arr[2][2] == p1 * 3) ||
        (Arr[0][0] + Arr[1][1] + Arr[2][2] == p1 * 3) ||
        (Arr[2][0] + Arr[1][1] + Arr[0][2] == p1 * 3)) {

        return 1;

    } else if (
        (Arr[0][0] + Arr[0][1] + Arr[0][2] == -p1 * 3) ||
        (Arr[1][0] + Arr[1][1] + Arr[1][2] == -p1 * 3) ||
        (Arr[2][0] + Arr[2][1] + Arr[2][2] == -p1 * 3) ||
        (Arr[0][0] + Arr[1][0] + Arr[2][0] == -p1 * 3) ||
        (Arr[0][1] + Arr[1][1] + Arr[2][1] == -p1 * 3) ||
        (Arr[0][2] + Arr[1][2] + Arr[2][2] == -p1 * 3) ||
        (Arr[0][0] + Arr[1][1] + Arr[2][2] == -p1 * 3) ||
        (Arr[2][0] + Arr[1][1] + Arr[0][2] == -p1 * 3)
    ) {
        return -1;
    } else {
        return 0;
    }

}
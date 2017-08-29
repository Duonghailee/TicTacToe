// switch between main screen and one player screen or two-player screen
var newGame;
var p1;
var x = "<img src='Images/x.png' width='130' height='100' >";

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


$('#back, #reset').click(function() {
    $('#intro').show();
    $('.mode').hide();
    $('#game_board').hide();
    clearGameBoard();

});




// x or o iss chosen
$('.x, .o').click(function() {
    p1 = $(this).attr('value'); //1 if choose x, -1 if choose o
    p2 = -p1;
    startGame();
});


function startGame() {

    //hide mode menu
    $('.mode').hide();
    // print board
    $('#game_board').show();
}


$('.square').click(function() {

    $(this).html(x);


})


function clearGameBoard() {
    $('.square').each(function() {
        $(this).text("");
    })
}

/* object oriented array of tic tac toe for 2 players
var TicTacToe = new function() {
    this.X = 1;
    this.O = -1;
    this.EMPTY = 0;
    this.board = arr2D();
    this.player = this.X; //current player

    function arr2D() {
        return new Array(3).fill(new Array(3).fill(0));
    }

    this.clearBoard = clearBoard();

    function clearBoard() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.board[i][j] = this.EMPTY;
            }
        }
    }

    this.putMark = put(i, j);

    function put(i, j) {
        this.board[i, j] = player;
        player = -player;
    }

    //function check whether the board config is win for the given player
    this.isWin = function(mark) {
        return (this.board[0][0] + this.board[0][1] + this.board[0][2] == mark * 3) ||
            (this.board[1][0] + this.board[1][1] + this.board[1][2] == mark * 3) ||
            (this.board[2][0] + this.board[2][1] + this.board[2][2] == mark * 3) ||
            (this.board[0][0] + this.board[1][0] + this.board[2][0] == mark * 3) ||
            (this.board[0][1] + this.board[1][1] + this.board[2][1] == mark * 3) ||
            (this.board[0][2] + this.board[1][2] + this.board[2][2] == mark * 3) ||
            (this.board[0][0] + this.board[1][1] + this.board[2][2] == mark * 3) ||
            (this.board[2][0] + this.board[1][1] + this.board[0][2] == mark * 3);
    }

    this.winner = function() {
        if (this.isWin(this.X)) {
            return this.X;
        } else if (this.isWin(this.O)) {
            return this.O;
        } else {
            return 0; //tie;
        }
    }
} */
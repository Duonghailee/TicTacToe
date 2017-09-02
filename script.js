/* there 2 two option modes, 1 player against computure and 2 players
 */
var mode1 = false,
    mode2 = false;

/* Use 1 to indicate player 1 and -1 to indicate the other player 
 */
var p1 = 1, // player 1 
    p2 = -1; // player 2

// X or O sylmbol when user click to play
var x = "<img src='./Images/X.png' width='130' height='100' >",
    o = "<img src='./Images/O.jpg' width='130' height='100' >",

    //isP1 store status playing value, true means that player is playing
    isP1 = true,
    //when one player is playing, the other is in wait mode, or false
    isP2 = !isP1;


// If player choose X, store choice as value 1, 'O' for value 2    
var isX = 1,
    isY = -1;

/*
Create new 9-size block array and fill 9 elements with 0s, it is the back-end of game board of 9 blocks*/
var Arr = Array(3).fill(0).map(() => Array(3).fill("0"));



/*
Where to inform winning player */
var winner = document.getElementById("winner");


// X or O is chosen
$('.x, .o').click(function() {
    isX = $(this).attr('value'); //1 if choose X, -1 if choose O

    //Player 1 always start firt
    $('#turn').html("Player 1's turn");

    //calling function startGame
    startGame();

});


/*
 in single player mode, means play with computer */
$('#option1').click(function() {
    $('#intro').hide();
    $('#one_player_mode').show();
    mode1 = true;
});

/*
 in double player mode, 2 players */
$('#option2').click(function() {
    $('#intro').hide();
    $('#two_player_mode').show();
    mode2 = true;
});


/*
when back and reset are click, reset all things */
$('#back, #reset').click(function() {
    $('#intro').show();
    $('.mode').hide();
    $('#game_board').hide();
    clearGameBoard();
    mode1 = false;
    mode2 = false;
    isP1 = true;
    isP2 = false;
});


function startGame() {

    //hide mode menu
    $('.mode').hide();
    // print board
    $('#game_board').show();
    //default p1 play first
    isP1 = true;
}

/* clicking start here
 */

/* 2 players mode */


$('button').click(function play() {
    if (mode2) {
        $(this).prop('disabled', true); //lock further click, once one block is chosen, no any changeable
        if (isP1) { //If player 1 is currently playing
            $('#turn').html("Player 2 's turn"); // inform next turn is player 2
            $(this).attr('value', 1); // add value 1 to the button
            if (isX == 1) { // if player 1 chooses X
                isY = -1; //player 2 has to choose Y
                $(this).html(x); //print X on boardgame for player 1

            } else {
                $(this).html(o); // else print O
                isY = 1; //player 2 print X in contrast
            }
            isP1 = false; // Player 1 finished its turn
        } else { //Let's move to player 2 's turn

            $('#turn').html("Player 1 's turn"); // inform next turn is player 1
            $(this).attr('value', -1); // add value -1 to the button

            if (isY == 1) { // if player 2 has to choose X because player 1 chosed O
                $(this).html(x); //print X
                isX = -1; //player 1 choosed O
            } else {
                $(this).html(o);
                isX = 1; //player 1 choosed X
            }
            isP1 = true; //player 1's turn
        }


        /*
        always checking whether the game has stop due to tie, or winner is found.*/
        var win = checkWinner(p1);
        if (win === 1) {
            winner.innerHTML = "Player 1 win";
            lockClick(); //lock further clickable button

            return;
        } else if (win === -1) {
            winner.innerHTML = "Player 2 win";
            lockClick();
            return;
        } else if (win === 0) {
            winner.innerHTML = "Game tie";
        }
    } else { //mode 1
        $(this).prop('disabled', true); //lock further click, once one block is chosen, no any changeable
        var id = parseInt($(this).attr('id').substring(3));
        console.log(id); //test the position player 1 clicked
        if (isP1) { //If player 1 is currently playing

            $('#turn').html("Computer's turn"); // inform next turn is player 2
            window.setTimeout(10);
            $(this).attr('value', 1); // add value 1 to the button
            if (isX == 1) { // if player 1 chooses X
                isY = -1; //computer has to choose Y
                $(this).html(x); //print X on boardgame for player 1

            } else {
                $(this).html(o); // else print O
                isY = 1; //computer print X in contrast
            }
            // isP1 = false; // Player 1 finished its turn
        }


        //now Computer turn
        var pos = 1; //assign default for computer to start from block 1

        //If the next pos is similar to block that player 1 has played, then randomly generate another number
        while ($('#btn' + pos).prop('disabled') == true) {
            pos = Math.floor(Math.random() * 9) + 1;
            console.log("after random: " + pos);
        }

        var putPos = '#btn' + pos;
        console.log(putPos); //test the next put mark


        //computer making random move
        $('#turn').html("Player 1 's turn"); // inform next turn is player 1
        $(putPos).attr('value', -1); // add value -1 to the button
        $(putPos).prop('disabled', true); //lock further click
        if (isY == 1) { // if computer has to choose X because player 1 chosed O
            $(putPos).html(x); //print X
            isX = -1; //player 1 choosed O
        } else {
            $(putPos).html(o);
            isX = 1; //player 1 choosed X
        }
        //  isP1 = true; //player 1's turn

        /*
        always checking whether the game has stop due to tie, or winner is found.*/
        var win = checkWinner(p1);
        if (win === 1) {
            winner.innerHTML = "Player 1 win";
            lockClick(); //lock further clickable button

            return;
        } else if (win === -1) {
            winner.innerHTML = "Computer win";
            lockClick();
            return;
        } else if (win === 0) {
            winner.innerHTML = "Game tie";
        }

    }

});




/* func clear the game board 
 */
function clearGameBoard() {
    winner.innerHTML = "Game tie";
    $('.square').each(function() {
        $(this).attr('disabled', false); //unlock further click
        $(this).text(""); // clear X/O symbol
        $(this).attr('value', '0'); //Reset the value of each block to 0
    })
}

/* func lock the button from click event 
 */
function lockClick() {
    $('.square').each(function() {
        $(this).prop('disabled', true); //unlock further click
    });
}

/*
functon to check winner */
function checkWinner(p1) {
    p1 = 1; //Player 1 always is 1

    // console.log(Arr); test Arr
    var nth = 0;
    //adding button value into each array element 
    for (var i = 0; i < Arr.length; i++) {
        var entry = Arr[i];
        for (var j = 0; j < entry.length; j++) {
            var mark = $('.square').eq(nth).attr('value');
            entry[j] = parseInt(mark); //parse only interger format
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

    } else if ( //p2 win ?
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
        return 0; //or tie game
    }

}
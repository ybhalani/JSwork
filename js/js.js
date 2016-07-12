
var board = {
    A: null,
    B: null,
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
    H: null,
    I: null
};

gameOn = true;
player1Move = true;

var drawBoard = function(){
    console.log("   A " + (board.A || '') + "| B " + (board.B || '') + "| C " + (board.C || ''));
    console.log("  ------------- ");
    console.log("   D " + (board.D || '') + "| E " + (board.E || '') + "| F " + (board.F || ''));
    console.log("  ------------- ");
    console.log("   G " + (board.G || '') + "| H " + (board.H || '') + "| I " + (board.I || ''));
    console.log("  ------------- ");
};

var solutions = function() {
    return (board.A && (board.A == board.B && board.A == board.C))
        || (board.D && (board.D == board.E && board.D == board.F))
        || (board.G && (board.G == board.H && board.G == board.I));
};

drawBoard();
var currentPlayer;

while (gameOn === true){
 for (var i = 0 ; i < 9; i++){
        if (solutions()){
            console.log(currentPlayer + " wins!");
            gameOn = false;
            break;
        }

        currentPlayer = 'Player 1';
        if(!player1Move)
            currentPlayer = 'Player 2';

        var ask = prompt(currentPlayer + ': where would you like to go (A or B or C or ..)?');
        if(ask == 'exit') {
            gameOn = false;
            break;
        }

        if (player1Move === true) {
            board[ask] = '+';
            drawBoard();
            player1Move = false;
        } else if (player1Move === false){
            board[ask] = 'o';
            drawBoard();
            player1Move = true;
        }
    }
}



function solution(A, D) {
    // write your code in JavaScript (Node.js 4.0.0)
    var jumps = Array(D);
    var numberOfJumps = 0;

    var second = 0;
    while (!enoughSpace() && !outOfJump()) {
        var jumpThisSecond = A[second];
        if (!jumps[jumpThisSecond]) {
            jumps[jumpThisSecond] = true;
            numberOfJumps++;
        }

        second++;
    }
    return enoughSpace() ? second-1 : -1;

    function enoughSpace() {
        return numberOfJumps >= D;
    }
    function outOfJump() {
        return second >= A.length;
    }
}
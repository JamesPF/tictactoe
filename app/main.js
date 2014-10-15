var myTicTacToe = angular.module('myTicTacToe', []);

myTicTacToe.controller('GameController', function ($scope) {

    $scope.gameBoard = [
        {status: "", name: "c0", position:[0]},
        {status: "", name: "c1", position:[1]},
        {status: "", name: "c2", position:[2]},

        {status: "", name: "c3", position:[3]},
        {status: "", name: "c4", position:[4]},
        {status: "", name: "c5", position:[5]},

        {status: "", name: "c6", position:[6]},
        {status: "", name: "c7", position:[7]},
        {status: "", name: "c8", position:[8]},
    ];

    $scope.movecounter = 0;
    gameover = false;

    $scope.playerPicks = function(cell) {
    $scope.movecounter = $scope.movecounter + 1 ;
        console.log("Cell was: " + cell.status) ;
        if (($scope.movecounter % 2) == 1) {
            cell.status = "X" ; 
        } else {
            cell.status = "O" ;
        } 
        console.log("Cell is now: " + cell.status) ;
        // if (gameover == false) evaluateWin();
    

    


    var evaluateWin = function() {
        if ($scope.gameBoard[0] == "X" && $scope.gameBoard[1] == "X" && $scope.gameBoard[2] == "X") {
            console.log("x");
        } else if ($scope.gameBoard[3] == "X" && $scope.gameBoard[4] == "X" && $scope.gameBoard[5] == "X") {
            Xwin();
        } else if ($scope.gameBoard[6] == "X" && $scope.gameBoard[7] == "X" && $scope.gameBoard[8] == "X") {
            Xwin();
        } else if ($scope.gameBoard[0] == "X" && $scope.gameBoard[3] == "X" && $scope.gameBoard[6] == "X") {
            Xwin();
        } else if ($scope.gameBoard[1] == "X" && $scope.gameBoard[4] == "X" && $scope.gameBoard[7] == "X") {
            Xwin();
        } else if ($scope.gameBoard[2] == "X" && $scope.gameBoard[5] == "X" && $scope.gameBoard[8] == "X") {
            Xwin();
        } else if ($scope.gameBoard[0] == "X" && $scope.gameBoard[4] == "X" && $scope.gameBoard[8] == "X") {
            Xwin();
        } else if ($scope.gameBoard[2] == "X" && $scope.gameBoard[4] == "X" && $scope.gameBoard[6] == "X") {
            Xwin();
        } else if ($scope.gameBoard[0] == "O" && $scope.gameBoard[1] == "O" && $scope.gameBoard[2] == "O") {
            owin();
        } else if ($scope.gameBoard[3] == "O" && $scope.gameBoard[4] == "O" && $scope.gameBoard[5] == "O") {
            owin();
        } else if ($scope.gameBoard[6] == "O" && $scope.gameBoard[7] == "O" && $scope.gameBoard[8] == "O") {
            owin();
        } else if ($scope.gameBoard[0] == "O" && $scope.gameBoard[3] == "O" && $scope.gameBoard[6] == "O") {
            owin();
        } else if ($scope.gameBoard[1] == "O" && $scope.gameBoard[4] == "O" && $scope.gameBoard[7] == "O") {
            owin();
        } else if ($scope.gameBoard[2] == "O" && $scope.gameBoard[5] == "O" && $scope.gameBoard[8] == "O") {
            owin();
        } else if ($scope.gameBoard[0] == "O" && $scope.gameBoard[4] == "O" && $scope.gameBoard[8] == "O") {
            owin();
        } else if ($scope.gameBoard[2] == "O" && $scope.gameBoard[4] == "O" && $scope.gameBoard[6] == "O") {
            owin();
        } else if (movecounter == 9) {
    //         var messageboX = document.getElementById('message');
    //         $scope.leftMessage = "draw...";
    //         $scope.rightMessage = "draw...";
               console.log("The game is a tie");
        } else {
            movecounter += 1;
        }
    }
    };
    


});
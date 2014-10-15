var myTicTacToe = angular.module('myTicTacToe', []);

myTicTacToe.controller('GameController', function ($scope) {

    $scope.gameBoard = [
        {name: "c0"},
        {name: "c1"},
        {name: "c2"},

        {name: "c3"},
        {name: "c4"},
        {name: "c5"},

        {name: "c6"},
        {name: "c7"},
        {name: "c8"},
    ];



    // $scope.playerPicks = function(thisCell) {
    // $scope.movecounter = $scope.movecounter + 1 ;
    //     console.log("Cell was: " + thisCell.name) ;
    //     if (($scope.movecounter % 2) == 1) {
    //         thisCell.name = "X" ;  
    //     } else {
    //         thisCell.name = "O" ;
    //     } 
    //     console.log("Cell is now: " + thisCell.name) ;
    // } ;
});
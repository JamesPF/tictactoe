var myTicTacToe = angular.module('myTicTacToe', ["firebase"]);

myTicTacToe.controller('GameController', function ($scope,$firebase) {

    $scope.remoteGameContainer = 
      $firebase(new Firebase("https://mario-kong.firebaseIO.com/databaseGameContainer")) ;

    $scope.moveCounter = 0 ;

    $scope.gameBoard = [
        {status: "A", position: 0},
        {status: "B", position: 1},
        {status: "C", position: 2},

        {status: "D", position: 3},
        {status: "E", position: 4},
        {status: "F", position: 5},

        {status: "G", position: 6},
        {status: "H", position: 7},
        {status: "I", position: 8}
    ];

    // This container object is what gets synced:
  $scope.gameContainer = {
    gameBoardArray: $scope.gameBoard,
    clickCounter: $scope.moveCounter
  } ;

  // Everywhere else in your program, use $scope.gameContainer.cellListArray instead of cellList.
  // Everywhere else in your program, use $scope.gameContainer.clickCounter instead of clickCount.
  // Make that change in your ng-repeat as well and anywhere in your index.html as needed.


  // remoteGameContainer: that is the name you gave the Firebase node (looks like a folder in Firebase).
  // The bind statement creates a connection between anything in your app and the Firebase connection we just created.
   
  $scope.remoteGameContainer.$bind($scope, "gameContainer") ;

 // The bind statement will automatically update your model, in this case cellList, whenever it 
  // changes on Firebase.  But this will not trigger an Angular update of the interface (index.html)
  // - we've been relying on the ng-click to wake up Angular and get the gameboard refreshed.
  // So we put a watch on cellList - this tells Angular to refresh the interface elements, ie ng-class,
  // whenever the model, in this case celList, changes.
  

  $scope.$watch('gameContainer', function() {
    console.log('gameContainer changed!') ;
  }) ;

    // gameover = false;

    $scope.playerPicks = function(cellObject) {
    $scope.moveCounter = $scope.moveCounter + 1 ;
        console.log("Cell was: " + cellObject.status) ;
        if (($scope.moveCounter % 2) == 1) {
            cellObject.status = "X" ; 
        } else {
            cellObject.status = "O" ;
        } 
        console.log("Cell is now: " + cellObject.status) ;


           // The four lines below are a test to make sure that the win logic is registering properly.
//         console.log("1st cell status-"+$scope.gameContainer.gameBoardArray[0].status);
//         console.log("2st cell status-"+$scope.gameContainer.gameBoardArray[1].status);
//         console.log("3st cell status-"+$scope.gameContainer.gameBoardArray[2].status);
// console.log("1st cond"+($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[1].status) && ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[2].status));

    if (($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[1].status) && ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[2].status) ||
    ($scope.gameContainer.gameBoardArray[3].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[5].status) ||
    ($scope.gameContainer.gameBoardArray[6].status == $scope.gameContainer.gameBoardArray[7].status) && ($scope.gameContainer.gameBoardArray[7].status == $scope.gameContainer.gameBoardArray[8].status) ||
    ($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[3].status) && ($scope.gameContainer.gameBoardArray[3].status == $scope.gameContainer.gameBoardArray[6].status) ||
    ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[7].status) ||
    ($scope.gameContainer.gameBoardArray[2].status == $scope.gameContainer.gameBoardArray[5].status) && ($scope.gameContainer.gameBoardArray[5].status == $scope.gameContainer.gameBoardArray[8].status) ||
    ($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[8].status) ||
    ($scope.gameContainer.gameBoardArray[2].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[6].status)) 
    {
    console.log("X wins!");
} else if ( $scope.moveCounter == 9) {
    console.log("Tie game!");
} else {
   "" ;
}


    
    };
    


});
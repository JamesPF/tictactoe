var myTicTacToe = angular.module('myTicTacToe', ["firebase"]);

myTicTacToe.controller('GameController', function ($scope,$firebase) {

    $scope.remoteGameContainer = 
      $firebase(new Firebase("https://mario-kong.firebaseIO.com/databaseGameContainer")) ;

    $scope.moveCounter = 0 ;
    $scope.gameOver = false;
    $scope.xWins = false;
    $scope.oWins = false;
    $scope.gameOutcome = "";
    $scope.marioScore = 0;
    $scope.kongScore = 0;

    $scope.gameBoard = [
        {status: "Empty", position: 0},
        {status: "Empty", position: 1},
        {status: "Empty", position: 2},

        {status: "Empty", position: 3},
        {status: "Empty", position: 4},
        {status: "Empty", position: 5},

        {status: "Empty", position: 6},
        {status: "Empty", position: 7},
        {status: "Empty", position: 8}
    ];

    // This container object is what gets synced:
  $scope.gameContainer = {
    gameBoardArray: $scope.gameBoard,
    clickCounter: $scope.moveCounter,
    fbgameOver: $scope.gameOver,
    fbgameOutcome: $scope.gameOutcome,
    fbmarioScore: $scope.marioScore,
    fbkongScore: $scope.kongScore 
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


    //         The four lines below are a test to make sure that the win logic is registering properly.
//         console.log("1st cell status-"+$scope.gameContainer.gameBoardArray[0].status);
//         console.log("2st cell status-"+$scope.gameContainer.gameBoardArray[1].status);
//         console.log("3st cell status-"+$scope.gameContainer.gameBoardArray[2].status);
// console.log("1st cond"+($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[1].status) && ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[2].status));
    var winLogic = function(tile) {
      if ($scope.gameContainer.gameBoardArray[0].status == tile && ($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[1].status) && ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[2].status) ||
          $scope.gameContainer.gameBoardArray[3].status == tile && ($scope.gameContainer.gameBoardArray[3].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[5].status) ||
          $scope.gameContainer.gameBoardArray[6].status == tile && ($scope.gameContainer.gameBoardArray[6].status == $scope.gameContainer.gameBoardArray[7].status) && ($scope.gameContainer.gameBoardArray[7].status == $scope.gameContainer.gameBoardArray[8].status) ||
          $scope.gameContainer.gameBoardArray[0].status == tile && ($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[3].status) && ($scope.gameContainer.gameBoardArray[3].status == $scope.gameContainer.gameBoardArray[6].status) ||
          $scope.gameContainer.gameBoardArray[1].status == tile && ($scope.gameContainer.gameBoardArray[1].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[7].status) ||
          $scope.gameContainer.gameBoardArray[2].status == tile && ($scope.gameContainer.gameBoardArray[2].status == $scope.gameContainer.gameBoardArray[5].status) && ($scope.gameContainer.gameBoardArray[5].status == $scope.gameContainer.gameBoardArray[8].status) ||
          $scope.gameContainer.gameBoardArray[0].status == tile && ($scope.gameContainer.gameBoardArray[0].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[8].status) ||
          $scope.gameContainer.gameBoardArray[2].status == tile && ($scope.gameContainer.gameBoardArray[2].status == $scope.gameContainer.gameBoardArray[4].status) && ($scope.gameContainer.gameBoardArray[4].status == $scope.gameContainer.gameBoardArray[6].status)) 
     {
        if (tile == "X") {
          xWins = true;
          $scope.gameContainer.fbgameOver = true;
          console.log("x wins");
          $scope.gameContainer.fbgameOutcome = "Mario Wins!";
          $scope.gameContainer.fbmarioScore++;
        } else {
          oWins = true;
          $scope.gameContainer.fbgameOver = true;
          console.log("O wins");
          $scope.gameContainer.fbgameOutcome = "Donkey Kong Wins!";
          $scope.gameContainer.fbkongScore++;
        } 
      }
    else if ( $scope.gameContainer.clickCounter == 9) {
      $scope.gameContainer.fbgameOver == true;
      console.log("Tie game!");
      $scope.gameContainer.fbgameOutcome = "Tie Game!";
    }
    };

    $scope.playerPicks = function(cellObject) {
        console.log("Cell was: " + cellObject.status) ;
        console.log($scope.gameContainer.fbgameOver+" Game Over before");
        console.log(cellObject.status == "Empty" && !$scope.gameContainer.fbgameOver);
        if (cellObject.status == "Empty" && !$scope.gameContainer.fbgameOver) {
          if (($scope.gameContainer.clickCounter % 2) == 0) {
            cellObject.status = "X" ;
            $scope.gameContainer.clickCounter++ ;
            console.log("Cell is now: " + cellObject.status);
          }
          else {
            cellObject.status = "O" ;
            $scope.gameContainer.clickCounter++ ;
            console.log("Cell is now: " + cellObject.status) ;
          } 
          winLogic(cellObject.status);
        } 
    console.log("Cell is now: " + cellObject.status) ;
    console.log($scope.gameContainer.fbgameOver+" Game Over after");
    
    };

    $scope.resetGame = function() {
      console.log("resetGame works!");
      $scope.gameContainer.clickCounter = 0 ;
      $scope.gameContainer.gameBoardArray[0].status = "Empty";
      $scope.gameContainer.gameBoardArray[1].status = "Empty";
      $scope.gameContainer.gameBoardArray[2].status = "Empty";
      $scope.gameContainer.gameBoardArray[3].status = "Empty";
      $scope.gameContainer.gameBoardArray[4].status = "Empty";
      $scope.gameContainer.gameBoardArray[5].status = "Empty";
      $scope.gameContainer.gameBoardArray[6].status = "Empty";
      $scope.gameContainer.gameBoardArray[7].status = "Empty";
      $scope.gameContainer.gameBoardArray[8].status = "Empty";
      $scope.gameContainer.fbgameOutcome = "";
      $scope.xWins = false;
      $scope.oWins = false;
      $scope.gameContainer.fbgameOver = false;
    };

});
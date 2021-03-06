var userScores = {
    playerOne: 0,
    playerTwo:0,
}

var turnScores  = {
    currentTotal: 0,
    currentRoll: 0,
    playerTurn: true,
}

function turnSwitch() {
  
  if(turnScores.playerTurn == true){
      $("#p2roll").show();
      $("#p1roll").hide();
  } else {
      $("#p1roll").show();
      $("#p2roll").hide();
  }
}


function resetGame() {
    turnScores.currentTotal = 0;
    turnScores.currentRoll = 0;
    userScores.playerTwo = 0;
    userScores.playerOne = 0;
}
   

function diceRoll() {
  const min = 1;
  const max = 7;
  const roll= Math.floor(Math.random()*(max - min) + min)


  $("img").hide();
  switch (roll){
      case 1: {$("#diceOne").show()}
      break;
      case 2: {$("#diceTwo").show()}
      break;
      case 3: {$("#diceThree").show()}
      break;
      case 4: {$("#diceFour").show()}
      break;
      case 5: {$("#diceFive").show()}
      break;
      case 6: {$("#diceSix").show()}
      break;            
  }
    return roll;
}


function aiDiceRoll() {
  const min = 1;
  const max = 7;
  const roll= Math.floor(Math.random()*(max - min) + min)
  }

function addRoll() {
  turnScores.currentRoll = diceRoll();
  if(turnScores.currentRoll != 1){
      return turnScores.currentTotal += turnScores.currentRoll
  } else {
    $("#rollCount").hide();
      turnSwitch();   
      turn(); 
      return turnScores.currentTotal = 0;
  }

}

function addTurnTotal(){
  console.log("addTurnTotal" + turnScores.playerTurn);
  if(turnScores.playerTurn == true){
    userScores.playerOne += turnScores.currentTotal;
    turnScores.currentTotal = 0;
    if(userScores.playerOne>= 100){
      $("#winner").text("Player One Wins!!");
      userScores.playerOne = 100;
    }
  }
  else {
    userScores.playerTwo += turnScores.currentTotal;
    turnScores.currentTotal = 0;
    if(userScores.playerTwo >= 100){
        $("#winner").text("Player Two Wins!!");
        userScores.playerTwo = 100;
    }
  }
  turnSwitch();
  turn();

}


function aiTurn(){  
  addRoll();
  if (turnScores.playerTurn === false){
    addTurnTotal();
  } else turn();
}

function turn(){
  turnScores.playerTurn = !turnScores.playerTurn;  
  // console.log(turnScores.playerTurn);
  
  return turnScores.playerTurn
  }

  
$(document).ready(function(){    
  $("#new").click(function(event){
      event.preventDefault();
      resetGame();
      $("#p1score").text("Player One Score:" + userScores.playerOne);
      $("#p2score").text("Player Two Score:" + userScores.playerTwo);
      $("#roll").show();
      $("#hold").show();
      $("#new").hide();  
      $("#hard-btn").hide();
      $("#pig").show();
  })

  $("#roll").click(function(event){
      event.preventDefault();     
      addRoll();
      $("#rollCount").show();
      $("#pig").show();
      $("#p1score").text("Player One Score:" + userScores.playerOne);
      $("#rollCount").text("Roll:" + turnScores.currentRoll)
      $("#p2score").text("Player Two Score:" + userScores.playerTwo); 
      console.log(turnScores.playerTurn)
  })

  $("#hold").click(function(event){
      event.preventDefault();
      addTurnTotal()
      $("#p1score").text("Player One Score:" + userScores.playerOne);
      $("#p2score").text("Player Two Score:" + userScores.playerTwo);
      $("#rollCount").hide();
      $("#pig").show();
      console.log(turnScores.playerTurn)
    })    

    $("#hard-btn").click(function(event){
      event.preventDefault();
      $("#aiRoll").show();
      $("#aiHold").show();
      $("#new").hide();
      $("#hard-btn").hide();
      $("#pig").show();
    })
    
    $("#aiRoll").click(function(event){
      event.preventDefault();
      addRoll();
      if(turnScores.playerTurn === false){aiTurn()}
      $("#rollCount").show();
      $("#pig").show();
      $("#p1score").text("Player One Score:" + userScores.playerOne);
      $("#rollCount").text("Roll:" + turnScores.currentRoll)
      $("#p2score").text("Player Two Score:" + userScores.playerTwo);
    })
    
    $("#aiHold").click(function(event){

      event.preventDefault();      
      addTurnTotal();
      aiTurn();
      $("#pig").show();
      $("#p1score").text("Player One Score:" + userScores.playerOne);
      $("#p2score").text("Player Two Score:" + userScores.playerTwo);
    })
})
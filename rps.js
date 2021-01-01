let playerScore = 0;
let computerScore = 0;

const result = document.querySelector('#result');
const resultText = document.querySelector('#resultText');

const playerScoreText = document.createElement('h3');
playerScoreText.classList.add('score');
playerScoreText.textContent = "You: " + playerScore;

const computerScoreText = document.createElement('h3');
computerScoreText.classList.add('score');
computerScoreText.textContent = "Computer: " + computerScore;

result.appendChild(playerScoreText);
result.appendChild(computerScoreText);

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    let playerSelection = button.getAttribute('id');
    resultText.textContent = playRound(playerSelection, computerPlay());
    checkRound();
  });
});

function computerPlay(){
  let array = ["Rock","Paper","Scissors"];
  let randomItem = array[Math.floor(Math.random()*array.length)];
  return randomItem;
}

function updateScore(score){
  if(score===playerScore){
    playerScoreText.textContent = "You: " + playerScore;
  }

  if (score===computerScore) {
    computerScoreText.textContent = "Computer: " + computerScore;
  }
}

function playRound(playerSelection, computerSelection){
  let outcome = 0;
  if (playerSelection==="Rock"){
    if(computerSelection==="Rock") outcome=0;
    if(computerSelection==="Paper") outcome=2;
    if(computerSelection==="Scissors") outcome=1;
  }

  if (playerSelection==="Scissors"){
    if(computerSelection==="Rock") outcome=2;
    if(computerSelection==="Scissors") outcome=0;
    if(computerSelection==="Paper") outcome=1;
  }

  if(playerSelection==="Paper"){
    if(computerSelection==="Rock") outcome=1;
    if(computerSelection==="Paper") outcome=0;
    if(computerSelection==="Scissors") outcome=2;
  }

  if(outcome==0){
    return "It's a tie! Both " + playerSelection;
  }

  else if(outcome==1){
    playerScore++;
    updateScore(playerScore);
    return "You win! " + playerSelection + " beats " + computerSelection;

  }

  else if(outcome==2){
    computerScore++;
    updateScore(computerScore);
    return "You lose. " + playerSelection + " loses to " + computerSelection;
  }

}

function checkRound(){
  if(playerScore==5 || computerScore==5){
    if(playerScore==5) resultText.textContent = "You've won!";
    else resultText.textContent = "You've lost :(";
    createResetButton();
    buttons.forEach((button) => {
      button.disabled = true;
    });

  }
}

function reset(){
  playerScore = 0;
  computerScore = 0;
  updateScore(playerScore);
  updateScore(computerScore);
  resultText.textContent = "Make a choice to start the game!";
  buttons.forEach((button) => {
    button.disabled = false;
  });
}

function createResetButton(){
  const resetButton = document.createElement('button');
  resetButton.setAttribute('id', 'resetButton');
  resetButton.textContent = "Reset";
  resetButton.addEventListener('click', ()=>{
    reset();
    result.removeChild(resetButton);
  });
  result.appendChild(resetButton);
}

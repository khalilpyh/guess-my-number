/*
Name: Khalil Peng
Title: Guess My Number Game
Date: 2022-08-11
*/

'use strict';

/***********************************************************
 * ********************** Functions ************************
 * *********************************************************/
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayWinningNum = function (number) {
  document.querySelector('.number').textContent = number;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const changeBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const changeNumWidth = function (width) {
  document.querySelector('.number').style.width = width;
};

const getSecretNum = function () {
  //return random generated number between 1-20
  return Math.trunc(Math.random() * 20) + 1;
};

/***********************************************************
 * ****************** Global Variables *********************
 * *********************************************************/
//declare the secret number(random generated)
let secretNumber = getSecretNum();
//declare and set the score(20 points as default)
let score = 20;
//declare a variable for storing high score
let highScore = 0;
//declare the click button
const clickButton = document.querySelector('.check');
//declare the input field
const guessInput = document.querySelector('.guess');

/***********************************************************
 * ***************'check' button click event****************
 * *********************************************************/
document.querySelector('.check').addEventListener('click', function () {
  //get user input and convert to number
  const guess = +guessInput.value;

  //validate user input and check winning condition
  //when there is no input
  if (!guess) {
    displayMessage('⛔ No Number!');
  } //when player wins
  else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    displayWinningNum(secretNumber);
    changeBackgroundColor('#60b347');
    changeNumWidth('30rem');
    clickButton.disabled = true;
    guessInput.disabled = true;

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } //when guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '☝ Too high!' : '👇 Too low!');
      //loose point when guessing wrong
      score--;
      displayScore(score);
    } else {
      displayMessage('😢 You lost the game!');
      displayScore(0);
      changeBackgroundColor('#B22222');
      clickButton.disabled = true;
      guessInput.disabled = true;
    }
  }
});

/***********************************************************
 * ***************'again' button click event****************
 * *********************************************************/
document.querySelector('.again').addEventListener('click', function () {
  //restore score and reset secret number
  score = 20;
  secretNumber = getSecretNum();
  //restore display contents
  displayMessage('Start guessing...');
  displayScore(score);
  displayWinningNum('?');
  document.querySelector('.guess').value = '';
  //restore background color
  changeBackgroundColor('#222');
  //restore number width
  changeNumWidth('15rem');
  //enable controls
  clickButton.disabled = false;
  guessInput.disabled = false;
});

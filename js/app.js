// A list that holds html card elements
let allCards = document.querySelectorAll('.card');

const deck = document.querySelector('.deck');

let openCards = [];
let matchedCards = [];

// congratulation popup modal with comment and star rating
let modal = document.querySelector('#modal');
let finishComment = document.querySelector('#finish-comment');
let starRatings = document.querySelectorAll('.stars');

// press x to hide the popup modal
let close = document.querySelector('.close');
close.onclick = function() {
  modal.style.display = "none";
}

// A list that holds card shapes
let allShapes = ['cube', 'cube',
              'anchor', 'anchor',
              'leaf', 'leaf',
              'bicycle', 'bicycle',
              'diamond', 'diamond',
              'bomb', 'bomb',
              'bolt', 'bolt',
              'paper-plane-o', 'paper-plane-o'];



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// variables and elements to be used by the timer function
let timer = document.querySelector('.timer');
let timeTaken = document.querySelector('.time-taken');
let intervalID;
let secs = 0;
let mins = 0;

// timer function to display the time
function displayTimer() {
  intervalID = setInterval(() => {
    if (secs < 59)
      secs++;
    else {
      secs = 0;
      mins++;
    }
    timer.textContent = `  ${mins}:${secs}`;
    timeTaken.textContent = `${mins} minutes and ${secs} seconds`;
  }, 1000)
}

function clearTimer() {
  clearInterval(intervalID);
  secs = 0;
  mins = 0;
  timer.textContent = `  0:0`;
}

// new game by shuffling the list of cards and looping through each card to create its HTML
function initGame(shapes, cards) {
  shapes = shuffle(shapes);
  allCards.forEach((htmlCard, index) => htmlCard.innerHTML = `<i class="fa fa-${shapes[index]}"></i>`);
  displayTimer();
}

// restart the game by pressing the rotating arrow or 'Restart Game' button

function restartGame() {
  clearTimer();
  modal.style.display = "none";
  matchedCards.forEach(card => card.classList.remove("match"));
  matchedCards = [];
  movesCounter = 0;
  moves.forEach(move => move.textContent = '0');
  if (openCards.length){
    openCards.forEach(card => card.classList.remove("open", "show"));
    openCards = [];
  }
  starRatings.forEach(stars => stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>')
  initGame(allShapes, allCards);
}

let restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame);

let restartButton = document.querySelector('#restart-button');
restartButton.addEventListener('click', restartGame);

// ending game with congratualion popup modal with time & no. of moves
function endGame() {
 clearTimer();
 modal.style.display = "block";
}

// check to see if the two cards match
function matching(openCards) {
  const [cardOneShape, cardTwoShape] = [openCards[0].firstElementChild.classList[1], openCards[1].firstElementChild.classList[1]];

  if (cardOneShape === cardTwoShape)
    return true;
  return false;
}

let moves = document.querySelectorAll('.moves');
let movesCounter = 0;

// begin a game
initGame(allShapes, allCards);

deck.addEventListener('click', evt => {
  const clickedCard = evt.target;

  if (clickedCard.nodeName === 'LI' &&
      openCards.length < 2 &&
      openCards[0] !== clickedCard &&
      !clickedCard.classList.contains("match")) {

    // open the clicked card
    clickedCard.classList.add("open", "show");
    openCards.push(clickedCard);

    if (openCards.length === 2) {
      movesCounter++;
      moves.forEach(move => move.textContent = movesCounter);

      // diplays a comment and star rating acording the number moves made to win the game
      switch (movesCounter) {
        case 8:
          finishComment.innerHTML = `&#129320; <span id="congrats"> How much did you pay for your luck?! </span> &#129320;`;
          break;
        case 9:
          finishComment.innerHTML = `&#127881; &#128526; <span id="congrats"> PERFECT </span> &#128526; &#127881;`;
          break;
        case 13:
          finishComment.innerHTML = `&#128079; <span id="congrats"> Good Job! </span> &#128079;`;
          starRatings.forEach(stars => stars.firstElementChild.remove());
          break;
        case 20:
          finishComment.innerHTML = `You can do better.`;
          starRatings.forEach(stars => stars.firstElementChild.remove());
          break;
      }

      // check if the open cards are matched or not
      if (matching(openCards)) {
        openCards.forEach(card => card.classList.add("match"))
        let win = matchedCards.push(openCards[0], openCards[1]);
        openCards.forEach(card => card.classList.remove("open", "show"));
        openCards = [];

        // if all cards are matched, end the game
        if (win === 16)
          endGame();

      } else {
        setTimeout(() => {openCards.forEach(card => card.classList.remove("open", "show"));
          openCards = [];
        }, 600);
      }
    }
  }
});
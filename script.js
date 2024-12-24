'use strict';
//selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0el = document.querySelector('#score--0');
const score1el = document.getElementById('score--1');
const current0el = document.getElementById('current--0');
const current1el = document.getElementById('current--1');

const diceel = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
let scores = [0, 0];
let currentscore = 0;
let activeplayer = 0;
let playing = true;

const init = function () {
  score0el.textContent = 0;
  score1el.textContent = 0;
  diceel.classList.add('hidden');

  scores = [0, 0];
  currentscore = 0;
  activeplayer = 0;
  playing = true;
  score0el.textContent = 0;
  score1el.textContent = 0;
  current0el.textContent = 0;
  current1el.textContent = 0;
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');
  player0el.classList.add('player--active');
  player1el.classList.remove('player--active');
};
init();


const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentscore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2.display dice
    diceel.classList.remove('hidden');
    diceel.src = `dice-${dice}.png`;

    //3.check for rolled 1:if true,switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentscore = currentscore + dice;
      document.getElementById(`current--${activeplayer}`).textContent = currentscore;

    } else {
      switchplayer();

    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(`hold button`);
    //1.add current score to active player's score
    scores[activeplayer] += currentscore;
    //  scores[1]=scores[1]+currentscore
    document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
    //2.check if player's score  is >=100 
    if (scores[activeplayer] >= 10) {
      //finish the game
      playing = false;
      diceel.classList.add('hidden');
      document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activeplayer}`).classList.remove('player--active');
    } else {
      switchplayer();
    }
  }
});

btnNew.addEventListener('click', init);





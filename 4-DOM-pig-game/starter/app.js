/* jshint expr: true */
//  Initiate variables that need to be globally accessible
/******************************************************************************
 *  CHALLENGES:                                                               *
 *  3.  Add second dice to the game                                           *
 *        Player still loses current score if 1 of them is a 1                *
 *        (Hint: Reposition dice with CSS)                                    *
 ******************************************************************************/
var scores, roundScore, activePlayer, gamePlaying, endScore; //prevDice,
endScore = document.getElementById('set-score').value;
console.log(endScore);
//  Prepares the game from a beginning state
init();

function init() {
  /*  Set both scores to 0
      Using an array so we only need 1 variable for scores  */
  scores = [0, 0];
  roundScore = 0; // Score for a specific round, only one person plays at a time
  activePlayer = 0; // 0-1 because the scores array is 0 based
  /*  Allows .btn-roll and btn-hold to be clicked when true
      Prevents .btn-roll and btn hold from being clicked when false */
  gamePlaying = true;


  //  Hides dice
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  //  Sets Player 1 & 2 global score to match scores array
  document.getElementById('score-0').textContent = scores[0];
  document.getElementById('score-1').textContent = scores[1];

  //  Sets Player 1 & 2 current score to 0
  document.getElementById('current-0').textContent = roundScore;
  document.getElementById('current-1').textContent = roundScore;

  //  Sets Player 1 & 2 Name
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  /*  Removes winner CSS class from Player 1 || 2
        Will do both but only 1 is needed */
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  //  Ensures active CSS class is removed from Player 1 & 2
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  /*  Adds active css class to Player 1 since they always start
        Removing it and re-adding ensures we don't double add */
  document.querySelector('.player-0-panel').classList.add('active');
} // end of init

/*  ROLL DICE BUTTON: Handles what happens when the Roll Dice button is clicked
    Uses anonymous function (See Anonymous Functions below) */
document.querySelector('.btn-roll').addEventListener('click', function() {
  /*  Ensures that Roll Dice cannot be clicked when winning score is reached
        When gamePlaying = true; game continues
        When gamePlaying = false; button disabled game stopped  */
  if (gamePlaying) {
    //  1. Generate Random number (See Dice Logic below)
    var dice1 = Math.floor((Math.random() * 6) + 1);
    var dice2 = Math.floor((Math.random() * 6) + 1);

    // if (prevDice === dice && dice === 6) {
    //   scores[activePlayer] = 0;
    //   //  Updates activePlayer UI score to what was calculated
    //   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //   nextPlayer();
    // }

    //  2. Display the result
    var diceDOM = document.querySelector('.dice1'); // Creates var shortcut
    var diceDOM2 = document.querySelector('.dice2');
    //  Selects <img src> block with dice class so we can change the image
    diceDOM.style.display = 'block';
    diceDOM2.style.display = 'block';
    //  Replaces image with whatever number dice was rolled
    diceDOM.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    //  3a. Update the round score IF the rolled number is NOT 1
    if (dice1 !== 1 && dice2 !== 1) {
      //  Add score
      roundScore += dice1 + dice2; // adds number rolled to roundScore

      //  Changes Current score for current player
      document.querySelector('#current-' + activePlayer).textContent = roundScore;

      //Save this roll as prevDice
      // prevDice = dice;
    } else {
      //  3b. Next player IF the rolled number IS 1
      nextPlayer();
    }
  }
});

/*  HOLD BUTTON: Handles what happens when Hold button is clicked
      Uses anonymous function (See Anonymous Functions below) */
document.querySelector('.btn-hold').addEventListener('click', function() {
  /*  Ensures that Hold cannot be clicked when winning score is reached
        When gamePlaying = true; game continues
        When gamePlaying = false; button disabled game stopped  */
  if (gamePlaying) {
    // 1. Add current score to activePlayer global score
    scores[activePlayer] += roundScore;

    // 2. Update UI
    //  Updates activePlayer UI score to what was calculated
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game
    if (scores[activePlayer] >= endScore) {
      // Ensures if score is reached Roll and Hold buttons are disabled
      gamePlaying = false;

      // Changes winning players name to WINNER
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

      // Hides dice
      document.querySelector('.dice').style.display = 'none';

      // Adds winner css class to activePlayer
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');

      // Removes active css class from activePlayer (since they played last)
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
      // 4. Next Player (Total score still < 100)
      nextPlayer(); // Runs nextPlayer function
    }
  }

});

//  Set Score Button
document.querySelector('.btn-set-score').addEventListener('click', function() {
  endScore = document.getElementById('set-score').value;
  console.log(endScore);
  init();
});

/*  Handles transition to next player
      Can be after either rolling a 1 or after clicking HOLD  */
function nextPlayer() {
  /*  If activePlayer is 0 set to 1 else set to 0
        Forces player change*/
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0; //Reset round score, especially since there is only 1 var

  // Set current score for Player 1 and 2 to 0
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  /* Toggles active CSS class for both players
        Player 0 starts active so both players should be opposite */
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  //  Hide dice
  document.querySelector('.dice1').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

// Handles New Game Button, runs init function on click
document.querySelector('.btn-new').addEventListener('click', init);



/******************************************************************************
 *                             INDEX AND NOTES                                *
 ******************************************************************************/

/******************************************************************************
 *                               GAME RULES:                                  *
 *                                                                            *
 *     - The game has 2 players, playing in rounds                            *
 *     - In each turn, a player rolls a dice as many times as he whishes      *
 *         Each result get added to his ROUND score                           *
 *     - BUT, if the player rolls a 1, all his ROUND score gets lost.         *
 *         After that, it's the next player's turn                            *
 *     - The player can choose to 'Hold'                                      *
 *        This means that his ROUND score gets added to his GLBAL score.      *
 *         After that, it's the next player's turn                            *
 *     - The first player to reach 100 points on GLOBAL score wins the game   *
 ******************************************************************************/
/*****************************************************************************
 * Anonymous Functions                                                       *
 *   These are functions that are not named                                  *
 *   They are defined in the event listener                                  *
 *   They can only be used when that event is triggered                      *
 *   document.querySelector('.btn-hold')                                     *
 *     Selects area for event listener to monitor                            *
 *   .addEventListener('click', functionHereInBrackets)                      *
 *     The function here can only be used on the click                       *
 *     Function cannot have a value passed to it                             *
 ****************************************************************************/

/*****************************************************************************
 *  Dice Logic:                                                              *
 *  Math.random gets a random number between 0-1]                            *
 *  Multiplying by 6 will make that number between 0 and 5.999               *
 *  Math.floor will removes decimals so we have an integer between 0-5       *
 *  Adding 1 will make the number between 1 and 6 like a die                 *
 *****************************************************************************/

/*****************************************************************************
 * Document Objects:                                                         *
 * document object gives acces to DOM                                        *
 * document.querySelector(); allows selection of things similar to CSS       *
 *   Can only select the first object it finds                               *
 * document.querySelector('x').textContent = 'stuff';                        *
 *   Allows insertion of text                                                *
 * document.querySelector('x').innerHTML = '<html> Stuff </here>'            *
 *   Allows insertion of HTML data                                           *
 *****************************************************************************/

/******************************************************************************
 *  CHALLENGES:                                                               *
 *  1.  When two 6's are rolled in a row:                                     *
 *        activePlayer loses their entire (global) scores                     *
 *        It becomes the next players turn                                    *
 *        (Hint: Save the previous dice roll as a seperate variable)          *
 *  2.  Add HTML input field                                                  *
 *        Allow players to set custom winning score                           *
 *        (Hint: read value with .value property in js)                       *
 *  3.  Add second dice to the game                                           *
 *        Player still loses current score if 1 of them is a 1                *
 *        (Hint: Reposition dice with CSS)                                    *
 ******************************************************************************/
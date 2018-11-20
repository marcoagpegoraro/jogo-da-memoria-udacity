/*
* Create a list that holds all of your cards
*/

let cards = $('.card');
let stars = $('.stars');
let starsCount = 3;
let score = 0;
let timer = 0;
let timerId = 0;
let moves = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

function shuffleArray(array) {
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

function shuffle() {
    $('.deck').children().remove();
    shuffleArray(cards);
    $('.deck').append(cards);
    addClickEvent();
    clearInterval(timerId);
    startTimer();
}

shuffle();

/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
let clickedCard = null;

$('.restart').click(function () {
    startNewGame();
});



function addClickEvent() {
    $('.card').click(function (e) {
        if (e.target.className != 'card') return;
        if (clickedCard == null) {
            clickedCard = e.target;
            clickedCard.className = "card open show";
        }
        else {
            moves++;
            $('.moves').text(moves);
            if (clickedCard.firstElementChild.className == e.target.firstElementChild.className) {
                clickedCard.className = 'card match';
                e.target.className = 'card match';
                score++;
                verificarSeGanhou();
                clickedCard = null;
            }
            else {
                e.target.className = "card open show";

                let disbleScreen = document.createElement("div");
                disbleScreen.className += "overlay";
                document.body.appendChild(disbleScreen);

                setTimeout(function () {
                    disbleScreen.parentNode.removeChild(disbleScreen);
                    clickedCard.className = "card";
                    e.target.className = "card";

                    removeStar();
                    clickedCard = null;
                }, 1000);

            }
        }
    });
}

function removeStar() {
    let star = $('.fa-star');

    if (moves == 12){
        star[0].remove();
        starsCount--;
    }
    else if (moves == 20){
        star[0].remove();
        starsCount--;
    }
}

function startNewGame() {
    starsCount = 3;
    score = 0;
    moves = 0;
    $('.moves').text(moves);

    $('.stars').empty();
    for (let i = 0; i < starsCount; i++) {
        $('.stars').prepend('<li><i class="fa fa-star"></i></li>\n');
    }

    $(cards).each(function (index, element) {
        element.className = 'card';
    });
    shuffle();
}

function verificarSeGanhou() {
    if (score == 8) {
        winGame();
    }
}


function winGame() {
    clearInterval(timerId);
    let estrelas;
    if (starsCount == 1)
        estrelas = 'estrelinha';
    else
        estrelas = 'estrelinhas';

    
    if (confirm(`Você ganhou, parabéns!! (*^▽^*)
Você terminou o jogo com ${starsCount} ${estrelas}
em ${timer} segundos e em ${moves} movimentos!!!
deseja iniciar um novo jogo?`)) {
        startNewGame();
    } else {
        $(".card").unbind('click');
    }
}

function startTimer() {
    timer = 0;
    timerId = setInterval(() => {
        $('.timer').text(timer);
        timer++;
    }, 1000);
}
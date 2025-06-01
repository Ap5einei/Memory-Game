const cardContainer = document.getElementById('cardContainer');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const resetButton = document.getElementById('resetButton');

let cards = [];
let firstCard = null;
let secondCard = null;
let score = 0;
let timer = 0;
let interval;
let matchedCards = 0;
let gameStarted = false;

const images = [
    './img/img1.png', './img/img2.png', './img/img3.png',
    './img/img4.png', './img/img5.png', './img/img6.png',
    './img/img7.png', './img/img8.png'
];

//Generate card values
const generateCards = () => {
    cards = [...images, ...images];  //duplicate images for matching
    cards.sort(() => Math.random() - 0.5); //Shuffle cards
}

//create card elements
const createCards = () => {
    cardContainer.innerHTML = '';
    generateCards();

    cards.forEach((imgSrc) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const front = document.createElement('div');
        front.classList.add('front');

        const back = document.createElement('div');
        back.classList.add('back');

        const img = document.createElement('img');
        img.src = imgSrc;
        back.appendChild(img);

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        cardContainer.appendChild(card);
    });
};



//Flip card function
const flipCard = (event) => {
    if (!gameStarted) return;
    const clickedCard = event.target.closest('.card');

    if (
        clickedCard === firstCard ||
        clickedCard.classList.contains('flipped') ||
        secondCard
    ) {
        return;
    }

    clickedCard.classList.add('flipped');

    if (!firstCard) {
        firstCard = clickedCard;
    } else {
        secondCard = clickedCard;
        checkMatch();
    }
};


//check for a match
const checkMatch = () => {
    if (firstCard.querySelector('img').src
        === secondCard.querySelector('img').src) {
        score++;
        matchedCards += 2;
        scoreDisplay.textContent = score;
        resetCards();
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetCards();
        }, 1000);
    }
};

//Reset selected cards
const resetCards = () => {
    firstCard = null;
    secondCard = null;
}

//start timer
const startTimer = () => {
    clearInterval(interval);
    timer = 0;
    timerDisplay.textContent = timer;
    interval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
    }, 1000);
};


//check if all cards matched
const checkWin = () => {
    if (matchedCards === cards.length) {
        clearInterval(interval);
        alert(`Congratulations! 
            Your Score: ${score}. Time taken: ${timer}s`);
    }
}


//Reset game 
const resetGame = () => {
    score = 0;
    timer = 0;
    matchedCards = 0;
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    createCards();
    gameStarted = true;
    startTimer();
}

//Event listeners
resetButton.addEventListener('click', resetGame);

//initialize the game without starting it
createCards();
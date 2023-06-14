import cards from "./cards.js";
let deck = [];

const cardFront = document.querySelector(".cardSvg");
const functionalCard = document.querySelector(".card");
const startButton = document.querySelector(".play");

// DEVELOPMENT IDEAS:
// -----------------------IDEA FRENTE FALSO-----------------------
// TENER DOS CARTAS, UNA FLIPEABLE Y UNA QUE SÓLO ES EL FRENTE FALSO
// AL HACER CLICK EN EL FRENTE DE LA CARTA ORIGINAL, HACER LA ANIMACIÓN CON EL FRENTE FALSO,
// AL TERMINAR ANIMACIÓN, MOSTRAR NUEVAMENTE CARTA ORIGINAL PERO DEL REVERSO

//--------get card suit----------
function getCardSuit(cardNumber) {
  // array with every card suit
  const cardSuits = cards.map((card) => card.name.split("_")[0]);
  return cardSuits[cardNumber];
}

function getCardValue(cardNumber) {
  //array with every card value
  const cardValues = cards.map((card) => {
    const numberPart = card.name.slice(card.name.indexOf("_") + 1);
    const value = numberPart == "10" ? "10" : numberPart.charAt(0);
    return value;
  });
  return cardValues[cardNumber];
}

//--------check if card is on deck----------
function isCardOnDeck(cardNumber) {
  if (deck.length == 52) {
    deck = [];
  } else {
    if (deck.includes(cardNumber)) {
      return true;
    } else {
      deck.push(cardNumber);
      return false;
    }
  }
}

//--------generate random card--------
function randomCard() {
  let randomCardNumber;
  let isOnDeck;
  do {
    randomCardNumber = Math.floor(Math.random() * 52);
    isOnDeck = isCardOnDeck(randomCardNumber);
  } while (isOnDeck);
  return randomCardNumber;
}

//--------flip card on click-----------
function flipCardOnClick() {
  let randomCardNumber = randomCard();
  let cardValue = getCardValue(randomCardNumber);
  let cardSuit = getCardSuit(randomCardNumber);
  console.table(`${cardValue} of ${cardSuit}s`);
  let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
  cardFront.innerHTML = cardContent;
}

functionalCard.addEventListener("click", function () {
  if (functionalCard.classList.contains("flipped")) {
    flipCardOnClick();
  }
  // hide card when flip (WIP)
  /* else {
    functionalCard.classList.toggle("hidingFront");
    functionalCard.style.visibility = "hidden";
    setTimeout(() => {
      functionalCard.classList.toggle("hidingFront");
      functionalCard.style.visibility = "visible";
    }, 800);
  } */
  functionalCard.classList.toggle("flipped");
});

startButton.addEventListener("click", function () {
  functionalCard.click(); // Simulate the event click on functionalCard
});

// calls to generate the first card
window.onload = flipCardOnClick;

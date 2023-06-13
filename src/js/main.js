import cards from "./cards.js";
let deck = [];

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

//--------check if card is on deck----------
function isCardOnDeck(cardNumber) {
  if (deck.length == 52) {
    deck = [];
  } else {
    if (deck.includes(cardNumber)) {
      return true;
    } else {
      deck.push(cardNumber);
      console.log(deck);
      return false;
    }
  }
}

//--------generate random card--------
function randomCard(){
  let randomCardNumber = Math.floor(Math.random() * 52);
  let isOnDeck = isCardOnDeck(randomCardNumber);
  do {
    randomCardNumber = Math.floor(Math.random() * 52);
    isOnDeck = isCardOnDeck(randomCardNumber);
  } while (isOnDeck);
  return randomCardNumber;
}

//--------flip card on click-----------
function flipCardOnClick() {
  const htmlCard = document.querySelector(".card");
  let randomCardNumber = randomCard();
  // -------insert initial card on html---------
  let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
  const cardFront = document.querySelector(".cardSvg");
  const fakeFrontSvg = document.querySelector(".fakeFrontSvg");

  cardFront.innerHTML = cardContent;
  fakeFrontSvg.innerHTML = cardContent;

  htmlCard.addEventListener("click", function () {
    if (htmlCard.classList.contains("flipped")) {
      randomCardNumber = randomCard();
      let cardSuit = getCardSuit(randomCardNumber);
      // -------insert card on html---------
      cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
      cardFront.innerHTML = cardContent;
      fakeFrontSvg.innerHTML = cardContent;
    } else {
      cardFront.classList.toggle("hidingFront");
      fakeFrontSvg.classList.toggle("flip");
      cardFront.style.visibility = "hidden";
      setTimeout(() => {
        cardFront.classList.toggle("hidingFront");
        fakeFrontSvg.classList.toggle("flip");
        cardFront.style.visibility = "visible";
      }, 1000);
    }
    htmlCard.classList.toggle("flipped");
    /*     setTimeout(() => {
      htmlCard.style.visibility = "hidden";
    }, 800); */
    // htmlCard.classList.toggle("slide-to-bottom");
  });
}

window.onload = flipCardOnClick;

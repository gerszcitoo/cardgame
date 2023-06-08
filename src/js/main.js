import cards from "./cards.js";
let deck = [];

// DESARROLLO:
// AL HACER CLICK EN LA CARTA FRONTAL, SE HACE LA ANIMACIÓN DE ENVIARLA ATRÁS,
// A LA VEZ SE AÑADE UNA CARTA ATRÁS/ADELANTE DE TODO DEL MAZO Y SE MODIFICA LA POSICIÓN DEL MAZO
// DESPUÉS LA CARTA NUEVA SE LE DA EL FUNCIONAMIENTO DEL BACK DE LA CARTA
// Y AL CLICKEAR VUELVE AL FUNCIONAMIENTO DE LA CARTA ORIGINAL
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
      return false;
    }
  }
  //si deck.length = 52, que reinicie el deck o lo repita en mismo orden
}

//--------flip card on click-----------
function flipCardOnClick() {
  const htmlCard = document.querySelector(".card");

  //-------generate random card---------
  let randomCardNumber = Math.floor(Math.random() * 52);
  let isOnDeck = isCardOnDeck(randomCardNumber);
  do {
    randomCardNumber = Math.floor(Math.random() * 52);
    isOnDeck = isCardOnDeck(randomCardNumber);
  } while (isOnDeck);

  // -------insert initial card on html---------
  let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
  const cardFront = document.querySelector(".cardSvg");
  const fakeFrontSvg = document.querySelector(".fakeFrontSvg");

  cardFront.innerHTML = cardContent;
  fakeFrontSvg.innerHTML = cardContent;

  htmlCard.addEventListener("click", function () {
    if (htmlCard.classList.contains("flipped")) {
      //-------generate random card and simulate deck---------
      do {
        randomCardNumber = Math.floor(Math.random() * 52);
        isOnDeck = isCardOnDeck(randomCardNumber);
      } while (isOnDeck);
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

window.onload = flipCardOnClick();

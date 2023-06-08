import cards from "./cards.js";

//--------get card suit----------
function getCardSuit(cardNumber) {
  // array with every card suit
  const cardSuits = cards.map((card) => card.name.split("_")[0]);
  return cardSuits[cardNumber];
}

/* function isCardOnDeck(cardNumber) {
  if(!deck){
   const deck = [];
  }
  if(deck.includes(cardNumber)){
   return true;
  } else {
   deck.push(cardNumber);
   return false;
  }
  //si deck.length = 52, que reinicie el deck o lo repita en mismo orden
} */

function flipCardOnClick() {
  //--------flip card on click-----------
  const htmlCard = document.querySelector(".card");

  //-------generate random card---------
  let randomCardNumber = Math.floor(Math.random() * 52);

  // -------insert initial card on html---------
  let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
  let cardFront = document.querySelector(".cardSvg");
  cardFront.innerHTML = cardContent;

  htmlCard.addEventListener("click", function () {
    if (htmlCard.classList.contains("flipped")) {
      //-------generate random card and get its suit---------
      randomCardNumber = Math.floor(Math.random() * 52);
      let cardSuit = getCardSuit(randomCardNumber);
      // -------insert card on html---------
      cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCardNumber].name}" x="0" y="0" />`;
      cardFront.innerHTML = cardContent;
    }
    htmlCard.classList.toggle("flipped");
  });
}

window.onload = flipCardOnClick();

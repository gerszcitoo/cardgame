import cards from "./cards.js";

//--------flip card on click-----------
const htmlCard = document.querySelector(".card");
const htmlCardBack = document.querySelector(".card");
//define deck length
const deckLength = 52;
//-------generate random card---------
let randomCard = Math.floor(Math.random() * deckLength);

// -------insert initial card on html---------
let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCard].name}" x="0" y="0" />`;
let cardFront = document.querySelector(".cardSvg");
cardFront.innerHTML = cardContent;

htmlCardBack.addEventListener("click", function () {
  if (htmlCard.classList.contains("flipped")) {
    //-------generate random card---------
    randomCard = Math.floor(Math.random() * deckLength);

    // -------insert card on html---------
    cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCard].name}" x="0" y="0" />`;
    cardFront.innerHTML = cardContent;
  }
  htmlCard.classList.toggle("flipped");
});

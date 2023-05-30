import cards from "./cards.js";

//--------flip card on click-----------
const htmlCard = document.querySelector(".card");
const htmlCardBack = document.querySelector(".card");

htmlCardBack.addEventListener("click", function () {
  if (htmlCard.classList.contains("flipped")) {
    //-------generate random card---------
    let randomCard = Math.floor(Math.random() * 53);
    console.log(cards[randomCard].name);

    // -------insert card on html---------
    let cardContent = `<use class="card" href="svg-cards.svg#${cards[randomCard].name}" x="0" y="0" />`;
    let cardFront = document.querySelector(".cardSvg");
    cardFront.innerHTML = cardContent;
  }
  htmlCard.classList.toggle("flipped");
});

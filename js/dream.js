import { data } from "./data.js";
import { addMarkerOnMap } from "./map.js";

const dreamContainer = document.getElementById("dreams-container");

const buildAllDreams = () => {
  while (dreamContainer.hasChildNodes()) {
    dreamContainer.removeChild(dreamContainer.lastChild);
  }
  data.forEach(buildOneDream);
};

const buildOneDream = (dream) => {
  addMarkerOnMap(dream);
  // create card div
  const dreamCard = document.createElement("div");
  // add the class to the div
  dreamCard.className = "card mb-3";
  dreamCard.id = `${dream.id}`;
  // add the content of the card
  dreamCard.innerHTML = `
    <img src="${dream.imagePath}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${dream.title}</h5>
      <p class="card-text">${dream.description}</p>
      <a href="#" class="btn btn${dream.done ? "-secondary" : "-info"} w-100 mb-3 text-white bold button-done">
        ${dream.done ? "Already done, click to do it again" : "Click to mark as done"}
      </a>
      <div class="d-flex justify-content-between">
        <a href="${dream.link}" target="_blank" class="btn btn-outline-secondary col-5 ">
          More info
        </a>
        <a href="#" id="${dream.country}" class="btn btn-outline-primary col-5 button-visit">
          Visit
        </a>
      </div>
    </div>`;
  // add the card to the html
  dreamContainer.appendChild(dreamCard);
};

export { buildAllDreams };
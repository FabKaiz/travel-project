import { data } from "./data.js";
import { buildAllDreams } from "./dream.js";

let map;
let boolVal = true;

// Google map api initialization
const initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 2,
    center: { lat: 34.118003902903354, lng: -0.3004396655224 },
  });
  map.setStreetView(); // To add the street view option to the user
  addMarkerOnMap();
  setTimeout(() => loadOptions(), 100);
};

// Put the all the marker pin on the map
const addMarkerOnMap = () => {
  for (let i = 0; i < data.length; i++) {
    const marker = new google.maps.Marker({
      position: data[i].coordinates,
      icon: data[i].done ? "./img/pin_done.png" : "./img/pin.png",
      map: map,
    });
  }
};

// ----------------------------- Custom Street View ----------------------------------
const loadOptions = () => {
  const allVisitBtns = document.querySelectorAll(".button-visit");
  const allTripDoneBtns = document.querySelectorAll(".button-done");

  const changeVisitBtnContent = (button) => {
    button.innerText === "Visit"? (button.innerText = "Exit Street View") : (button.innerText = "Visit");
  };

  allVisitBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      allVisitBtns.forEach((button) => changeVisitBtnContent(button));
      switch (event.target.id) {
        case "la":
          setPovToCountry(boolVal, 105, 0, "3ip5NHW6jRa29UimEiHASQ");
          break;
        case "dubai":
          setPovToCountry(boolVal, 270, 30, "POtnJZBAFYoHzv5YCJXWnw");
          break;
        case "japan":
          setPovToCountry(boolVal, 65, 10, "wriblq-JtYS1pfJX9y9spw");
          break;
        case "ny":
          setPovToCountry(boolVal, 240, 30, "wNuVArlYLDyDz8_VFw6J9w");
          break;
      }
    });
  });

  const toggleDreamDone = (dreamId) => {
    let dream = data.filter((item) => item.id == dreamId)[0];
    dream.done = !dream.done;
  };

  allTripDoneBtns.forEach((button) => {
    button.addEventListener("click", (event) => {
      toggleDreamDone(button.parentElement.parentElement.getAttribute("id"));
      buildAllDreams();
      initMap();
    });
  });
};

// -- Switch to Street View at a specific place --
// boolean : boolean // to turn on or off the feature
// heading : nuumber // Rotation of the camera
// pitch   : nuumber // angle/tilt of the camera
// panoID  : String" // 22 character for the position on the map
const setPovToCountry = (boolean, heading, pitch, panoID) => {
  boolVal = !boolVal;
  map.streetView.setVisible(boolean);
  map.streetView.setPov({
    heading: heading,
    pitch: pitch,
  }),
    map.streetView.setPano(panoID);
};

export { initMap, addMarkerOnMap };
// import { Loader } from "google-maps";

let map;
var markers = [];

async function main() {
  // const apiKey = "AIzaSyD5sjcADktLH6cQ1juSfhSHegblbDkMXFo";
  // const loader = new Loader(apiKey);
  // const google = await loader.load();
  const mapDom = document.getElementById("map");

  map = new google.maps.Map(mapDom, {
    center: { lat: 23.81800190015246, lng: 90.42104025271799 },
    zoom: 15,
    disableDefaultUI: true,
  });
}

main();

/**
 * Check if a marker already exists in the markers array
 * @param {*} position
 * @returns
 */
function isMarkerExistsByPosition(position) {
  let found = false;
  markers.forEach((marker) => {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    if (lat === position.lat && lng === position.lng) {
      found = true;
    }
  });

  return found;
}

function removeMarker(position) {
  markers.forEach((marker, index) => {
    let lat = marker.getPosition().lat();
    let lng = marker.getPosition().lng();
    if (lat === position.lat && lng === position.lng) {
      marker.setMap(null);

      markers.splice(index, 1);
    }
  });
}

function addMarker(position) {
  let marker = new google.maps.Marker({
    // icon: "https://practice.juthijesmin.com/wp-content/uploads/2022/04/LoomHomes-Pin-1.png",
    position, // title: "Loom Homes",
    animation: google.maps.Animation.DROP,
  });

  isMarkerExistsByPosition(position);

  if (!isMarkerExistsByPosition(position)) {
    marker.setMap(map);
    map.setZoom(20);
    map.setCenter(position);
    markers.push(marker);
  } else {
    removeMarker(position);
  }
}

document.querySelectorAll(".add-marker-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    let positions = e.target.dataset.location.split(",");
    let lat = parseFloat(positions[0].trim());
    let lng = parseFloat(positions[1].trim());

    addMarker({ lat, lng });
  });
});

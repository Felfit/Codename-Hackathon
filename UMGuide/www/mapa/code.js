mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsZml0IiwiYSI6ImNqZGhhb2U3YjB1dHYycXA0dHFpdWJqa2sifQ.-anNT3-EVf37K75qjxrNqw';
// Sets bounds to UMinho
var bounds = [
    [-8.403125, 41.557518], // Southwest coordinates , 
    [-8.393239, 41.565339]  // Northeast coordinates , 
];



var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/felfit/cjdhdfd5mh8zq2tokssxftu3h', // stylesheet location
    center: [-8.3977517, 41.5607746], // starting position [lng, lat]
    zoom: 16.5, // starting zoom
    maxBounds: bounds
});

function isOpen(i){
  var d = new Date();
  var day = d.getDay();
  if (schedules[i] === null) return "";
  var open = schedules[i][day].open * 1000;
  var close = schedules[i][day].close * 1000;

  var currentTime =(d.getTime() - d.setHours(0,0,0,0));
  console.log("isto" + currentTime);
  console.log(open);
  console.log(close);

  if(currentTime > open){
    if(currentTime < close){
      return "Open, closes at " + new Date(close).getHours() + ":" + new Date(close).getMinutes();
    }
    else{
      return "Closed"
    }
  }
  else{
    return "Closed, opens at " + new Date(open).getHours() + ":" + new Date(open).getMinutes();
  }
}

// add markers to map
geojson.features.forEach(function(marker,i) {

  // create a HTML element for each feature
  var el = document.createElement('img');
  el.className = 'marker';
  el.src = "img/"+(i)+".png";

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML(
    '<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + isOpen(i) + '</p>'
    + '<input type="button" class="btn" onclick="moreInfo('+i+')" value="More info">'))

  .addTo(map);
});

function dofunction(params) {
    console.log(params);
}

function findMe() {
  navigator.geolocation.getCurrentPosition(function(pos){
    $("#me").remove();
    var marker = createMarker([pos.coords.longitude, pos.coords.latitude], "me");
  });
}

function createMarker(coord, id = "") {
  var el = $("<img>")
            .addClass('marker')
            .attr("id", id)
            .attr("src","img/youarehere.png").get(0);

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(coord)
  .addTo(map)
  return el;
}

map.on("mousedown", function(e){
  var coord = e.lngLat;
  console.log([coord.lng, coord.lat]);
});

var directions = new MapboxDirections({
  accessToken: mapboxgl.accessToken,
  unit: 'metric',
  profile: 'walking',
  controls: {
    inputs: false,
    instructions: false,
    profileSwitcher: false
  }
});

//map.addControl(directions, 'bottom-left');
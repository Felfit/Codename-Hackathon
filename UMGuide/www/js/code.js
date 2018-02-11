mapboxgl.accessToken = 'pk.eyJ1IjoiZmVsZml0IiwiYSI6ImNqZGhhb2U3YjB1dHYycXA0dHFpdWJqa2sifQ.-anNT3-EVf37K75qjxrNqw';
// Sets bounds to UMinho
var bounds = [
    [-8.403225, 41.557618], // Southwest coordinates , 
    [-8.393139, 41.565239]  // Northeast coordinates , 
];

var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/felfit/cjdhdfd5mh8zq2tokssxftu3h', // stylesheet location
    center: [-8.3977517, 41.5607746], // starting position [lng, lat]
    zoom: 16.5, // starting zoom
    //maxBounds: bounds
});

var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'walking',
      interactive: false,
      controls: {
        inputs: false,
        instructions: false,
        profileSwitcher: false
      }
    });

function isOpen(i){
  var d = new Date();
  var day = d.getDay();
  if (schedules[i] === null) return "";
  var open = schedules[i][day].open * 3600000; // h -> ms
  var close = schedules[i][day].close * 3600000;

  var currentTime =(d.getTime() - d.setHours(0,0,0,0));

  if(currentTime > open){
    if(currentTime < close){
      return "Aberto, fecha às " + new Date(close).getHours() + ":" + doubleDigits(new Date(close).getMinutes());
    }
    else{
      return "Fechado"
    }
  }
  else{
    return "Fechado, abre às " + new Date(open).getHours() + ":" + doubleDigits(new Date(open).getMinutes());
  }
}
function doubleDigits(min) {
	if(min < 10) return '0' + min
	return min
}

function filterEvents(local){
    html = "";
    $.ajax({
        url: "https://felfit.github.io/fakedatabase/data.json",
        success: function(data){
               for (i in data.events) {
                   if(local == data.events[i].location){
                       html += "<p>" + data.events[i].name +"</p>";
                   }
               }
           },
           async: false
       });
    return html;
}

// add markers to map
geojson.features.forEach(function(marker,i) {

  // create a HTML element for each feature
  var el = $("<img>").addClass("marker").attr("src","img/"+(i)+".png").get(0);

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML(
    '<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p><p>' + isOpen(i) + '</p>' + filterEvents(i) + "<button class='btn' onclick='path("+i+")'>Descobrir o Caminho</button>"))
  .addTo(map);
});
bares.forEach(function(marker, i) {
  var el = $("<img>").addClass("bares").attr("src","img/bar.png").get(0);

  new mapboxgl.Marker(el)
  .setLngLat(bares[i])
  .addTo(map);
});

pois.forEach(function(marker, i) {
  var el = document.createElement('img');
  el.className = 'pois';
  el.src = "img/poi"+i+".png";

  new mapboxgl.Marker(el)
  .setLngLat(pois[i])
  .addTo(map);
});

function findMe() {
  navigator.geolocation.getCurrentPosition(function(pos){
    removeHereMarker();
    var coord = [pos.coords.longitude, pos.coords.latitude];
    createHereMarker(coord);
    map.panTo(coord, 100);
    directions.setOrigin(coord);
  });
}

function path(index) {
  findMe()
  directions.setDestination(geojson.features[index].geometry.coordinates);
  var controlo = map.addControl(directions, 'bottom-left');
}

function toggleBares(elemClicked) {
	$('.bares').toggle();
	var notColored = $(elemClicked).hasClass('notColored');
	if(notColored){
		$(elemClicked).removeClass('notColored');
	} else {
		$(elemClicked).addClass('notColored');
	}
}

function removeHereMarker() {
  $(".here").remove();
}

function createHereMarker(coord) {
  var el = $("<img>")
            .addClass('here')
            .addClass("marker")
            .attr("src","img/youarehere.png").get(0);

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
  .setLngLat(coord)
  .addTo(map)
}
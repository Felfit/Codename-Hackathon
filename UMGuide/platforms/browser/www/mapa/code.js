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
  .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
  .addTo(map);
});
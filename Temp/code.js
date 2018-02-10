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

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-8.397372, 41.561699], 
    },
    properties: {
      title: 'Mapbox',
      description: 'DI'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-122.414, 37.776]
    },
    properties: {
      title: 'Mapbox',
      description: 'San Francisco, California'
    }
  }]
};

// add markers to map
geojson.features.forEach(function(marker) {

// create a HTML element for each feature
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat(marker.geometry.coordinates)
.addTo(map);
});
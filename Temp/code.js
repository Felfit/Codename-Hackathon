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
      coordinates: [-8.395659, 41.560356], 
    },
    properties: {
      title: 'Mapbox',
      description: 'Complexo Pedagógico 1'
    }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.397723, 41.560088], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Complexo Pedagógico 2'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.397997, 41.560820], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Complexo Pedagógico 3'
      }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-8.396735, 41.560020]
    },
    properties: {
      title: 'Mapbox',
      description: 'Biblioteca Geral | Escola Superior de Enfermagem'
    }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.396806, 41.560328], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Instituto das Artes e Ciencias Humanas'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.396318, 41.561140], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Escola de Ciencias'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.397168, 41.561704], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Escola de Engenharia'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.398429, 41.561474], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Escola de Economia e Gestao'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.394953, 41.561918], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Complexo Desportivo da Universidade do Minho'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.394276, 41.562825], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Serviços Técnicos'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.397997, 41.560820], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Complexo Pedagógico 3'
      }
  },
  {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-8.397997, 41.560820], 
      },
      properties: {
        title: 'Mapbox',
        description: 'Complexo Pedagógico 3'
      }
  }]
};

map.dragRotate.disable();

var popup = new mapboxgl.Popup({closeOnClick: false})
    .setLngLat([-8.3977517, 41.5607746])
    .setHTML('<h1>Hello World!</h1>')
    .addTo(map);


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
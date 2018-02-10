var map = new mapboxgl.Map({
  container: 'map',
  center: [-122.420679, 37.772537],
  zoom: 13,
  //style: style_object,
  hash: true,
  transformRequest: (url, resourceType)=> {
    if(resourceType == 'Source' && url.startsWith('http://myHost')) {
      return {
       //url: url.replace('http', 'https'),
       headers: { 'my-custom-header': true},
       credentials: 'include'  // Include cookies for cross-origin requests
     }
    }
  }
});
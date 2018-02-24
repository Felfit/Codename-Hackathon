$(window).on("load hashchange",function(){
	var hash = location.hash.replace("+"," ");
  	if(location.hash.startsWith("q=")){
    	return false;
  	}
  	hash = hash.slice(2);
	var features = geojson.features;
	var max = 0;
	var maxIndex = null;
	var result;
	for(var i = 0; i < features.length; i++){
		var result = [];
		var q = [];
		if(features[i].properties.title) {
			q.push(features[i].properties.title);
		}
		if(features[i].properties.description) {
			q.push(features[i].properties.description);
		}
		if(features[i].properties.tags) {
			for(var j = 0, length = features[i].properties.tags.length; j < length; j++){
				q.push(features[i].properties.tags[j]);
			}
		}
		for(var k = 0; k < q.length; k++){
			var val = similarity(q[k], hash);
			result.push(val);
			if(val > max){
				max = val;
				maxIndex = i;
			}
		}
		console.log(features[i].properties.title, result);
	}
  if(maxIndex !== null && max > 0.25){
    new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(features[maxIndex].geometry.coordinates)
      .setHTML(
        '<h3>' + features[maxIndex].properties.title + '</h3><p>' + features[maxIndex].properties.description + '</p><p>' + isOpen(maxIndex) + '</p>')

      .addTo(map);
      map.panTo(features[maxIndex].geometry.coordinates);
  }
  location.hash = "";
});

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
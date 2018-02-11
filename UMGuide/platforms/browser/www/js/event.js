// Add repositories to the .projects
function getEvents(){
  $('#events').html('');
	$.get(`https://felfit.github.io/fakedatabase/data.json`, function(data, status){
		if(status=='success'){
      var html = "";
			for (i in data.events) {
        html+="<div class=\"event container\">"
        html+= "<h3 class=\"title\">" + data.events[i].name +'</h3>'
        html+= "<div class=\"row\">"
        html+= "<div class=\"col-sm-2\">"
        html+= "<img class=\"event-image\" src=\""+data.events[i].img+"\" alt=\"Event\" height=\"50\" width=\"auto\" style=\"float: center;\">"
        html+= "</div>"
        html+= "<div class=\"col-sm-10\">"
        html+= "<p class=\"event-description\">"+ data.events[i].description+"</p>"
        html+= "<p><a href=\""+data.events[i].website+"\" target=\"_blank\" > Website </a> </p>"
        html+= "</div>"
        html+="</div>"
      }
		}
    $('#events').append(html);
	});
}

function openEventPanel(){
  $('#map').hide();
  $('#events').show();
}

function openMap(){
  $('#map').show();
  $('#events').hide();
}

// Add repositories to the .projects
function getEvents(){
	$.get(`https://felfit.github.io/fakedatabase/data.json`, function(data, status){
		if(status=='success'){
      var html = "";
			for (i in data.events) {
        html+="<div id=\"Event\">"
        html+= "<h3>" + data.events[i].name +'</h3>'
        html+= "<img src=\""+data.events[i].img+"\" alt=\"Event\" height=\"50\" width=\"auto\" style=\"float: center;\">"
        html+= "<p>"+data.events[i].description+"</p>"
        html+= "<p><a href=\""+data.events[i].website+"\"> Website </a> </p>"
        html+="</div>"
      }
		}
    html+="<div id=\"Event\">No more events.</div>"
    $('#demo').append(html);
	});
}

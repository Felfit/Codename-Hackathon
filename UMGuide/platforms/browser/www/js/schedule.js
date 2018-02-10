/* Events
events.addEvent("Daniel", [
	{
		start: new Date(year, month, day, hours, minutes),
		end: new Date(year, month, day, hours, minutes)
	}],
	{
		x: 0,
		y: 0,
		description: "CP1 - A4"
	},"Que seca!");

	->

{
	id: 0,
	name: "Aula de POO",
	time: {
		start: 1518266272309,
		end: 1518266272369,
	},
	location: {
		x: 0,
		y: 0,
		description: "CP1 - A4"
	},
	description: "Que seca!"
}


*/
// Cria a classe schedule
function schedule(){
	this.lastId = -1;
	this.events = [];
	//Adiciona um evento
	this.addEvent = function(name, timestamps, location, description){
		for (var i = 0, length = timestamps.length; i < length; i++) {
			if(location === undefined){
				location = {
					x: 0,
					y: 0,
					description: null
				}
			}
			this.events.push({
				id: ++this.lastId,
				name: name,
				time: {
					start: timestamps[i].start,
					end: timestamps[i].end
				},
				location: {
					x: location.x,
					y: location.y,
					description: location.description
				},
				description: description
			});
		}
		return this;
	}
	//Remove um evento
	this.removeEvent = function(id){
		for(var i = 0, length = this.events.length; i < length; i++){
			if(this.events[i].id == id){
				this.events.splice(i, 1);
			}
		}
		return this;
	}
	//Indica os eventos a acontecer agora
	this.currentEvents = function(){
		var data = [];
		for(var i = 0, length = this.events.length; i < length; i++){
			if(new Date().now() >= this.events[i].time.start && new Date().now() <= this.events[i].time.end){
				data.push(this.events[i]);
			}
		}
		return data;
	}
	this.todayEvents = function(){
		var data = [];
		for(var i = 0, length = this.events.length; i < length; i++){
			if(new Date().setHours(0,0,0,0) <= this.events[i].time.start && new Date().setHours(23,59,59,999) <= this.events[i].time.end){
				data.push(this.events[i]);
			}
		}
		return data;
	}
	this.deleteAllEvents = function(){
		this.events = [];
		return this;
	}
	this.getEvents = function(){
		return this.events;
	}
	this.saveEvents = function(){
		localStorage.events = JSON.stringify(this.events);
		localStorage.lastId = this.lastId;
		return this;
	}
	this.getSavedEvents = function(){
		if(localStorage.events !== undefined && localStorage.lastId !== undefined){
			this.lastId = Number(localStorage.lastId);
			this.events = JSON.parse(localStorage.events);
		}
		return this;
	}
}
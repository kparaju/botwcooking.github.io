function hasLocalStorage() {
	return typeof localStorage === "object"
}

function getValue(key) {
	try {
		if (!hasLocalStorage()) return;
		botwcooking = localStorage.getItem('botwcooking');
		if (botwcooking == null) return 0;
		botwcooking = JSON.parse(botwcooking);
		if (key in botwcooking) {
			return botwcooking[key];
		} else {
			return 0;
		}
	} catch (e) {
		console.log(e);
		return 0;
	}
}

function setValue(k, v) {
	try {
		if (!hasLocalStorage()) return;
		botwcooking = localStorage.getItem('botwcooking');
		botwcooking = JSON.parse(botwcooking);
		if (botwcooking == null) botwcooking = {"botwcooking:version": 1};
		botwcooking[k] = v;
		localStorage.setItem('botwcooking', JSON.stringify(botwcooking));
	} catch (e) {
		console.log(e);
	}
}

$(document).ready(function(){

	console.log("started!");
	//alert("Site under maintenance. It might be broken.");
	var prevLetter = '0';
	var column = 0;
	for(var i = 0; i < items.length;i++) {
		var item = items[i];
		if(i % 20 === 0) {
			$("#inputs" + column).append("<br /><br /><br />");
			column++;
		}
		if(item.name.charAt(0) !== prevLetter) {
			prevLetter = item.name.charAt(0);
			$("#inputs" + column).append("<div id=\"marker" + i + "\">");
			$("#marker" + i).append("<p class=\"col-sm-6\"><strong>" + item.name.charAt(0).toUpperCase() + "</strong></p>");
			$("#marker" + i).append("<div class=\"col-sm-6\"></div>");
		}
		$("#inputs" + column).append("<div class=\"row\" id=\"input" + i + "\">");
		$("#input" + i).append("<p class=\"col-sm-6\">" + item.name + "</p>");
		val = getValue(item.name);
		$("#input" + i).append("<input class=\"col-sm-6\" type=\"number\" min=\"0\" value=\"" + val + "\" data-name=\"" + item.name + "\" id=\"inputItem" + item.id + "\">")

		// TODO: we are creating a lot of listeners. This is inefficient, we should only create one
		$("#inputItem" + item.id).focusout(function(e) {
			console.log(e.target.getAttribute("data-name"));
			console.log(e.target.value);
			setValue(e.target.getAttribute("data-name"), e.target.value)
		});
		//$("#inputs" + column).children().eq(0).append(item.name + "<br />");
		//$("#inputs" + column).children().eq(1).append("<input type=\"number\" min=\"0\" value=\"2\" id=\"inputItem" + item.id + "\"><br />");
	}
});

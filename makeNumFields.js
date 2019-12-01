DEFAULT_DATA = {"botwcooking:version": 1}
LOCALSTORAGE_KEY = "botwcooking"

function hasLocalStorage() {
	return typeof localStorage === "object"
}

function getExistingData() {
	try {
		if (!hasLocalStorage()) return;
		ls_data = localStorage.getItem(LOCALSTORAGE_KEY);
		if (ls_data == null) return;
		ls_data = JSON.parse(ls_data);
		return ls_data;
	} catch (e) {
		console.log("Could not get existing data:");
		console.log(e);
	}
}

function getLocalStorageValue(key) {
	try {
		data = getExistingData();
		if (data == null) return 0;
		return data[key] || 0;
	} catch (e) {
		console.log(e);
		return 0;
	}
}

function setLocalStorageValue(k, v) {
	try {
		data = getExistingData();
		if (data == null) data = DEFAULT_DATA;
		data[k] = v;
		localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
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
		val = getLocalStorageValue(item.name);
		$("#input" + i).append("<input class=\"col-sm-6\" type=\"number\" min=\"0\" value=\"" + val + "\" data-name=\"" + item.name + "\" id=\"inputItem" + item.id + "\">")

		// TODO: we are creating a lot of listeners. This is inefficient, we should only create one
		$("#inputItem" + item.id).focusout(function(e) {
			console.log(e.target.getAttribute("data-name"));
			console.log(e.target.value);
			setLocalStorageValue(e.target.getAttribute("data-name"), e.target.value)
		});
		//$("#inputs" + column).children().eq(0).append(item.name + "<br />");
		//$("#inputs" + column).children().eq(1).append("<input type=\"number\" min=\"0\" value=\"2\" id=\"inputItem" + item.id + "\"><br />");
	}
});

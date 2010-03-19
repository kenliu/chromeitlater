// Copyright (c) 2010 Kenneth Liu. All rights reserved.

var API_KEY = '51eA1g6ed8dr0oV2d3p9825X72T5L559';

//TODO consolidate these URLs into a map
var ADD_URL = 'https://readitlaterlist.com/v2/add';
var AUTH_URL = 'https://readitlaterlist.com/v2/auth';

//TODO add these functions into a class        
//TODO refactor out this XHR code

function add(username, password, url, title) { 
	var xhr = new XMLHttpRequest();
	var reqUrl = ADD_URL + '?username=' + username + '&password=' + password + '&apikey=' + API_KEY;
	//TODO encode URL properly?
	//TODO check for null/empty title - q: is there a diff b/n sending a url as a title and not sending a title?
	//TODO apparently RIL doesn't support anything besides http and https, check for this
	reqUrl += '&url=' + url + '&title=' + title; 
	console.debug("adding URL: " + url); 
	xhr.open("GET", reqUrl, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
	}
	xhr.send();
}

function auth(username, password) {
	var xhr = new XMLHttpRequest();
	var url = AUTH_URL + '?username=' + username + '&password=' + password + '&apikey=' + API_KEY; 
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
	}
	xhr.send();   
}
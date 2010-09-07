/* 
	Copyright 2010 Kenneth Liu.
 
	This file is part of ChromeItLater.

    ChromeItLater is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    any later version.

    ChromeItLater is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with ChromeItLater.  If not, see <http://www.gnu.org/licenses/>.
*/ 
var API_KEY = '51eA1g6ed8dr0oV2d3p9825X72T5L559';

//TODO dev API key?

//TODO consolidate these URLs into a map
var ADD_URL = 'https://readitlaterlist.com/v2/add';
var AUTH_URL = 'https://readitlaterlist.com/v2/auth';
var API_URL = 'https://readitlaterlist.com/v2/api';
var SEND_URL = 'https://readitlaterlist.com/v2/send';
//var SEND_URL = 'https://localhost:4567'

//TODO add these functions into a class        
//TODO refactor out this XHR code
                   
/**
* @param url unencoded url text
* @param title unencoded page title
* @param tags unencoded tags or empty string
* @param callback executed if call is successful
*/
function add(username, password, url, title, tags, callback) { 
	var xhr = new XMLHttpRequest();
	var reqUrl = ADD_URL + '?username=' + username + '&password=' + password + '&apikey=' + API_KEY;
	//TODO check for null/empty title - q: is there a diff b/n sending a url as a title and not sending a title?
	//TODO apparently RIL doesn't support anything besides http and https, check for this
	reqUrl += '&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
	if (tags) {
		reqUrl += '&tags=' + encodeURIComponent(tags);		
	}
	console.debug("adding URL: " + url); 
	chrome.extension.getBackgroundPage().console.debug("adding URL: " + url);
	chrome.extension.getBackgroundPage().console.debug("submitting request: " + reqUrl);
	xhr.open("GET", reqUrl, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
			callback(xhr.status, xhr.responseText);
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

function api(callback) {
	var xhr = new XMLHttpRequest();
	var url = API_URL + '?apikey=' + API_KEY; 
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4) {
			console.log(xhr.status);
			console.log(xhr.responseText);
		}
	}
	xhr.send();   	
}


var ReadItLaterAPI = Class.create({
	initialize: function() {
	
	}, 
	
	add: function(username, password, url, title, tags, callback) { 
		var xhr = new XMLHttpRequest();
		var reqUrl = ADD_URL + '?username=' + username + '&password=' + password + '&apikey=' + API_KEY;
		//TODO check for null/empty title - q: is there a diff b/n sending a url as a title and not sending a title?
		//TODO apparently RIL doesn't support anything besides http and https, check for this
		reqUrl += '&url=' + encodeURIComponent(url) + '&title=' + encodeURIComponent(title);
		reqUrl += '&tags=' + encodeURIComponent(tags); 
		console.debug("adding URL: " + url); 
		chrome.extension.getBackgroundPage().console.debug("adding URL: " + url);
		chrome.extension.getBackgroundPage().console.debug("submitting request: " + reqUrl);
		xhr.open("GET", reqUrl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				console.log(xhr.status);
				console.log(xhr.responseText);
				callback(xhr.status, xhr.responseText);
			}
		}
		xhr.send();
	},
	    
   sendNewURL: function(username, password, url, title, tags, callback) {
		var xhr = new XMLHttpRequest();
		var reqUrl = SEND_URL + '?username=' + username + '&password=' + password + '&apikey=' + API_KEY;
		//TODO check for null/empty title - q: is there a diff b/n sending a url as a title and not sending a title?
		//TODO apparently RIL doesn't support anything besides http and https, check for this
		chrome.extension.getBackgroundPage().console.debug("adding URL: " + url);
		chrome.extension.getBackgroundPage().console.debug("submitting request: " + reqUrl);

		//build JSON request
		var reqObj = {
			"0":{
				"url": encodeURIComponent(url),
				"title": encodeURIComponent(title)
			}
		};
	 	reqUrl += '&new=' + JSON.stringify(reqObj);

		if (!tags.blank()) {
			var tagsObj = {
				"0":{
					"url": encodeURIComponent(url),
					"tags": encodeURIComponent(tags)
				}
			};                  
			reqUrl += '&update_tags=' + JSON.stringify(tagsObj);
		}

		chrome.extension.getBackgroundPage().console.debug("submitting URL: " + reqUrl); 
		xhr.open("GET", reqUrl, true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				console.log(xhr.status);
				console.log(xhr.responseText);
				callback(xhr.status, xhr.responseText);
			}
		}
		xhr.send();
	}
});
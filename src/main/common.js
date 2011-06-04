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

var INITIALIZED_KEY = 'initialized';
var USERNAME_KEY = "username";
var PASSWORD_KEY = "password";   

var RIL_URL_UNREAD = "http://www.readitlaterlist.com/unread";

function isInitialized() {
	var initialized = localStorage[INITIALIZED_KEY];
	return !initialized ? false: true;
}

function isLoginConfigured() {
	var storedUsername = localStorage[USERNAME_KEY];
	var storedPassword = localStorage[PASSWORD_KEY];
	return (!storedUsername || !storedPassword) ? false : true;
}            

function closeTabIfConfigured(tab){
	if(localStorage.close_tab === 'true'){
		chrome.tabs.remove(tab.id, 
			function() { console.debug("closed tab" + tab.url); }
		);              
	}
}    

function shouldCloseTabs() {     
	if (localStorage.close_tab == 'true') {
		return true;
	} else {
		return false;
	}
}          

var defaultTabCloseHandler = function(tab) {
	//console.debug('called tabclosehandler');
	if (!shouldCloseTabs()) {
		return;
    }
	 
	if (tab.pinned == true) { //pinned only available in Chrome 9+
		return;
	}          

	chrome.tabs.remove(tab.id, 
		function() { console.debug("closed tab: " + tab.url); }
	);	
}
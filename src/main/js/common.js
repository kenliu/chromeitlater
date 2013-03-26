/*
	Copyright 2013 Kenneth Liu.

	This file is part of posthoc.

    posthoc is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    any later version.

    posthoc is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with posthoc.  If not, see <http://www.gnu.org/licenses/>.
*/

var INITIALIZED_KEY = 'initialized';
var USERNAME_KEY = "username";
var PASSWORD_KEY = "password";

var POCKET_QUEUE = "http://www.getpocket.com/queue";

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

	if (tab.pinned == true) {
		return;
	}

	chrome.tabs.remove(tab.id,
		function() { console.debug("closed tab: " + tab.url); }
	);
}
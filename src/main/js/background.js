/*
	Copyright 2012 Kenneth Liu.

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

/* called when the browser button is clicked */
function addTab() {
	chrome.tabs.getSelected(null,
		function(tab) {
			console.debug(tab);
			//FIXME this doesn't seem to work
			if (tab.url == "chrome://newtab/") {
				console.debug('opening RIL unread page')
				chrome.tabs.update(tab.id, {url: POCKET_QUEUE});
			} else {
				addWithBadgeIndicator(tab.url, tab.title, defaultTabCloseHandler);
			}
		}
	);
}

function addWithBadgeIndicator(url, title, tabCloseHandler) {
	chrome.browserAction.setBadgeBackgroundColor({color: [255, 215, 0, 255]}); //goldenrod
	chrome.browserAction.setBadgeText({text: "..."});
	//TODO show different icon on failure
	chrome.browserAction.setTitle({"title": "posthoc"});
	add(localStorage.username, localStorage.password, url, title, null,
		function(status, responseText) {
			if (status == 200) {
				chrome.browserAction.setBadgeBackgroundColor({color: [0, 205, 0, 255]}); //green 3
				chrome.browserAction.setBadgeText({text: "OK"});
				setTimeout(resetBadgeText, 1500) //clear badge after timeout
				chrome.tabs.getSelected(null,
				 	function(tab) {
						tabCloseHandler(tab);
					}
				);
			} else {
				chrome.browserAction.setBadgeBackgroundColor({color: [220, 20, 60, 255]}); //crimson
				chrome.browserAction.setBadgeText({text: " X "});
				chrome.browserAction.setTitle({"title": "Error: " + responseText});
				//TODO set icon background color
				//TODO parse common responses (e.g. authentication error) and display a more informative message to the user
			}
		}
	);

}

function addFromContextMenu(info, tab) {
	if (info.linkUrl) { //right-clicked on a link
		//TODO figure out how to fetch title of target instead of just URL
		//TODO check for http or https and error appropriately
		console.debug('right-clicked URL: ' + info.linkUrl);
		addWithBadgeIndicator(info.linkUrl, info.linkUrl, function() {});
	}
	else { //right-clicked on page
		console.debug('right-clicked on page: ' + info.pageUrl);
		addWithBadgeIndicator(info.pageUrl, tab.title, defaultTabCloseHandler);
	}
	//TODO deal with frames
}

function init(){
	console.info('initializing extension');
	chrome.browserAction.onClicked.addListener(addTab); //set callback for button click
	initPopup();
	initContextMenu();
}

function initPopup(){
	if (localStorage.add_instantly === 'true') {
		chrome.browserAction.setPopup({"popup": ''});
	} else {
		chrome.browserAction.setPopup({"popup": 'popup.html'});
	}
}

function initContextMenu() {
	chrome.contextMenus.create({
		"title": "Save to Pocket",
		"contexts": ["page", "link"],
		"onclick": addFromContextMenu
	});
}

function resetBadgeText() {
	chrome.browserAction.setBadgeText({text: ''})
}

$(init);

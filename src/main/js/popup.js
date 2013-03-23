/* 
	Copyright 2012 Kenneth Liu.
 
	This file is part of QuickPocket.

    QuickPocket is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 2 of the License, or
    any later version.

    QuickPocket is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with QuickPocket.  If not, see <http://www.gnu.org/licenses/>.
*/ 
   
    //TODO store the current page in a global var
	var CURRENT_PAGE = 1;
	var BG = chrome.extension.getBackgroundPage();
	
	function loaded() {
		$('#prev_page').click(prevPage);
		$('#next_page').click(nextPage);
		$('#save-btn').click(save);

		chrome.browserAction.setTitle({"title": "QuickPocket"}); //reset tooltip in case it is showing an error
		if (!isInitialized() || !isLoginConfigured()) {
			chrome.tabs.create({'url': 'options.html'}, null);
			window.close();
			return;
		}		

   		populateForm();
		loadRecentlySaved(); //TODO make this async       
		
	}
	         
	function populateForm() {
		chrome.tabs.getSelected(null,
			function(tab) { 
				//console.debug(tab);
				title.value = tab.title;
				url.value = tab.url;
			}
		);			
	}

	function save() {
		var urlval = url.value;
		var titleval = title.value;
		var tagsval = tags.value;
		popup_container.innerHTML = '<div class="popup_message">Saving URL...</div>';

		//TODO this is starting to look like lisp!
		chrome.tabs.getSelected(null, 
			function(tab) {
				sendNewURL(localStorage.username, localStorage.password, urlval, titleval, tagsval,
					function (status, responseText) {
						if (status == '200') {
							popup_container.innerHTML = '<div class="popup_message"><b>Page saved successfully.</b></div>';
							closeTabIfConfigured(tab);
						} 
						else {                                     
							//TODO handle error code here
							popup_container.innerHTML = '<div class="popup_message"><b>Error saving page</b><br/><small>' + responseText + '</small></div>';
						}
						window.setTimeout(function() { window.close(); }, 1500);
					}
				);
			}
		);
	}         

	function loadRecentlySaved() {		        
		// hide prev navigation if on first page
		$('#prev_page').css('visibility', (CURRENT_PAGE == 1) ? 'hidden' : 'visible');
		
		get(localStorage.username, localStorage.password, { 'page': CURRENT_PAGE }, 
			function(xhr) {
				var response = JSON.parse(xhr.responseText);
				var urls = response.list;
				
                if (!$.isArray(urls)) { //RIL API returns an empty array if there are no more pages                    
                    //JSON.parse does not respect the order of the urls returned so we sort by time_added
					var sorted = _(urls).sortBy(function(url){ return url.time_added; }).reverse();
					$('#recent_urls').html(renderRecentlySaved(sorted));   		
				} else {
					CURRENT_PAGE--; //not very elegant way to prevent from paging forward
				}         
			}
		);		
		//TODO hide next button on last page
	}
    
	function nextPage(){
		CURRENT_PAGE++;
		loadRecentlySaved();
	}
	
	function prevPage(){
		if (CURRENT_PAGE > 1) {
			CURRENT_PAGE--;         
		}
		loadRecentlySaved(); 
	}    

	function renderRecentlySaved(items, number){   	
        var lis = _(items).map(function(link){       
			var linktext = (link.title != "") ? link.title : (link.url.substring(0, Math.min(50, link.url.length))); //show URL if no title, truncate if necessary
        	return '<li><a title="' + link.url + '" href="' + link.url + '" target="new">' + linktext + '</a></li>';
		});
		var html = _(lis).reduce(function(memo, it){ return memo + it }, '<ul class="recent_urls">') + '</ul>';
        //console.log(html); 
		return html;
	}                           
	
	function saveAll(){
		chrome.tabs.getAllInWindow(null, function(tabs) {
			sendUrls(localStorage.username, localStorage.password, tabs, null, function() {
				//close tabs on successful submission
				_.each(tabs, function(tab) {
					defaultTabCloseHandler(tab); 
				});
				//TODO check for pinned tabs
			});
		});
	}

		// $(document).ready(function(){
	// 	$('save-all').click(saveAll);
 // 	})

$(loaded);


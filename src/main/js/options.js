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
var CLOSE_TAB_KEY = "close_tab";
var ADD_INSTANTLY = "add_instantly";

function saveOptions() {
    //TODO trim before saving?  

    if (!username.value || !password.value) {
        flashError('Please enter your <a href="http://www.getpocket.com">Pocket</a> username and password.');
        return;
    }

    localStorage[USERNAME_KEY] = username.value;
    localStorage[PASSWORD_KEY] = password.value;
    localStorage[CLOSE_TAB_KEY] = close_tab_when_added.checked;
    localStorage[ADD_INSTANTLY] = add_instantly.checked;

    //console.debug('saved: ' + username.value + '/' + password.value);
    
    chrome.extension.getBackgroundPage().initPopup();
    flash('Options saved.');
}

function loaded(){
    if (!checkFreshInstall()) checkLoginInfo();
    restoreOptions();
}

function restoreOptions() {
    var storedUsername = localStorage[USERNAME_KEY];
    var storedPassword = localStorage[PASSWORD_KEY];
    if (!storedUsername || !storedPassword) return;
    username.value = storedUsername;
    password.value = storedPassword;
    close_tab_when_added.checked = localStorage[CLOSE_TAB_KEY] === 'true' ? true : false;
    add_instantly.checked = localStorage[ADD_INSTANTLY] === 'true' ? true : false;
}

function checkFreshInstall() {
    if (!isInitialized()) {
        showWelcomeMessage();
        localStorage[INITIALIZED_KEY] = 'true';
        return false;
    } else return true; 
}

function checkLoginInfo() {
    if (!isLoginConfigured()) {
        flash('Enter your <a href="http://getpocket.com">Pocket</a> account login information below to start using this extension. <br/>(<a href="http://getpocket.com/signup/">I need an account</a>)');
        return false;
    } else return true;
}

function showWelcomeMessage() {
    flash('It looks like this extension was just installed.<br/> If you haven\'t already, you\'ll need to <a href="http://getpocket.com/signup/">sign up</a> for a <a href="http://www.getpocket.com">Pocket</a> account before you can use this extension. Once you have an account, enter your login information below.');
}

function flash(message) {
    //TODO fadeout then in if flash is already visible (i.e. save was already clicked once)
    //if (flashDiv.style.display != 'none') Effect.Fade('flash', { duration: 0.25 });
    $('#flash').html(message).addClass('flashMessage').fadeIn(500);
}

function flashError(message) {    
    //TODO corner case - if the green message is already displayed, addClass() doesn't work as expected
    $('#flash').html(message).addClass('flashError').fadeIn(500);
}
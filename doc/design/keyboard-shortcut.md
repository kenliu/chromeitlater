
- configuration options for keyboard shortcuts


How to implement shortcut
-------------------------
Email Mar 17, crx list:
"You can inject a content script in all possible pages, listen for the
ctrl+tab keypress, call event.preventDefault(), then do whatever
action you want. I know preventDefault will prevent many browser
actions such as <F11> for fullscreen, etc. (I haven't explicitly
tested for ctrl+tab)"

http://code.google.com/chrome/extensions/content_scripts.html                                


Shortcut list
--------------
- Save/remove current page: alt-W
- Open/Close Reading List: alt-Q

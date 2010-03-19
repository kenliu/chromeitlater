JSON response from server
-------------------------
"item_id":"935812"		    // unique id identifying the url
         "url":"http://google.com",
         "title":"Google",
         "time_updated":"1245626956",       // time the item was last added/changed
         "time_added":"1245626956",	    // time item was added to list
         "tags":"comma,seperated,list",
         "state":"1",                       // 0=unread, 1=read

                  
database definitions
====================
                    
item
-----
id int pk
url text
title text
time_updated integer
time_added integer
synced_date text
tags text
state integer
timestamp text?
modified text?

text
----
id int pk

timestamp text?
modified text?
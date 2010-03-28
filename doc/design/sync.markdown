syncing design
==============

use cases
---------
1. Adds are cached and can be sent to server asynchronously
2. Changes on the server are synced locally 
3. Locally saved??????
4. List can be viewed offline
5. Already saved urls are indicated by a different (red, checked?) icon

future use cases
----------------
1. enhanced local browsing of list (sorting, tagging, categorizing)
2. enable offline reading
3. enable offline saving

1. Basic usage





issues to consider
------------------
- what is the reference time for urls?
Since local time is not reliable and not guaranteed to be the same as the RIL server, we can't set timestamps locally. The best thing to do is to queue locally created URLs and then refetch them from the server after they have been added.

                           
- what is the "complete" attribute in the response from the "get" call?
- how to reliably sync using a javascript timer?
- should web workers be used for syncing?   


- what is max number of items? maybe they should be compressed?
- how to deal with conflicts?
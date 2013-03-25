Steps for release
=================
1. update version on options page
1. update version in manifest
1. push final changes to github
1. test on target versions: windows xp, windows 7, mac, linux
1. update readme.txt
1. update gallery-description.txt with changelog
1. tag git version
1. push tag to github
1. push master/branch to github
1. create zip file for upload (TODO: automate, zip from tag?) cd src/main; zip -r ../../builds/posthoc-0.2.1.zip *
1. update description in extensions gallery
1. create screencast for new features (optional)
1. upload new extension
1. test downloaded extension on target versions: windows, mac, linux
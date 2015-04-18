// ==UserScript==
// @name         Triangularize
// @version      0.1
// @author       Angivare
// @description  TRIANGLES
// @match        http://*.jeuxvideo.com/*
// @grant        none
// ==/UserScript==

$.getScript('https://rawgit.com/Angivare/triangles/master/triangles.js', function() {
    var c = $('#content')
    c.css('background', 'initial')
    new Triangles(c[0])
    console.log('Triangles loaded')
})

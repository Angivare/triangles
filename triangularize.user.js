// ==UserScript==
// @name         Triangularize
// @version      0.1
// @author       Angivare
// @description  TRIANGLES
// @match        http://*.jeuxvideo.com/*
// @grant        none
// ==/UserScript==

function TRIANGULARIZE() {
  var c = $('#content')
  c.css('background', 'initial')
  TRIANGLES = new Triangles(c[0])
}

$.getScript('https://rawgit.com/Angivare/triangles/master/triangles.js', function() {
  TRIANGULARIZE()
  console.log('Triangles loaded')
})

addEventListener('instantclick:newpage', function() {
  TRIANGLES.untie()
  TRIANGULARIZE()
})

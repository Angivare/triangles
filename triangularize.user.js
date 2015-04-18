// ==UserScript==
// @name         Triangularize
// @version      0.1
// @author       Angivare
// @description  TRIANGLES
// @match        http://*.jeuxvideo.com/*
// @grant        none
// ==/UserScript==

function TRIANGULARIZE() {
  $('#content').css('background', 'rgba(0,0,0,0)')
  TRIANGLES = new Triangles(document.body)
}

$.getScript('https://rawgit.com/Angivare/triangles/master/triangles.js', function() {
  TRIANGULARIZE()
  console.log('Triangles loaded')
})

addEventListener('instantclick:newpage', function() {
  TRIANGLES.untie()
  TRIANGULARIZE()
})

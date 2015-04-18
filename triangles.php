<!doctype html>
<?php $v = $_SERVER['QUERY_STRING'] ? base64_decode($_SERVER['QUERY_STRING']) : 'SCROLL'; ?>
<html>
  <head>
    <style>
      html {
        height: 100%;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      } body {
        min-height: 200%;
        margin: 0;
      }
      .hollow {
        width: 0;
        display: hidden;
        height: 720px;
      }
      #bg {
        height: 100%;
      }
      #txt-container {
        display: table;
        width: 100%; height: 100%;
        position: fixed;
      }
      #txt-container div {
        display: table-cell;
        vertical-align: middle;
        text-align: center;
        cursor: default;

        color: white;
        font-family: 'helvetica neue', 'helvetica', arial, sans-serif;
        font-size: 96px;
        text-shadow: 5px 5px 5px #333;
      }
    </style>
  </head>
  <body>
    <div id="txt-container">
      <div><?= $v ?></div>
    </div>
    <div class="hollow"></div>
    <div class="hollow"></div>
  </body>

  <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
  <script src="http://angiva.re/shitpost/triangles.js"></script>
  <script>

$(document).ready(function() {
  new Triangles($('body')[0])
})

$(document).on('scroll', checkScroll)

function checkScroll() {
  if($(document).height() - ($(window).scrollTop() + $(window).height()) < 200)
    $('body').append($('<div class="hollow">'))
}

  </script>
</html>


/*
  In fill_doc(), you can change width/height functions for
  inner/outer functions, depending on your uses
*/

var Triangles = function(el, w, n) {
  n = n ? n : 6
  this.bg = document.createElement('div')
  this.w = w ? w : 100
  this.h = this.w*Math.sqrt(3/4)
  this.W = 1+this.w+(n*2+1)*(this.w/2-1)
  this.H = 1+this.h+(n*2+1)*(this.h-1)
  this.cov_sz = {left: 0, top: 0, right: 0, bottom: 0}

  if(!el.childNodes.length) {
    var ghost = document.createElement('span')
    ghost.style.display = 'none'
    el.appendChild(ghost)
  }

  el.insertBefore(this.bg, el.firstChild)
  this.bg.style.position = 'absolute'
  this.bg.style.zIndex = '-1'
  this.bg.style.marginLeft = -this.w/2 + 'px'
  this.bg.style.overflow = 'hidden'

  var tri = this
  $(window).on('resize.TRIANGLES', function() {
    tri.fill_doc()
  })

  this.mutation_observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(m) {
      if(m.target == tri.bg || $.contains($(tri.bg),$(m.target))) return
      tri.fill_doc()
    })
  })
  this.mutation_observer.observe(document, {
    childList: true,
    subtree: true
  })

  this.fill_doc()
}

Triangles.COLORS = [
  '#FA6E69',
  '#FFCE74',
  '#97D17A',
  '#4C8DA6',
  '#5B608C',
]

Triangles.prototype.untie = function() {
  $(window).off('resize.TRIANGLES')
  this.mutation_observer.disconnect()
}

Triangles.prototype.color = function() {
  return Triangles.COLORS[Math.floor(Math.random()*Triangles.COLORS.length)]
}

Triangles.prototype.draw = function(c, x, y, o) {
  var p = 0

  if(o) p = [
    x, y+this.h,
    x+this.w, y+this.h,
    x+this.w/2, y
  ]; else p = [
    x, y,
    x+this.w, y,
    x+this.w/2, y+this.h
  ]


  c.fillStyle = this.color()
  c.beginPath()
  c.moveTo(p[0],p[1])
  c.lineTo(p[2],p[3])
  c.lineTo(p[4],p[5])
  c.closePath()
  c.fill()
}

Triangles.prototype.fill_canvas = function(c) {
  for(var y = 0, a = false; y + this.h < c.canvas.height; y += this.h - 1) {
    a = !a
    for(var x = 0, b = a; x + this.w < c.canvas.width; x += this.w/2 - 1) {
      b = !b
      this.draw(c, x, y, b)
    }
  }
}

Triangles.prototype.new_canvas = function(x, y) {
  var c = document.createElement('canvas')
  c.style.position = 'absolute'
  c.style.zIndex = '-1'
  c.style.left = x + 'px'
  c.style.top = y + 'px'
  this.bg.appendChild(c)
  c = c.getContext('2d')

  c.canvas.width = this.W
  c.canvas.height = this.H

  this.fill_canvas(c)
}

Triangles.prototype.bound = function(b) {
  return {
    left: Math.min(this.cov_sz.left, b.left),
    top: Math.min(this.cov_sz.top, b.top),
    right: Math.max(this.cov_sz.right, b.right),
    bottom: Math.max(this.cov_sz.bottom, b.bottom)
  }
}

Triangles.prototype.contains = function(b) {
  return b.left >= this.cov_sz.left && b.right <= this.cov_sz.right
      && b.top >= this.cov_sz.top && b.bottom <= this.cov_sz.bottom
}

Triangles.prototype.fill = function(b) {
  var r_canvas = {left: 0, top: 0, right: 0, bottom: 0}
  for(var y = b.top; y + this.H < b.bottom; y += this.H - 2)
    for(var x = b.left; x + this.W < b.right; x += this.W - this.w/2 - 2) {
      var r_canvas = {
        left:x,
        top: y,
        right: x + this.W,
        bottom: y + this.H
      }
      if(!this.contains(r_canvas))
        this.new_canvas(x, y)
    }

  this.cov_sz = this.bound(r_canvas)
}

Triangles.prototype.fill_doc = function() {
  this.bg.style.width = 0
  this.bg.style.height = 0
  var w = $(this.bg.parentNode).innerWidth() + this.w/2,
      h = $(this.bg.parentNode).innerHeight()
  this.bg.style.height = h + 'px'
  this.bg.style.width = w + 'px'
  this.fill(this.bound({
    left: 0, top: 0,
    right: w + this.W,
    bottom: h + this.H
  }))
}

/* eslint-disable */

// Import your JS library dependencies here
// import _ from 'lodash/core';

/**
 * Hello Theme Child
 * Custom Javascript
 */

// Your custom JS code goes here

/**
 * @author Nicolas Barradeau
 * http://en.nicoptere.net
 * twitter @nicoptere
 * Adapted by Drawcard: https://codepen.io/drawcard/pen/rNabQRm
 */
var ns = ns || {};

(function() {
  var c;
  var ctx;
  var trails = [];

  document.getElementById('squiggle').onload = function() {
    c = document.createElement('canvas');

    c.width = 2000;
    c.height = 2000;

    document.body.appendChild(c);

    ctx = c.getContext('2d');

    trails.push(
      new ns.trailer([
        0x006463,
        0x007e6d,
        0x00986d,
        0x3db163,
        0x73c850,
        0xaddc35,
        0xefec00,
      ])
    );
    trails.push(
      new ns.trailer([
        0xffffc8,
        0xeadba5,
        0xd4b785,
        0xbe9568,
        0xa77350,
        0x8e523b,
        0x74332a,
      ])
    );
    trails.push(
      new ns.trailer([
        0xffff9f,
        0xf3eb8e,
        0xe6d87d,
        0xdac56d,
        0xcdb25e,
        0xbfa050,
        0xb28e42,
      ])
    );

    document.onmousedown = reset;
    reset();
    setInterval(compute, 0);
  };

  function reset() {
    ctx.fillStyle = '#f1f3f5';
    ctx.fillRect(0, 0, c.width, c.height);
    for (var i = 0; i < trails.length; i++) {
      trails[i].reset();
    }
  }

  function compute() {
    for (var i = 0; i < trails.length; i++) {
      trails[i].compute(ctx);
    }
  }
})();

ns.trailer = function(colors) {
  this.points = [];
  this.stroke = new ns.stroke(null, 100, 10, colors[0]);

  this.colorIterator = 0;
  this.colors = colors;
};

ns.trailer.prototype = {
  reset: function() {
    this.points = [];

    this.width = document.body.offsetWidth;
    this.height = document.body.offsetHeight;

    // Position of the scribbles
    this.radius = Math.max(this.width, this.height);
    this.center = new ns.point(this.width / 2, this.height / 2);

    this.a0 = Math.random(1, 5);
    this.a1 = Math.random(1, 5);
    this.a2 = Math.random(1, 5);

    // Curve smoothness
    var mul = 1 + Math.random() * 0.1;

    if (Math.random() > 0.5) mul *= 5;
    else mul /= 2;

    // Invisible points on which the strokes orbit
    // mul / [num]  -> larger [num] = slower overall speed

    this.s0 = mul / 100;
    this.s1 = mul / 200;
    this.s2 = mul / 300;
  },
  compute: function(ctx) {
    with (this) {
      a0 += this.s0;
      a1 += this.s1;
      a2 += this.s2;

      // centrepoint paths
      var c = Math.sin(a0) * Math.cos(a1) * Math.sin(a2);
      // stroke paths
      var s = Math.cos(a0) * Math.sin(a1) * Math.cos(a2);

      points.push(new ns.point(center.x + c * radius, center.y + s * radius));

      // Brush texture
      if (points.length > 30) points.shift();

      stroke.anchors = points;
      stroke.draw(ctx);

      // Stroke properties
      var t = 0.5 + Math.sin(new Date().getTime() * 0.001) * 2;
      stroke.color = colors[Math.floor(t * colors.length)];
      stroke.width = 25 + (1 - t) * 50;
      stroke.strokeCount = 5;
    }
  },
};

ns.point = function(x, y) {
  this.x = x;
  this.y = y;
};

ns.point.prototype = {
  add: function(p) {
    return new ns.point(this.x + p.x, this.y + p.y);
  },
  sub: function(p) {
    return new ns.point(this.x - p.x, this.y - p.y);
  },
  negate: function() {
    this.x *= -1;
    this.y *= -1;
    return this;
  },
  clone: function() {
    return new ns.point(this.x, this.y);
  },
  length: function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  normalize: function(scale) {
    scale = scale || 1;
    var l = this.length();
    this.x /= l;
    this.x *= scale;
    this.y /= l;
    this.y *= scale;
    return this;
  },
};

ns.stroke = function(anchors, width, strokeCount, color) {
  this.anchors = anchors;
  this.width = width;
  this.strokeCount = strokeCount;
  this.color = color;
};

ns.stroke.prototype = {
  normal: function(p0, p1) {
    return new ns.point(-(p1.y - p0.y), p1.x - p0.x);
  },
  draw: function(ctx) {
    if (this.anchors == undefined) return;

    var half = this.height * 0.5;
    var p, c, n, pnorm, pln, prn, cnorm, cln, crn;

    with (this) {
      for (var j = 0; j < strokeCount; j++) {
        half = width * 0.2 * Math.random();
        var col = ns.variation(color, 35);
        ctx.lineWidth = 0.1 + Math.random() * 2;

        for (var i = 20; i < anchors.length - 2; i++) {
          p = anchors[i];
          c = anchors[i + 1];
          n = anchors[i + 2];

          pnorm = normal(p, c);
          cnorm = normal(c, n);

          half += Math.random() - 0.5;
          pnorm.normalize(half);
          pln = p.add(pnorm);

          pnorm.normalize(-half);
          prn = p.add(pnorm);

          half += Math.random() - 0.5;
          cnorm.normalize(half);
          cln = c.add(cnorm);

          cnorm.normalize(-half);
          crn = c.add(cnorm);

          ctx.beginPath();

          ctx.strokeStyle = col;
          ctx.moveTo(prn.x, prn.y);
          ctx.lineTo(crn.x, crn.y);
          ctx.stroke();

          ctx.closePath();

          ctx.beginPath();

          ctx.strokeStyle = col;
          ctx.moveTo(pln.x, pln.y);
          ctx.lineTo(cln.x, cln.y);
          ctx.stroke();

          ctx.closePath();
        }
      }
    }
  },
};

ns.variation = function(color, amount) {
  amount = amount || 25;
  var r = (color >> 16) & 0xff;
  var g = (color >> 8) & 0xff;
  var b = color & 0xff;

  r += Math.floor((Math.random() - 0.5) * amount);
  g += Math.floor((Math.random() - 0.5) * amount);
  b += Math.floor((Math.random() - 0.5) * amount);

  r = r > 0xff ? 0xff : r < 0 ? 0 : r;
  g = g > 0xff ? 0xff : g < 0 ? 0 : g;
  b = b > 0xff ? 0xff : b < 0 ? 0 : b;

  return 'rgba(' + r + ',' + g + ',' + b + ',' + Math.random() + ');';
};

(function($) {
  // Your custom jQuery code goes in here
})(jQuery);

/**
 * pong.js - Attempt at mimicking http://js1k.com/2010-first/demo/41.
 */

/* Nab the canvas and context. */
var c = document.getElementById('pong');
var ctx = c.getContext('2d');

/* Constants. */
const
  keyA = 'A'.charCodeAt(),
  keyQ = 'Q'.charCodeAt(),
  keyL = 'L'.charCodeAt(),
  keyP = 'P'.charCodeAt(),

  ineq = [ Compare.lte, Compare.gte ],

  minSpeed = 0.75,
  maxSpeed = 1.25,
  accelScale = 0.25
;

/* Globals and object definitions. */
var sign, keydown, p, ball;
var dim, ballSize, paddleWidth, paddleLength, textPos;

function Player(corner, color, keyPlus, keyMinus) {
  this.corner = corner;
  this.color = color;
  this.keyPlus = keyPlus;
  this.keyMinus = keyMinus;
  this.offset = 0;
  this.score = 0;
}

function Ball(theta) {
  var theta = theta || 2 * Math.PI * Math.random();
  this.x = 0;
  this.y = 0;
  this.vx = Math.cos(theta)
  this.vy = Math.sin(theta);
}

function resizeCanvas() {
  // Adjust height to aspect ratio.
  c.style.width = '100%';
  c.style.width = c.clientWidth - 2 + 'px';
  c.style.height = Math.round(0.5625 * c.offsetWidth) + 'px';
  c.width = c.clientWidth;
  c.height = c.clientHeight;

  // Reset variables.
  dim = 0.375 * c.width;
  ballSize = 0.02 * c.width;
  paddleWidth = 0.0125 * c.width;
  paddleLength = 0.075 * c.width;
  textPos = 0.35 * c.width;
}

// Resize now and set resize handler.
window.onload = resizeCanvas;
window.onresize = resizeCanvas;
resizeCanvas();

// Click to initialize and play.
c.onclick = (function() {
  // Initialize global state.
  sign = 1;
  keydown = {};
  p = [new Player(-dim/2, solarized.violet, keyA, keyQ),
       new Player(dim/2, solarized.cyan, keyL, keyP)];
  ball = new Ball();

  // Initialize keydown data.
  keydown[keyA] = 0;
  keydown[keyQ] = 0;
  keydown[keyL] = 0;
  keydown[keyP] = 0;

  // Event handler for keyup and keydown.
  var keyEventHandler = (function(ev) {
    if (ev.keyCode != keyA && ev.keyCode != keyQ &&
        ev.keyCode != keyL && ev.keyCode != keyP) {
      return true;
    }
    keydown[ev.keyCode] = (ev.type == 'keydown') ? 2 : 0;
    return false;
  });

  // Register our event handlers.
  c.onclick = (function() { sign = -sign; });
  document.onkeydown = keyEventHandler;
  document.onkeyup = keyEventHandler;

  // Center our context and set the font.
  ctx.translate(c.width / 2, c.height / 2);
  ctx.font = 'bold 48pt sans-serif';

  // Render the initial scores.
  ctx.textAlign = 'right';
  ctx.fillStyleText('0', -textPos, 0, p[0].color);
  ctx.textAlign = 'left';
  ctx.fillStyleText('0', textPos, 0, p[1].color);

  // Render the gameboard in a loop.
  refresh();
});

function refresh() {
  var i, signAdj;

  // Clear the board.
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, c.width / 2, c.height / 2);
  ctx.clearRectCenter(0, 0, c.height, c.height);
  ctx.restore();

  // Render the board.
  ctx.rotate(sign * 1/250);
  ctx.fillRectCenter(0, 0, dim, dim, '#ddd');

  // Move and render ball.
  ball.x += ball.vx;
  ball.y += ball.vy;
  ctx.fillRectCenter(ball.x, ball.y, ballSize, ballSize, '#aaa');

  for (i = 0; i < 2; ++i) {
    // Sign adjustment; +1 for Player 1, -1 for Player 2.
    signAdj = 1 - 2 * i;

    // Move and render paddles.
    p[i].offset = p[i].offset + keydown[p[i].keyPlus] - keydown[p[i].keyMinus];
    p[i].offset = Math.max(0, Math.min(dim - paddleLength, p[i].offset));

    ctx.fillRectSym(
      p[i].corner - !i * paddleWidth,
      p[i].corner - i * paddleLength + signAdj * p[i].offset,
      paddleWidth, paddleLength, p[i].color
    );

    // Collision detection.
    detectCollision(i, 'x', 'y');
    detectCollision(i, 'y', 'x');
  }

  // Re-render every 15 ms.
  window.setTimeout(refresh, 15);
}

function detectCollision(i, x, y) {
  var signAdj, vx, vy, speed;

  signAdj = 1 - 2 * i;
  vx = 'v' + x;
  vy = 'v' + y;

  // Check whether the ball hit an edge...
  if (ineq[i](ball[x] - signAdj * ballSize/2, p[i].corner)) {
    var yRel = signAdj * (ball[y] - p[i].corner);

    // ...and whether it struck a paddle.
    if (yRel >= p[i].offset - ballSize/2 &&
        yRel <= p[i].offset + paddleLength + ballSize/2) {
      // It did; reflect the ball.
      ball[vx] = -ball[vx];

      // Add some randomized speedup/slowdown if the paddle was moving.
      if (keydown[p[i].keyPlus]) {
        ball[vy] += signAdj * accelScale * Math.random();
      } else if (keydown[p[i].keyMinus]) {
        ball[vy] -= signAdj * accelScale * Math.random();
      }

      // Scale down the ball's speed if necessary.
      speed = ball[vx] * ball[vx] + ball[vy] * ball[vy];
      if (speed < minSpeed || speed > maxSpeed) {
        // TODO: Scale down.
      }
    } else {
      // It didn't; mark a point for the scoring player.
      i = 0 + !i;
      signAdj = 1 - 2 * i;
      p[i].score++;

      // Render scores.
      ctx.textAlign = i ? 'left' : 'right';
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, c.width / 2, 0);
      ctx.clearRect(-signAdj * c.width / 2 - i * (c.width - c.height) / 2, 0,
                    (c.width - c.height) / 2, c.height);
      ctx.fillStyleText(p[i].score, -signAdj * textPos, c.height / 2, p[i].color);
      ctx.restore();

      // Get a new ball!
      ball = new Ball();
    }
  }
}

/**
 * canvas.js - Extensions to CanvasRenderingContext2D.
 */

/**
 * ctx.clear - Clears the canvas, preserving the current context transformation
 * if desired.
 */
CanvasRenderingContext2D.prototype.clear =
  CanvasRenderingContext2D.prototype.clear || function (preserveTransform) {
    if (preserveTransform) {
      this.save();
      this.setTransform(1, 0, 0, 1, 0, 0);
    }

    this.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (preserveTransform) {
      this.restore();
    }
};

/**
 * ctx.fillStyleText - Wrapper around setting fillStyle and calling fillText().
 */
CanvasRenderingContext2D.prototype.fillStyleText =
  CanvasRenderingContext2D.prototype.fillStyleText ||
  function (text, x, y, style) {
    this.fillStyle = style || this.fillStyle;
    this.fillText(text, x, y);
};

/**
 * ctx.fillStyleRect - Wrapper around setting fillStyle and calling fillRect().
 */
CanvasRenderingContext2D.prototype.fillStyleRect =
  CanvasRenderingContext2D.prototype.fillStyleRect ||
  function (x, y, width, length, style) {
    this.fillStyle = style || this.fillStyle;
    this.fillRect(x, y, width, length);
};

/**
 * ctx.fillRectCenter - Fill and style a rectangle, with x and y as its
 * center instead of one vertex.
 */
CanvasRenderingContext2D.prototype.fillRectCenter =
  CanvasRenderingContext2D.prototype.fillRectCenter ||
  function (x, y, width, length, style) {
    this.fillStyleRect(x - width/2, y - length/2, width, length, style);
};

/**
 * ctx.fillRectSym - Fill a rectangle and its reflection across y = x.
 */
CanvasRenderingContext2D.prototype.fillRectSym =
  CanvasRenderingContext2D.prototype.fillRectSym ||
  function (x, y, width, length, style) {
    this.fillStyleRect(x, y, width, length, style);
    this.fillStyleRect(y, x, length, width, style);
};

/**
 * ctx.clearRectCenter - Clear a rectangle with x and y as its center instead
 * of one vertex.
 */
CanvasRenderingContext2D.prototype.clearRectCenter =
  CanvasRenderingContext2D.prototype.clearRectCenter ||
  function (x, y, width, length) {
    this.clearRect(x - width/2, y - length/2, width, length);
};

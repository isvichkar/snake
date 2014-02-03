// Now it's just a rectangle with all the same squares. But later barriers can be added and goals!
(function () {
  window.snakeNS = window.snakeNS || {};
  var Point = window.snakeNS.Point,
    skinProvider = window.snakeNS.skinProvider,
    SquareType = window.snakeNS.squareType;

  window.snakeNS.MainGrid.prototype.drawSnake = function (ctx, snake, width, height) {
    var xIndex, yIndex,
      dx = width / this.xCount,
      dy = height / this.yCount,
      squareType;

    ctx.save();

    for (xIndex = 0; xIndex < this.xCount; xIndex++) {
      if (xIndex > 0) {
        ctx.translate(dx, 0);
      }
      ctx.save();
      for (yIndex = 0; yIndex < this.yCount; yIndex++) {
        if (yIndex > 0) {
          ctx.translate(0, dy);
        }
        squareType = getSquareType(new Point(xIndex, yIndex), snake);
        renderSquare(ctx, squareType, dx, dy);
      }
      ctx.restore();
    }

    ctx.restore();
  };

  function getSquareType (squarePoint, snake) {
    if (snake.isHead(squarePoint)) {
      return SquareType.snakeHead;
    }

    if (snake.isInBody(squarePoint, snake)) {
      return SquareType.snakeBody;
    }

    return SquareType.normal;
  }

  function renderSquare(canvasContext, squareType, width, height) {
    switch (squareType) {
      case SquareType.normal:
        skinProvider.drawGridSquare(canvasContext, width, height);
        break;
      case SquareType.snakeBody:
        skinProvider.drawSnakeBodySquare(canvasContext, width, height);
        break;
      case SquareType.snakeHead:
        skinProvider.drawSnakeHeadSquare(canvasContext, width, height);
        break;
      default:
        throw new Error("Unexpected grid square type:" + squareType);
    }
  };

})();



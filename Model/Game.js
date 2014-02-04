// contains a snake.
// consumes settings: a grid, a speed.
// provides a keyboard listener.
// can get a move callback to notify about moves (controller will pass a render method there)
// provides an interface for starting/pausing/resuming a game.
// handles a timer for moves.

(function () {
  window.snakeNS = window.snakeNS || {};
  var Point = window.snakeNS.Point;
  var Direction = window.snakeNS.Direction;

  window.snakeNS.Game = function (settings, stepCallback) {
    var stepInterval = settings && settings.stepInterval ? settings.stepInterval : 500, // In ms.
      xCount = settings && settings.xCount ? settings.xCount : 20,
      yCount = settings && settings.yCount ? settings.yCount : 20,
      mainGrid = new window.snakeNS.MainGrid(xCount, yCount),
      snake = new window.snakeNS.Snake(
        new Point(2, yCount - 1),
        [new Point(0, yCount - 1), new Point(1, yCount - 1)],
        window.snakeNS.Direction.right),
      stepTimer = null,
      commandTypeToDirectionMap = {
        'up': Direction.up,
        'down': Direction.down,
        'left': Direction.left,
        'right': Direction.right
      };

    var step = function () {
      var moveResult = snake.move(mainGrid);
      stepCallback(moveResult, mainGrid, snake);
      stepTimer = window.setTimeout(step, stepInterval);
    };

    // Its a point for a game control.
    this.handleCommand = function (command) {
      if (commandTypeToDirectionMap.hasOwnProperty(command.type)) {
        snake.changeDirection(commandTypeToDirectionMap[command.type]);
      }
    };

    this.startGame = function () {
      stepTimer = window.setTimeout(step, stepInterval);
    };

    this.stopGame = function () {
      if (stepTimer) {
        window.clearTimeout(stepInterval);
        stepInterval = null;
      }
    };
  }
})();


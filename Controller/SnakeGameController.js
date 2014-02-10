(function () {
  window.snakeNS = window.snakeNS || {};
  var Game = window.snakeNS.Game;
  var DesktopKeyboard = window.snakeNS.DesktopKeyboard;

  var workingCanvas;

  function stepHandler(moveResult, mainGrid, snake) {
    mainGrid.drawSnake(workingCanvas.getContext('2d'), snake, workingCanvas.width, workingCanvas.height);
    console.log('Render');
  }

  var settings = {
    xCount: 10,
    yCount: 10,
    stepInterval: 300 //in ms
  };

  var game;
  var keyboard;

  window.snakeNS.controller = {
    setUpGame: function (xCount, yCount) {
      if (!isNaN(xCount)) {
        settings.xCount = xCount;
      }
      if (!isNaN(yCount)) {
        settings.yCount = yCount;
      }

      workingCanvas = document.getElementById('workingCanvas');
      snakeNS.drawingUtils.setCanvasSizeFromStyles(workingCanvas);

      game = new Game(settings, stepHandler);
      keyboard = new DesktopKeyboard();
      keyboard.attach(window.document.body);
      keyboard.addListener(game.handleCommand);
    },
    startGame: function () {
      game.startGame();
    },
    stopGame: function () {
      if (game != null) {
        game.stopGame();
        game = null;
      }
      if (keyboard != null) {
        keyboard.removeListener(game.handleCommand);
        keyboard.detach();
        keyboard = null;
      }
    }
  };

})();

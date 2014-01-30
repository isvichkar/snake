// contains a snake.
// consumes settings: a grid, a speed.
// provides a keyboard listener.
// can get a move callback to notify about moves (controller will pass a render method there)
// provides an interface for starting/pausing/resuming a game.
// handles a timer for moves.

(function(){
    window.snakeNS = window.snakeNS || {};
    window.snakeNS.Game = function(settings, stepCallback){
        var stepInterval = settings && settings.stepInterval ? settings.stepInterval : 1000, // In ms.
            snake = new window.snakeNS.Snake(
                new window.snakeNS.Point(0, 0),
                null,
                window.snakeNS.Direction.down),
            mainGrid = new window.snakeNS.MainGrid(
                settings && settings.xCount ? settings.xCount : 20,
                settings && settings.yCount ? settings.yCount : 20),
            stepTimer = null;

        var step = function(){
            var moveResult = snake.move(mainGrid);
            stepCallback(moveResult, mainGrid, snake);
            stepTimer = window.setInterval(step, stepInterval);
        };

        // Its a point for a game control.
        this.handleCommand = function(command){
            command(snake);
        };

        this.startGame = function(){
            stepTimer = window.setInterval(step, stepInterval);
        };

        this.stopGame = function(){
            if (stepTimer) {
                window.clearInterval(stepInterval);
                stepInterval = null;
            }
        };
    }
})();


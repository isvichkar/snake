// Now it's just a rectangle with all the same squares. But later barriers can be added and goals!
(function(){
    window.snakeNS = window.snakeNS || {};
    window.snakeNS.MainGrid = function(pXCount, pYCount){
        this.xCount = pXCount;
        this.yCount = pYCount;
    };

    var Point = window.snakeNS.Point;


    window.snakeNS.MainGrid.prototype.inspectPoint = function(point){
        if (! point instanceof Point){
            throw new Error('MainGreed: Unable to inspect the point: ' + point + ' . Must be a valid Point object.')
        }

        var boundariesExceeded =
            point.x < 0 ||
            point.y < 0 ||
            point.x >= this.xCount ||
            point.y >= this.yCount;

        return {
            outOfBoundaries: boundariesExceeded,
            barrier: false,
            goal: false
        };
    };

    window.snakeNS.MainGrid.prototype.render = function(snake){
        if (! snake instanceof )
    }
})();

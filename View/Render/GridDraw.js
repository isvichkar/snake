(function(){
    var MainGrid = window.snakeNS.MainGrid;
    MainGrid.prototype.render = function(){

    };
})();

MainGrid.prototype.render = function(canvasContext){
	var renderSquare = function(canvasContext, squareType){
		switch(squareType){
			case squareType.normal: renderNormalSquare(canvasContext);
			case squareType.snakeBody: renderSnakeBody(canvasContext);
			case squareType.snakeHead: renderSnakeHead(canvasContext);
		}
	}

	var renderNormalSquare = function(canvasContext){
		
	}

	var renderSnakeBody = function(canvasContext){

	}

	var renderSnakeHead = function(canvasContext){

	}
}
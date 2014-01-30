(function(){
	window.snakeNS = window.snakeNS || {};

	window.snakeNS.Point = function(x, y){
		this.x = x;
		this.y = y;
	};

	window.snakeNS.Point.prototype.moveUp = function(){
		this.y--;
		return this;
	}

	window.snakeNS.Point.prototype.moveDown = function(){
		this.y++;
		return this;
	}

	window.snakeNS.Point.prototype.moveLeft = function(){
		this.x--;
		return this;
	}

	window.snakeNS.Point.prototype.moveRight = function(){
		this.x++;
		return this;
	}

	window.snakeNS.Point.prototype.move = function(direction){
		switch(direction){
			case window.snakeNS.Direction.up: return this.moveUp();
				break; 
			case window.snakeNS.Direction.down: return this.moveDown();
				break; 
			case window.snakeNS.Direction.left: return this.moveLeft();
				break;
			case window.snakeNS.Direction.right: return this.moveRight();
				break; 
			default: throw new Error('Unknown direction: ' + (typeof direction === 'undefined' ? 'undefined' : '"' + direction + '"'));
				break;
		};		
	};

	window.snakeNS.Point.prototype.equals = function(anotherPoint){
		return (this.x == anotherPoint.x) && (this.y == anotherPoint.y);
	};

	window.snakeNS.Point.prototype.getDirectionByPoints = function(secondPoint){
		var xDiff = this.x - secondPoint.x;
		var yDiff = this.y - secondPoint.y;

		if (yDiff === 0){
			if (xDiff > 0) return window.snakeNS.Direction.right;
			if (xDiff < 0) return window.snakeNS.Direction.left;
		};

		
		if (xDiff === 0){
			if (yDiff > 0) return window.snakeNS.Direction.down;
			if (yDiff < 0) return window.snakeNS.Direction.up;
		}
	};

	window.snakeNS.Point.prototype.getPointByDirection = function(direction) {
		var xDiff = 0, yDiff = 0;
		switch(direction){
			case window.snakeNS.Direction.up: yDiff = -1; 
				break; 
			case window.snakeNS.Direction.down: yDiff = 1;
				break; 
			case window.snakeNS.Direction.left: xDiff = -1;
				break;
			case window.snakeNS.Direction.right: xDiff = 1;
				break;
			default: throw new Error("Incorrect direction: " + direction);
				break; 	
		}
		return new window.snakeNS.Point(this.x + xDiff, this.y + yDiff);
	};

	window.snakeNS.Point.prototype.clone = function(){
		return new window.snakeNS.Point(this.x, this.y);
	};

	window.snakeNS.Point.prototype.toString = function(){
		return '{x: ' + this.x + ', y: ' + this.y + '}';
	};		
})();




(function(){
    window.snakeNS = window.snakeNS || {};
    var Point = window.snakeNS.Point;
    var Direction = window.snakeNS.Direction;

    window.snakeNS.Snake =  function(head, body, direction){
		var _myself			= this,
		_headPosition		= head instanceof Point ? head: new Point(0, 0),
		_bodyPoints			= getInitialBody(body),
		_currentDirection	= typeof direction === 'string' && direction.isValidDirectionValue() ? direction : Direction.down;

		// Changes the direction of a snake.
		this.changeDirection = function(newDirection){
			if (newDirection.isValidDirectionValue()){
				_currentDirection = newDirection;
			}
		};

		// Makes a snake bigger adding a new head to it in the specified direction.
		this.addNewHead = function(grid){
			var newHead = _headPosition.getPointByDirection(_currentDirection);
            if (newHead.x < 0 || newHead.y < 0 || grid && (newHead.x >= grid.xCount || newHead.y >= grid.yCount)){
                throw new Error("Unable to add a new head - the border would be exceeded");
            }

			if (!_headPosition.equals(_bodyPoints[0])){
				_bodyPoints.splice(0, 0, new Point(_headPosition.x, _headPosition.y));
				_headPosition = newHead;
			}
		};

		this.getLength = function(){
			return (_bodyPoints ? _bodyPoints.length : 0) + 1;
		};

		// Moves a snake a one point in the current direction.
		// If the move was correct - returns true, otherwise - false.
		this.move = function(grid){
			var headBackup = new Point(_headPosition.x, _headPosition.y);
			_headPosition.move(_currentDirection);

			// the opposite direction was requested.
			if (_bodyPoints.length > 0 && _headPosition.equals(_bodyPoints[0])){
				_headPosition = _bodyPoints[_bodyPoints.length - 1];

				var newBodyPoints = [];
				for (var i = _bodyPoints.length - 2, j = 0; i >= 0; i--){
					newBodyPoints[j++] = _bodyPoints[i];
				}
				newBodyPoints[j] = headBackup;
				_bodyPoints = newBodyPoints;
				_currentDirection = _headPosition.getDirectionByPoints(_bodyPoints[0]);
			}

			var moveCorrect = checkMove(grid);

			// re-arrange the body.
			if (moveCorrect && _bodyPoints.length > 0) {
                _bodyPoints.unshift(new Point(headBackup.x, headBackup.y));
                _bodyPoints.length--;
			}
            else {
                _headPosition = headBackup;
            }
			return moveCorrect;
		};

		this.stringify = function(){
			return '{ head: ' + _headPosition + '; body: ' + _bodyPoints + '; direction: ' + _currentDirection +'}';
		};

		function checkMove(grid){
			return !bumpedIntoWall(grid) && !bumpedIntoSelf();
		}

		function bumpedIntoWall(grid){
			var result = grid.inspectPoint(_headPosition);
			return result;				
		}

		// if a head has moved to any body point except for the last one.
		function bumpedIntoSelf(){
			var result = false;
			for (var i = 0; i < _bodyPoints.length - 1 && !result; i++){
				result = _headPosition.equals(_bodyPoints[i]);
			}
			return result;
		};

		// If a body param is an array of Points - get it as is,
		// if it is one point - wrap it into array with one element,
		// otherwise - get new empty array.
		function getInitialBody(body){
			if (Array.isArray(body)){
				if (body.every(function(item){ 
						return item instanceof Point; })){
					return body;
				}
			}
			else if (body instanceof Point){
				return [body];
			}

			return [];
		};
	};

	 window.snakeNS.Snake.prototype.toString = function(){
 		return this.stringify();
	 };
})();
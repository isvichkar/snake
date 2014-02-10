(function () {
  window.snakeNS = window.snakeNS || {};
  var Point = window.snakeNS.Point;
  var Direction = window.snakeNS.Direction;

  window.snakeNS.Snake = function (head, body, direction, checkMoveProcessor) {
    var _myself = this,
      _headPosition = Point.isPoint(head) ? head : new Point(0, 0),
      _bodyPoints = getInitialBody(body),
      _currentDirection = typeof direction === 'string' && direction.isValidDirectionValue() ? direction : Direction.down,
      _checkMoveProcessor = checkMoveProcessor;

    // Changes the direction of a snake.
    this.changeDirection = function (newDirection) {
      if (newDirection.isValidDirectionValue()) {
        _currentDirection = newDirection;
      }
    };

    // Makes a snake bigger adding a new head to it in the specified direction.
    this.addNewHead = function (grid) {
      var newHead = _headPosition.getPointByDirection(_currentDirection);
      if (newHead.x < 0 || newHead.y < 0 || grid && (newHead.x >= grid.xCount || newHead.y >= grid.yCount)) {
        throw new Error("Unable to add a new head - the border would be exceeded");
      }

      if (!_headPosition.equals(_bodyPoints[0])) {
        _bodyPoints.splice(0, 0, new Point(_headPosition.x, _headPosition.y));
        _headPosition = newHead;
      }
    };

    this.getLength = function () {
      return (_bodyPoints ? _bodyPoints.length : 0) + 1;
    };

    this.isHead = function(point) {
      return _headPosition.equals(point);
    };

    this.isInBody = function(point) {
      var result = false;
      if (_bodyPoints) {
        result = _bodyPoints.some(function (bodyPoint) {
          return point.equals(bodyPoint);
        });
      }
      return result;
    };


    function checkMove () {
      var moveResult = {
        movePossible: true,
        status: 'Move',
        message: 'Ordinary move'
      };

      if (bumpedIntoSelf()) {
        moveResult.movePossible = false;
        moveResult.status = 'BumpedIntoSelf';
        moveResult.message = 'Bumped into self';
      } else {
        if (typeof _checkMoveProcessor === 'function') {
          moveResult = _checkMoveProcessor(new Point(_headPosition.x, _headPosition.y));
        }
      }

      return moveResult;
    }

    // Moves a snake a one point in the current direction.
    // Returns the result of move
    this.move = function () {
      var headBackup = new Point(_headPosition.x, _headPosition.y),
          isOppositeDirection;

      _headPosition.move(_currentDirection);
      isOppositeDirection = _bodyPoints.length > 0 && _headPosition.equals(_bodyPoints[0]);

      // the opposite direction was requested.
      if (isOppositeDirection) {
        _headPosition = _bodyPoints[_bodyPoints.length - 1];

        var newBodyPoints = [];
        for (var i = _bodyPoints.length - 2, j = 0; i >= 0; i--) {
          newBodyPoints[j++] = _bodyPoints[i];
        }
        newBodyPoints[j] = headBackup;
        _bodyPoints = newBodyPoints;
        _currentDirection = _headPosition.getDirectionByPoints(_bodyPoints[0]);
      }

      var moveResult = checkMove();

      // re-arrange the body.
      if (!isOppositeDirection){
          if (moveResult.movePossible === true && _bodyPoints.length > 0) {
            _bodyPoints.unshift(new Point(headBackup.x, headBackup.y));
            _bodyPoints.length--;
          }
          else {
            _headPosition = headBackup;
          }
      }
      return moveResult;
    };

    this.stringify = function () {
      return '{ head: ' + _headPosition + '; body: ' + _bodyPoints + '; direction: ' + _currentDirection + '}';
    };

    // if a head has moved to any body point except for the last one.
    function bumpedIntoSelf () {
      var result = false;
      for (var i = 0; i < _bodyPoints.length - 1 && !result; i++) {
        result = _headPosition.equals(_bodyPoints[i]);
      }
      return result;
    };

    // If a body param is an array of Points - get it as is,
    // if it is one point - wrap it into array with one element,
    // otherwise - get new empty array.
    function getInitialBody (body) {
      if (Array.isArray(body)) {
        if (body.every(Point.isPoint)) {
          return body;
        }
      }
      else if (body instanceof Point) {
        return [body];
      }

      return [];
    }
  };

  window.snakeNS.Snake.prototype.toString = function () {
    return this.stringify();
  };
})();
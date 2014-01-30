(function(){
    window.snakeNS = window.snakeNS || {};
    window.snakeNS.Direction = {
    	get up() {return 'Up'},
    	get down() {return 'Down'},
    	get left() {return 'Left'},
    	get right() {return 'Right'}
    };

    Object.prototype.isValidDirectionValue = function(){
		var result = false;
		for (var key in window.snakeNS.Direction) if (window.snakeNS.Direction.hasOwnProperty(key)) {
			if (this == window.snakeNS.Direction[key]){
				result = true;
				break;
			}
		}
		return result;
	}
})();

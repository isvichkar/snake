(function(){
    window.snakeNS = window.snakeNS || {};
    window.snakeNS.TestHelper = function(){

    	var myInstance = this;    	

    	if(!window.snakeNS.TestHelper.instance){
    		myInstance.addTextLineToElement = function(elemId, textLine){
				var elem = document.getElementById(elemId);
				elem.innerHTML = elem.innerHTML + textLine + '<br/>';
    		};
    		window.snakeNS.TestHelper.instance = myInstance;
    	};

    	return window.snakeNS.TestHelper.instance;
    };

    var testHelper = new window.snakeNS.TestHelper();
})();
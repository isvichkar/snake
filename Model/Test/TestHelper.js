(function () {
  window.snakeNS = window.snakeNS || {};
  window.snakeNS.TestHelper = function () {
    var myInstance = this;
    var config = {consoleElementId: 'console'};

    if (!window.snakeNS.TestHelper.instance) {
      myInstance.addTextLineToElement = function (elemId, textLine) {
        var elem = document.getElementById(elemId);
        elem.innerHTML = elem.innerHTML + textLine + '<br/>';
      };

      myInstance.config = function(prefs) {
        var prop;
        if (typeof prefs === 'object') {
          for(prop in prefs) {
            if (prefs.hasOwnProperty(prop)){
              config[prop] = prefs[prop];
            }
          }
        }
      };

      myInstance.log = function(msg) {
        this.addTextLineToElement(config.consoleElementId, msg);
      };

      window.snakeNS.TestHelper.instance = myInstance;
    }

    return window.snakeNS.TestHelper.instance;
  };

  var testHelper = new window.snakeNS.TestHelper();
})();
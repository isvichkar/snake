(function () {
  window.snakeNS = window.snakeNS || {};
  var Keyboard = window.snakeNS.Keyboard;
  var Command = window.snakeNS.Command;

  window.snakeNS.DesktopKeyboard = function() {
  };

  window.snakeNS.DesktopKeyboard.prototype = Object.create(new Keyboard());

  window.snakeNS.DesktopKeyboard.prototype.attach = function(element) {
    if (!element instanceof HTMLElement) {
      throw new Error('Cannot attach the desktop keyboard to an object that is not HTMLElement');
    }

    this._element = element;
    listenKeyDownEvent(element);
    element.keyboard = this;
  };

  window.snakeNS.DesktopKeyboard.prototype.detach = function() {
    var element = this._element;
    if (element) {
      unListenKeyDownEvent(element);
      this._element = null;
      delete element.keyboard;
    }
  };

  function listenKeyDownEvent(element) {
    listenEvent(element, 'keydown', onKeyDown);
  }

  function unListenKeyDownEvent(element) {
    unListenEvent(element, 'keydown', onKeyDown);
  }

  function listenEvent(element, eventName, handler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + eventName, handler);
    }
  }

  function unListenEvent(element, eventName, handler) {
    if(element.removeEventListener) {
      element.removeEventListener(eventName, handler, false);
    } else if (element.detachEvent()) {
      element.detachEvent("on" + eventName, handler);
    }
  }

  function onKeyDown(event) {
    var command;
    if (event.keyCode === 37) { // left arrow
      command = Command.createCommandLeft();
    } else if (event.keyCode === 38) { // up arrow
      command = Command.createCommandUp();
    } else if (event.keyCode === 39) { // right arrow
      command = Command.createCommandRight();
    } else if (event.keyCode === 40) { // down arrow
      command = Command.createCommandDown();
    }
    if (command) {
      this.keyboard.notifyListeners(command);
    }
  }

})();
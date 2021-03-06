/**
 * Created with IntelliJ IDEA.
 * User: Eugene
 * Date: 2/26/13
 * Time: 10:02 PM
 * To change this template use File | Settings | File Templates.
 */

// declare observers list - notify them when a key is pressed
(function () {
  window.snakeNS = window.snakeNS || {};

  window.snakeNS.Keyboard = function () {
    this.listeners = [];
  };

  window.snakeNS.Keyboard.prototype.addListener = function (listener) {
    this.listeners.push(listener);
  };

  window.snakeNS.Keyboard.prototype.removeListener = function (listener) {
    var index = this.listeners.indexOf(listener);
    this.listeners.splice(index, 1);
  };

  window.snakeNS.Keyboard.prototype.notifyListeners = function (command) {
    this.listeners.forEach(function (listener) {
      if (typeof listener === 'function') {
        listener(command);
      }
    });
  }
})();

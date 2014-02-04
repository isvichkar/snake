(function () {
  window.snakeNS = window.snakeNS || {};
  window.snakeNS.Command = function(type, data) {
    this.type = type;
    this.data = data;
  };

  window.snakeNS.Command.createCommandUp = function (data) {
    return new window.snakeNS.Command('up', data);
  };

  window.snakeNS.Command.createCommandDown = function (data) {
    return new window.snakeNS.Command('down', data);
  };

  window.snakeNS.Command.createCommandLeft = function (data) {
    return new window.snakeNS.Command('left', data);
  };

  window.snakeNS.Command.createCommandRight = function (data) {
    return new window.snakeNS.Command('right', data);
  };

  window.snakeNS.Command.prototype.equals = function (anotherCommand) {
    if (typeof anotherCommand === 'string') {
      return this.type === anotherCommand;
    }

    return anotherCommand != null && this.type === anotherCommand.type;
  }

})();
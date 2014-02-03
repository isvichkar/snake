(function () {
  window.snakeNS = window.snakeNS || {};

  window.snakeNS.skinProvider = {
    drawSnakeHeadSquare: function (ctx, width, height) {
      var borderWidth = 15,
        borderColor = '#ffff00',
        outerBorderWidth = 2,
        outerBorderColor = 'black';

      var fillGradient = ctx.createLinearGradient(0, 0, width, height);
      fillGradient.addColorStop(0, '#990000');
      fillGradient.addColorStop(0.5, '#ff0000');
      fillGradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = fillGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(0, 0, width, height);

      ctx.strokeStyle = outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.strokeRect(0, 0, width, height);
    },
    drawSnakeBodySquare: function (ctx) {

    },
    drawGridSquare: function (ctx, width, height) {
      var borderWidth = 15,
        borderColor = '#aaffaa',
        outerBorderWidth = 2,
        outerBorderColor = 'black';

      var fillGradient = ctx.createLinearGradient(0, 0, width, height);
      fillGradient.addColorStop(0, '#009900');
      fillGradient.addColorStop(0.5, '#00ff00');
      fillGradient.addColorStop(1, '#ffffff');

      ctx.fillStyle = fillGradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.strokeRect(0, 0, width, height);

      ctx.strokeStyle = outerBorderColor;
      ctx.lineWidth = outerBorderWidth;
      ctx.strokeRect(0, 0, width, height);
    }
  };

})();

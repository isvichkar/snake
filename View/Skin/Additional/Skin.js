(function(){
    window.snakeNS = window.snakeNS || {};
    window.snakeNS.skinProvider = {
        drawSnakeSquare: function(ctx){
            var borderWidth = 15, borderColor = '#aaffaa', outerBorderWidth = 2, outerBorderColor = 'black';

            var fillGradient = ctx.createRadialGradient(0, 0, ctx.canvas.width, ctx.canvas.width, ctx.canvas.height, ctx.canvas.width/4);
            fillGradient.addColorStop(0, '#009900');
            fillGradient.addColorStop(0.5, '#00ff00');
            fillGradient.addColorStop(1, '#ffffff');

            ctx.fillStyle = fillGradient;

            ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;

            ctx.strokeRect(0,0,ctx.canvas.width, ctx.canvas.height);

            ctx.strokeStyle = outerBorderColor;
            ctx.lineWidth = outerBorderWidth;

            ctx.strokeRect(0,0,ctx.canvas.width, ctx.canvas.height);
        }   
    };    
})();
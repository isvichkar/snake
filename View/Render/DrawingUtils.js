(function(){
    window.snakeNS = window.snakeNS || {};

    snakeNS.drawingUtils = {
        setCanvasSizeFromStyles: function(canvasEl){
            if (window.getComputedStyle){
                var newW = window.parseInt(window.getComputedStyle(canvasEl, "").width, 10);
                var newH = window.parseInt(window.getComputedStyle(canvasEl, "").height, 10);

                if (!isNaN(newW) && canvasEl.width !== newW){
                    canvasEl.width = newW;
                }

                if (!isNaN(newH) && canvasEl.height !== newH){
                    canvasEl.height = newH;
                }
            }
        }
    };
})();
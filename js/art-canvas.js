var cacheArtCanvas, cacheArtCanvasCtx;

function initArtCanvas(){
    //initCacheCanvas();

    var artCanvasList = document.getElementsByClassName("art-canvas");

    for(var i = 0; i < artCanvasList.length; i++){
        switch(artCanvasList[i].nodeName){
            case "CANVAS":
                if (typeof settings !== 'undefined'){
                    if (settings.hasOwnProperty("generateArtCanvasOnSpawn"))
                        if (settings["generateArtCanvasOnSpawn"])
                            generateArtCanvas(artCanvasList[i]);
                    else
                        console.error("settings does not have generateArtCanvasOnSpawn data set");
                }else
                    console.log("No settings found, not running generateArtCanvas by default.");
                break;
            case "BUTTON":
                initArtButton(artCanvasList[i]);
                break;
            default:
                console.error(artCanvasList[i] + " is not a valid art-canvas element! \n[Valid types are canvas & button]");
                break;
        }
    }
}

function initCacheCanvas(){
    cacheArtCanvas = documet.createElement("canvas");
    cacheArtCanvasCtx = cacheArtCanvas.getContext("2d");
    
    cacheArtCanvas.width = 400;
    cacheArtCanvas.height = 400;
}

function initArtButton(button){
    button.addEventListener("click", function(){
        generateArtCanvas(document.getElementById(button.dataset.bind));
    });
}

function generateArtCanvas(canvas){
    if (canvas.nodeName != "CANVAS"){
        console.error(canvas + " was passed onto the generator, but can not generate as it is not a canvas element.");
        return;
    }
    
    var ctx = canvas.getContext("2d");

    ctx.translate(40, 40);
    DrawDiamond(ctx, 20, 20);
}

function DrawDiamond(ctx, width, height){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,height/2);
    ctx.lineTo(0,height);
    ctx.lineTo(-width,height/2);
    ctx.closePath();
    ctx.stroke();
}
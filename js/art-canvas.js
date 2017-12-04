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

    var color = new Color(255, 0, 0);
    DrawCube3D(ctx, 40, 40, 20, 20, 0.4, color);
}

function DrawCube3D(ctx, x, y, width, height, lineThicknessScale, color){
    ctx.save();
    ctx.translate(x, y);

    ctx.lineWidth = width * lineThicknessScale;
    DrawCube3DOutline(ctx, width, height * 0.58);
    ctx.stroke();

    DrawDiamond(ctx, width, height * 0.58);
    ctx.fillStyle = color.toHex();
    ctx.fill();

    ctx.rotate((Math.PI / 180) * 120);
    DrawDiamond(ctx, width, height * 0.58);
    color.Scale(0.6);
    ctx.fillStyle = color.toHex();
    ctx.fill();

    ctx.rotate((Math.PI / 180) * 120);
    DrawDiamond(ctx, width, height * 0.58);
    color.Scale(0.6);
    ctx.fillStyle = color.toHex();
    ctx.fill();

    ctx.restore();
}

function DrawCube3DOutline(ctx, width, height){
    ctx.save();

    ctx.beginPath();
    ctx.moveTo(width, height);
    ctx.lineTo(0, height * 2);
    ctx.rotate((Math.PI / 180) * 120);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height * 2);
    ctx.rotate((Math.PI / 180) * 120);
    ctx.lineTo(width, height);
    ctx.lineTo(0, height * 2);
    ctx.closePath();

    ctx.restore();
}

function DrawDiamond(ctx, width, height){
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(width,height);
    ctx.lineTo(0,height * 2);
    ctx.lineTo(-width,height);
    ctx.closePath();
}

class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.Scale = function(f) {
            this.r = Math.max(0, Math.min(255, this.r * f));
            this.g = Math.max(0, Math.min(255, this.g * f));
            this.b = Math.max(0, Math.min(255, this.b * f));
        };

        this.toHex = function(){
            return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
        }
    }
}

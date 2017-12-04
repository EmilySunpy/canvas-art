var cacheArtCanvas, cacheArtCanvasCtx;

var canvasArtSettings = {};
var defaultCanvasArtSettings = {
    amount: 100,
    minScale: 20,
    maxScale: 100,
    lineThickness: 40,
    colors: [
        "#ff0000",
        "#777777"
    ]
};

function initArtCanvas(){
    //initCacheCanvas();

    var artCanvasList = document.getElementsByClassName("art-canvas");

    for(var i = 0; i < artCanvasList.length; i++){
        switch(artCanvasList[i].nodeName){
            case "CANVAS":
                if(!canvasArtSettings.hasOwnProperty(artCanvasList[i].id))
                    canvasArtSettings[artCanvasList[i].id] = Object.assign({}, defaultCanvasArtSettings);
                
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
            case "INPUT":
                initArtInput(artCanvasList[i]);
                break;
            default:
                console.error(artCanvasList[i] + " is not a valid art-canvas element! \n[Valid types are canvas, button & input]");
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

function initArtInput(input){
    input.addEventListener("change", function(){
        var value = Math.max(parseInt(input.min), parseInt(input.value));

        if(!canvasArtSettings.hasOwnProperty(input.dataset.bind))
            canvasArtSettings[input.dataset.bind] = Object.assign({}, defaultCanvasArtSettings);

        if(canvasArtSettings[input.dataset.bind].hasOwnProperty(input.dataset.bindtype))
            canvasArtSettings[input.dataset.bind][input.dataset.bindtype] = value;
        else
            console.error(input.dataset.bindtype + " is not a valid setting name!");
    });
}

function generateArtCanvas(canvas){
    if (canvas.nodeName != "CANVAS"){
        console.error(canvas + " was passed onto the generator, but can not generate as it is not a canvas element.");
        return;
    }

    var artSettings = canvasArtSettings[canvas.id];

    var dataColors = canvasArtSettings[canvas.id]["colors"];
    var colors = [];
    for(var i = 0; i < dataColors.length; i++)  //Make into color objects
        colors[i] = hexToColor(dataColors[i]);

    var ctx = canvas.getContext("2d");

    //Clear old image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i = 0; i < artSettings["amount"]; i++){
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var scale = Math.random() * (artSettings["maxScale"] - artSettings["minScale"]) + artSettings["minScale"];
        var rotation = (Math.PI / 180) * Math.random() * 360;
        var lineThicknessScale = artSettings["lineThickness"] / 100;

        DrawCube3D(ctx, x, y, scale, scale, rotation, lineThicknessScale, colors[Math.floor(Math.random() * colors.length)]);
    }
}

function DrawCube3D(ctx, x, y, width, height, rotation, lineThicknessScale, color){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.lineWidth = width * lineThicknessScale;
    DrawCube3DOutline(ctx, width, height * 0.57);
    ctx.stroke();

    DrawDiamond(ctx, width, height * 0.57);
    ctx.fillStyle = color.toHex();
    ctx.fill();

    ctx.rotate((Math.PI / 180) * 120);
    DrawDiamond(ctx, width, height * 0.57);
    color = color.Scale(0.6);
    ctx.fillStyle = color.toHex();
    ctx.fill();

    ctx.rotate((Math.PI / 180) * 120);
    DrawDiamond(ctx, width, height * 0.57);
    color = color.Scale(0.6);
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
            return new Color(
                Math.floor(Math.max(0, Math.min(255, this.r * f))),
                Math.floor(Math.max(0, Math.min(255, this.g * f))),
                Math.floor(Math.max(0, Math.min(255, this.b * f)))
            );
        };

        this.toHex = function(){
            return "#" + ((1 << 24) + (this.r << 16) + (this.g << 8) + this.b).toString(16).slice(1);
        }
    }
}

function hexToColor(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new Color(
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ) : null;
}
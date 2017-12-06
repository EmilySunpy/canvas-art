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
    var ctx = canvas.getContext("2d");

    //Clear old image
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    executeFunctionByName(canvas.dataset["artscript"] + ".Draw", window, canvas, artSettings);
}

//Jason Bunting: https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
function executeFunctionByName(functionName, context /*, args */) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for(var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
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

class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.add = function() {
            switch (arguments.length) {
                default:
                    throw new Error("Invalid params");
                    return null;
                case 1:
                    var x = this.x + arguments[0].x;
                    var y = this.y + arguments[0].y;
                    return new Vec2(x, y);
                case 2:
                    var x = this.x + arguments[0];
                    var y = this.y + arguments[1];
                    return new Vec2(x, y);
            }
        };
        this.sub = function() {
            switch (arguments.length) {
                default:
                    throw new Error("Invalid params");
                    return null;
                case 1:
                    var x = this.x - arguments[0].x;
                    var y = this.y - arguments[0].y;
                    return new Vec2(x, y);
                case 2:
                    var x = this.x - arguments[0];
                    var y = this.y - arguments[1];
                    return new Vec2(x, y);
            }
        };
        this.distance = function(v){
            return Math.sqrt(Math.abs(this.x - v.x) ** 2 + Math.abs(this.y - v.y) ** 2);
        };
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
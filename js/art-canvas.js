function initArtCanvas(canvas = null){
    if(canvas == null){
        var artCanvasList = document.getElementsByClassName("art-canvas");

        for(var i = 0; i < artCanvasList.length; i++){
            switch(artCanvasList[i].nodeName){
                case "CANVAS":
                    initArtCanvas(artCanvasList[i]);
                    break;
                case "BUTTON":
                    initArtButton(artCanvasList[i]);
                    break;
                default:
                    console.error(artCanvasList[i] + " is not a valid art-canvas element! \n[Valid types are canvas & button]");
                    break;
            }
        }

        return;
    }

    canvas
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
    
}
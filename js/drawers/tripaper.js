var TriPaper = {
    Draw: function(canvas, artSettings){
        var dataColors = canvasArtSettings[canvas.id]["colors"];
        var colors = [];
        for(var i = 0; i < dataColors.length; i++)  //Make into color objects
            colors[i] = hexToColor(dataColors[i]);
    
        var ctx = canvas.getContext("2d");

        //Make point array
        var points = [];
        for(var i = 0; i < artSettings["amount"]; i++){
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            
            points.push({x:x,y:y});
        }

        
    }
};
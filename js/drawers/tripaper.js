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
            
            points.push(new Vec2(x, y));
        }

        //Draw
        for(var i = 0; i < points.length; i++){
            var sorted = GetClosestVectorArray(points, i);
            ctx.beginPath();
            ctx.moveTo(sorted[0].x,sorted[0].y);
            ctx.lineTo(sorted[1].x,sorted[1].y);
            ctx.lineTo(sorted[2].x,sorted[2].y);
            ctx.closePath();
            ctx.stroke();
        }

        //Draw debug on point
        for(var i = 0; i < points.length; i++){
            ctx.beginPath();
            ctx.arc(points[i].x,points[i].y,8,0,2*Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
};

function GetClosestVectorArray(array, index){ //Optimize?
    var sorted = {};
    array.forEach(function(a){
        sorted[array[index].distance(a)] = a;
    });

    var keys = Object.keys(sorted);
    var keyFloats = [];
    keys.forEach(function(a){
        keyFloats.push(parseFloat(a));
    });

    //Sort
    keyFloats.sort(function(a,b){
        return a - b;
    });

    var sortedArray = [
        sorted[keyFloats[0]],
        sorted[keyFloats[1]],
        sorted[keyFloats[2]]
    ];

    return sortedArray;
    /*var sorted = array.sort(function(a){
        return array[index].distance(a);
    });
    return sorted;*/
}
//Sign me up!
Drawers["Cubes"] = "Cubes";

var Cubes = {
    Draw: function(canvas, artSettings){
        var dataColors = canvasArtSettings[canvas.id]["colors"];
        var colors = [];
        for(var i = 0; i < dataColors.length; i++)  //Make into color objects
            colors[i] = hexToColor(dataColors[i]);
    
        var ctx = canvas.getContext("2d");

        for(var i = 0; i < artSettings["amount"]; i++){
            var x = Math.random() * canvas.width;
            var y = Math.random() * canvas.height;
            var scale = Math.random() * (artSettings["maxScale"] - artSettings["minScale"]) + artSettings["minScale"];
            var rotation = (Math.PI / 180) * Math.random() * 360;
            var lineThicknessScale = artSettings["lineThickness"] / 100;
    
            Cubes.DrawCube3D(ctx, x, y, scale, scale, rotation, lineThicknessScale, colors[Math.floor(Math.random() * colors.length)]);
        }
    },

    DrawCube3D: function(ctx, x, y, width, height, rotation, lineThicknessScale, color){
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
    
        ctx.lineWidth = width * lineThicknessScale;
        Cubes.DrawCube3DOutline(ctx, width, height * 0.57);
        ctx.stroke();
    
        Cubes.DrawDiamond(ctx, width, height * 0.57);
        ctx.fillStyle = color.toHex();
        ctx.fill();
    
        ctx.rotate((Math.PI / 180) * 120);
        Cubes.DrawDiamond(ctx, width, height * 0.57);
        color = color.Scale(0.6);
        ctx.fillStyle = color.toHex();
        ctx.fill();
    
        ctx.rotate((Math.PI / 180) * 120);
        Cubes.DrawDiamond(ctx, width, height * 0.57);
        color = color.Scale(0.6);
        ctx.fillStyle = color.toHex();
        ctx.fill();
    
        ctx.restore();
    },

    DrawCube3DOutline: function(ctx, width, height){
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
    },

    DrawDiamond: function(ctx, width, height){
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(width,height);
        ctx.lineTo(0,height * 2);
        ctx.lineTo(-width,height);
        ctx.closePath();
    }
};
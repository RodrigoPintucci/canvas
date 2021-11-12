var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}



window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function Machine(xm, ym, dxm, dym, t) {
    this.xm = xm;
    this.dxm = dxm;
    this.ym = ym;
    this.dym = dym;
    this.t = t;

    this.draw = function(){



        c.beginPath();
        c.rect(this.xm + innerWidth/2-25, this.ym, 50, 105)
        c.fillStyle = "rgb(140,140,140)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        c.beginPath();
        c.arc(this.xm + innerWidth/2, this.ym + 200, 100, 0, Math.PI*2, true)
        c.fillStyle = "rgb(170,170,170)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        c.beginPath();
        c.arc(this.xm + innerWidth/2, this.ym +200,  75, 0, Math.PI*2, true)
        c.fillStyle = "rgb(150,150,150)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        
        c.beginPath();
        c.rect(this.xm + innerWidth/2+75, this.ym + 175, 50, 50)
        c.fillStyle = "rgb(160,160,160)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        c.beginPath();
        c.rect(this.xm + innerWidth/2-125, this.ym + 175, 50, 50)
        c.fillStyle = "rgb(160,160,160)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();

        c.beginPath();
        c.rect(0, innerHeight - 120, innerWidth, innerHeight)
        c.fillStyle = "rgb(170,170,170)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
    }
    this.update = function() {
        if (this.xm > innerWidth/2-125){
            this.dxm = -this.dxm;
            this.t += 1;
        }
        if ((this.xm - 6 <= circleArray[0].x - 30 -innerWidth/2+125) && (this.t == 1 )){
            this.dxm = 0;
            if (this.ym < circleArray[0].y - 148){
                this.ym += 3*this.dym;
            } else{
                this.t +=1;
            }
        }
        if (this.t == 2){
            if (this.ym > 0){
                this.ym -= 3*this.dym;
                circleArray[0].y -= 3*this.dym;
                circleArray[1].y -= 3*this.dym;
            } else {
                this.t +=1;
            }
        }
        if(this.t ==3){
            if (circleArray[0].g > circleArray[1].g){
                circleArray[0].x += 200;
                circleArray[1].x -=200;
                this.t = 4;
            } else{
                this.t =4;
            }
        }
        if(this.t == 4){
            if (this.ym < circleArray[2].y - 148){
                this.ym += 3*this.dym;
                circleArray[0].y += 3*this.dym;
                circleArray[1].y += 3*this.dym;
            } else{
                this.t+=1;
            }
        }
        if(this.t ==5 ){
            if(this.ym >0){
                this.ym -= 3*this.dym;
            }
        }
        this.xm+=4*this.dxm;
        console.log(this.xm, circleArray[0].x - 33.5 -innerWidth/2+125, this.ym, this.t)
        this.draw();
    }
}


function Circle(x, y, dx, dy, radius, r, g, b, a, maxRadius, minRadius, id) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.maxRadius = maxRadius;
    this.minRadius = minRadius;
    this.id = id;

    this.draw = function() {
        c.beginPath();
        c.rect(this.x-25, this.y+30, 50, 50)
        c.fillStyle = "rgb(170,170,170)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = "rgb(0,0,0)";
        c.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + "," + this.a +")";
        c.stroke();
        c.fill();
        c.beginPath();
        c.moveTo(this.x-5, this.y+50);
        c.arc(this.x-15, this.y+10, 10, 0, Math.PI, true);
        c.arc(this.x+15, this.y+10, 10, 0, Math.PI, true);
        c.lineTo(this.x+5, this.y+50);
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        
    }
    
    this.update = function() {
    
        this.draw();
    }

}




var circleArray = [];
var machineArray = [];


function init(){
    circleArray = [];
    for(var i = 0; i < 5; i++){
        var id = i + 1;
        var radius = 50;
        var x = + 150 + 200*i;
        var y = innerHeight - 200;
        var dx = (Math.random() - 0.5)*10;
        var dy = (Math.random() - 0.5)*10;
        var r = 255;
        var g = 255 * Math.random(); 
        var b = 0;
        var a = 1; 
        var maxRadius = 3*radius + Math.random() * radius;
        var minRadius = 1* radius;
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b, a, maxRadius, minRadius, id));
    }
    machineArray = [];
    var xm = 0;
    var dxm = 1;
    var ym = 0;
    var dym = 1;
    var t = 0;
    machineArray.push(new Machine(xm, ym, dxm, dym, t));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < machineArray.length; i++){
        machineArray[i].update();
    }
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    
}
init();
animate();






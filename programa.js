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

function Circle(x, y, dx, dy, radius, r, g, b, a, maxRadius, minRadius) {
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


function init(){
    circleArray = [];
    for(var i = 0; i < 5; i++){
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
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b, a, maxRadius, minRadius));
    }
    
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    c.beginPath();
    c.rect(0, innerHeight - 120, innerWidth, innerHeight)
    c.fillStyle = "rgb(170,170,170)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();

    c.beginPath();
    c.rect(innerWidth/2-25, 0, 50, 105)
    c.fillStyle = "rgb(140,140,140)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();

    c.beginPath();
    c.arc(innerWidth/2, 200, 100, 0, Math.PI*2, true)
    c.fillStyle = "rgb(170,170,170)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();

    c.beginPath();
    c.arc(innerWidth/2, 200, 75, 0, Math.PI*2, true)
    c.fillStyle = "rgb(150,150,150)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();


    c.beginPath();
    c.rect(innerWidth/2-125, 175, 50, 50)
    c.fillStyle = "rgb(160,160,160)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();

    c.beginPath();
    c.rect(innerWidth/2+75, 175, 50, 50)
    c.fillStyle = "rgb(160,160,160)";
    c.strokeStyle = "rgb(0,0,0)";
    c.stroke();
    c.fill();
}
init();
animate();






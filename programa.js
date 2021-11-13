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

function Hand(xm, ym, dxm, dym, t, k) {
    this.xm = xm;
    this.dxm = dxm;
    this.ym = ym;
    this.dym = dym;
    this.t = t;
    this.k = k;

    this.draw = function(){

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


    }
    this.update = function() {
        this.draw();
    }

}

function Machine(xm, ym, dxm, dym, t, k, h) {
    this.xm = xm;
    this.dxm = dxm;
    this.ym = ym;
    this.dym = dym;
    this.t = t;
    this.k = k;
    this.h = h;

    this.draw = function(){



        c.beginPath();
        c.rect(this.xm + innerWidth/2-25 , this.ym+ 200-this.h, 50, this.h)
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
        c.rect(0, innerHeight - 120, innerWidth, innerHeight)
        c.fillStyle = "rgb(170,170,170)";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
    }
    this.update = function() {
        if(this.t == 0) {
            this.xm += this.dxm
            handArray[0].xm += this.dxm
            if (this.xm > innerWidth/2-125) {
                this.dxm = -this.dxm;
                this.t += 1;
            }
        }
        if ((this.xm - 6 <= circleArray[this.k].x - 30 -innerWidth/2+125) && (this.t == 1 )){
            this.dxm = 0;
            if (this.ym < circleArray[this.k].y - 148){
                this.ym += 3*this.dym;
                handArray[0].ym += 3*this.dym
                this.h += 3*this.dym;
            } else{
                this.t +=1;
            }
        }
        if (this.t == 2){
            if (this.ym > 0){
                this.ym -= 3*this.dym;
                this.h -= 3*this.dym;
                handArray[0].ym -= 3*this.dym
                circleArray[this.k].y -= 3*this.dym;
                circleArray[this.k+1].y -= 3*this.dym;
            } else {
                this.t +=1;
            }
        }
        if(this.t ==3){
            if (circleArray[this.k].g > circleArray[this.k+1].g){                
                circleArray[this.k].x += 200;
                circleArray[this.k+1].x -=200;
                this.t = 4;
            } else{
                this.t =4;
            }
        }
        if(this.t == 4){
            if (this.ym < innerHeight-348){
                this.ym += 3*this.dym;
                this.h += 3*this.dym;
                handArray[0].ym += 3*this.dym
                circleArray[this.k].y += 3*this.dym;
                circleArray[this.k+1].y += 3*this.dym;
            } else{
                this.t+=1;
            }
        }
        if(this.t ==5 ){
            if (circleArray[this.k].g > circleArray[this.k+1].g){
                [circleArray[this.k], circleArray[this.k+1]] = [circleArray[this.k+1], circleArray[this.k]]
            }
            if(this.ym >0){
                this.ym -= 3*this.dym;
                this.h -= 3*this.dym;
                handArray[0].ym -= 3*this.dym
            } else{
                this.k +=1;
                this.dxm = dxm;
                this.xm += this.dxm
                handArray[0].xm += this.dxm
                if (this.k == 4){
                    if ((circleArray[0].g < circleArray[1].g)&&(circleArray[1].g < circleArray[2].g)&&(circleArray[2].g < circleArray[3].g)&&(circleArray[3].g < circleArray[4].g)){
                        this.dxm = 0;
                        this.dym = 0;
                        this.k=0;
                        this.t=7;
                        console.log('parabens')
                    } else{
                        this.k = 0;
                        this.t = 0;
                    }
                }
                this.t = 0;
            }
            
        }
        if (this.t == 7){
            this.k=0;
            this.dxm = 0;
            this.dym = 0;
        }
        console.log(this.t, this.k)
        this.xm+=4*this.dxm;
        handArray[0].xm += 4*this.dxm
        
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
var handArray = [];


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
    var k = 0;
    var h = innerHeight - 300;
    machineArray.push(new Machine(xm, ym, dxm, dym, t, k, h));
    handArray = [];
    handArray.push(new Hand(xm, ym, dxm, dym, t, k));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < machineArray.length; i++){
        machineArray[i].update();
    }
    for (var i = 0; i < handArray.length; i++){
        handArray[i].update();
    }
    for (var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
    
    
}
init();
animate();






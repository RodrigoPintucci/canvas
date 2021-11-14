var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}


WebFontConfig = {
  google: { families: ['VT323'] }
}

var wf = document.createElement("script");
wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
wf.async = 'true';
document.head.appendChild(wf);
    


window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
})

function Hand(xh, yh, dxh, dyh) {
    this.xh = xh;
    this.dxh = dxh;
    this.yh = yh;
    this.dyh = dyh;

    this.draw = function(){
        
        c.beginPath();
        c.arc(this.xh+25, this.yh + 200, 30, 0, 2*Math.PI, false)
        c.fillStyle = "#A6808C";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();


    }
    this.update = function() {
    
        this.draw();
    }

}

function Machine(xm, ym, dxm, dym, t, k, h, chao, num1, num2, num3, ar, ay, ag) {
    this.xm = xm;
    this.dxm = dxm;
    this.ym = ym;
    this.dym = dym;
    this.t = t;
    this.k = k;
    this.h = h;
    this.chao = chao;
    this.num1 = num1;
    this.num2 = num2;
    this.num3 = num3;
    this.ar = ar;
    this.ay = ay;
    this.ag = ag;
    this.draw = function(){



        c.beginPath();
        c.rect(this.xm + 75, this.ym+ 200-this.h, 50, this.h)
        c.fillStyle = "#A6808C";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        c.beginPath();
        c.rect(this.xm , this.ym + 100, 200, 200)
        c.fillStyle = "#706677";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        c.beginPath();
        c.arc(this.xm + 100, this.ym +200,  75, 0, Math.PI*2, true)
        c.fillStyle = "#565264";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();

        c.beginPath();
        c.arc(this.xm + 100, this.ym +150,  15, 0, Math.PI*2, true)
        c.fillStyle = "rgba(255,144,144,"+this.ar+")";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();

        c.beginPath();
        c.arc(this.xm + 100, this.ym +200,  15, 0, Math.PI*2, true)
        c.fillStyle = "rgba(255,255,144,"+this.ay+")";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();

        c.beginPath();
        c.arc(this.xm + 100, this.ym +250,  15, 0, Math.PI*2, true)
        c.fillStyle = "rgba(144,255,144,"+this.ag+")";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        
        


        c.beginPath();
        c.rect(0, this.chao, innerWidth, innerHeight)
        c.fillStyle = "#706677";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();

            c.fillStyle= "#565264"
    c.font = "50px VT323";
    c.fillText("Rodrigo Pintucci 2021", 20, this.chao+75);
    }
    this.update = function() {
        if(this.t == 0) {
            this.ar=1;
            this.xm += this.dxm
            handArray[0].xh += this.dxm
            handArray[1].xh += this.dxm
            if ((this.xm > circleArray[this.k].x)&&(this.xm > 0)){
                this.xm += -10*this.dxm
                handArray[0].xh += -10*this.dxm
                handArray[1].xh += -10*this.dxm
            } else{
                this.t +=1;
            }




        }
        if (this.t == 1 ){
            if (this.xm >= circleArray[this.k].x){
                this.dxm = 0;
                if (this.ym < circleArray[this.k].y - 148){
                    this.ym += 3*this.dym;
                    handArray[0].yh += 3*this.dym
                    handArray[1].yh += 3*this.dym
                    this.h += 3*this.dym;
                } else{
                    this.t +=1;
                }
            }
        }
        if (this.t == 2){
            if (this.ym > 0){
                this.ym -= 3*this.dym;
                this.h -= 3*this.dym;
                handArray[0].yh -= 3*this.dym
                handArray[1].yh -= 3*this.dym
                circleArray[this.k].y -= 3*this.dym;
                circleArray[this.k+1].y -= 3*this.dym;
            } else {
                this.t +=1;
            }
        }
        if(this.t ==3){
            this.ar = 0.3;
            if (circleArray[this.k].g > circleArray[this.k+1].g){ 
                this.ay = 1; 
                if (this.num1 > 0){
                    handArray[0].yh += handArray[0].dyh
                    handArray[1].yh -= handArray[0].dyh
                    circleArray[this.k].y += handArray[0].dyh;
                    circleArray[this.k+1].y -= handArray[0].dyh;
                    this.num1-= handArray[0].dyh
                } else if (this.num2 > 0){
                    handArray[0].xh += handArray[0].dxh
                    handArray[1].xh -= handArray[0].dxh
                    circleArray[this.k].x += handArray[0].dxh;
                    circleArray[this.k+1].x -= handArray[0].dxh;
                    this.num2-= handArray[0].dxh

                } else if(this.num3 > 0){
                    handArray[0].yh -= handArray[0].dyh
                    handArray[1].yh += handArray[0].dyh
                    circleArray[this.k].y -= handArray[0].dyh;
                    circleArray[this.k+1].y += handArray[0].dyh;
                    this.num3-= handArray[0].dyh
                }
                else{
                    [handArray[0], handArray[1]] = [handArray[1], handArray[0]]
                    this.t = 4;
                }             
            } else{
                this.t =4;
            }
        }
        if(this.t == 4){
            this.ag=1;
            this.ay=0.3;
            this.num1 = 100;
            this.num2 = 200;
            this.num3 = 100;
            if(this.k == 0){
                if (this.ym < circleArray[this.k+2].y -148){
                    this.ym += 3*this.dym;
                    this.h += 3*this.dym;
                    handArray[0].yh += 3*this.dym
                    handArray[1].yh += 3*this.dym
                    circleArray[this.k].y += 3*this.dym;
                    circleArray[this.k+1].y += 3*this.dym;
                } else{
                    this.t+=1;
                }
            }
            else if (this.k <= 3){
                if (this.ym < circleArray[this.k-1].y - 148){
                    this.ym += 3*this.dym;
                    this.h += 3*this.dym;
                    handArray[0].yh += 3*this.dym
                    handArray[1].yh += 3*this.dym
                    circleArray[this.k].y += 3*this.dym;
                    circleArray[this.k+1].y += 3*this.dym;
                } else{
                    this.t+=1;
                }
            }
        }
        if(this.t ==5 ){
            this.ar=1;
            this.ag=0.3;
            if (circleArray[this.k].g > circleArray[this.k+1].g){
                [circleArray[this.k], circleArray[this.k+1]] = [circleArray[this.k+1], circleArray[this.k]]
            }
            if(this.ym >0){
                this.ym -= 3*this.dym;
                this.h -= 3*this.dym;
                handArray[0].yh -= 3*this.dym
                handArray[1].yh -= 3*this.dym
            } else{
                this.k +=1;
                this.dxm = dxm;
                this.xm += this.dxm
                handArray[0].xh += this.dxm
                handArray[1].xh += this.dxm
                if (this.k == 4){
                    if ((circleArray[0].g < circleArray[1].g)&&(circleArray[1].g < circleArray[2].g)&&(circleArray[2].g < circleArray[3].g)&&(circleArray[3].g < circleArray[4].g)){
                        this.dxm = 0;
                        this.dym = 0;
                        this.t=7;
                        console.log('parabens')
                        this.k=0;
                    } else{
                        this.k = 0;
                        this.t = 0;
                    }
                } else{
                    this.t = 0;
                }
            }
            
        }
        if (this.t == 7){
            this.ar = 0.3;
            this.ag = 1;
            this.k=0;
            this.dxm = 0;
            this.dym = 0;
        }
        console.log(this.t, this.k)
        this.xm+=4*this.dxm;
        handArray[0].xh += 4*this.dxm
        handArray[1].xh += 4*this.dxm
        
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
        c.fillStyle = "#CCB7AE";
        c.strokeStyle = "rgb(0,0,0)";
        c.stroke();
        c.fill();
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
        c.strokeStyle = "rgb(0,0,0)";
        c.fillStyle = "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a +")";
        c.stroke();
        c.fill();
        c.beginPath();
        c.moveTo(this.x-5, this.y+50);
        c.arc(this.x-15, this.y+10, 10, 0, Math.PI, true);
        c.arc(this.x+15, this.y+10, 10, 0, Math.PI, true);
        c.lineTo(this.x+5, this.y+50);
        c.strokeStyle = "rgba(0,0,0,"+(3 - 2.5*this.a)+")";
        c.stroke();
        c.beginPath();
        c.arc(this.x-20, this.y-20, 10, Math.PI*11/8, Math.PI*8/8, true);
        c.strokeStyle = "rgba(255,255,255,"+(5*this.a - 4)+")";
        c.stroke();
        
    }
    
    this.update = function() {
    
        if (machineArray[0].t ==7){
            this.a = 1;
        }
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
        var x = innerWidth/5+ 200*i;
        var y = innerHeight - 200;
        var dx = (Math.random() - 0.5)*10;
        var dy = (Math.random() - 0.5)*10;
        var r = 255;
        var g = 255 * Math.random(); 
        var b = 96;
        var a = 0.8; 
        var maxRadius = 3*radius + Math.random() * radius;
        var minRadius = 1* radius;
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b, a, maxRadius, minRadius, id));
    }
    machineArray = [];
    var xm = 0;
    var dxm = 2;
    var ym = 0;
    var dym = 2;
    var t = 0;
    var k = 0;
    var h = innerHeight - 300;
    var chao = innerHeight - 120;
    var num1 = 100;
    var num2 = 200;
    var num3 = 100;
    var ar = 0.3;
    var ay = 0.3;
    var ag = 0.3;
    machineArray.push(new Machine(xm, ym, dxm, dym, t, k, h, chao, num1, num2, num3, ar, ay, ag));
    handArray = [];
    for (i = 0; i<2; i++){
        var xh = 200*i-25;
        var dxh = 6;
        var yh = 0;
        var dyh = 6;
        handArray.push(new Hand(xh, yh, dxh, dyh));
    }
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






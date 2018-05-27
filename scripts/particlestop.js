/*****************
  INITIALIZATION
******************/
let topDiv = document.querySelector('.top');
let topBg  = topDiv.querySelector('.top-bg');
let canvasParticlesOp = document.getElementById('particles-down');
let [topDivWidth,topDivHeight] = [top.innerWidth,top.innerHeight];






let ctx = canvasParticlesOp.getContext('2d');



/************************* 
    Particles Maker
************************/
function Particle(x,y,radius,dx,delay,opacity,opDie){
    [this.x,this.y,this.radius,this.dx,this.dy,this.delay,this.opacity,this.opDie] = [x,y,radius,dx,-dx,delay,opacity,opDie];
    this.draw = function(){
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        ctx.fill();
    }
    this.update = function(){
        if(this.delay > 0){
            this.delay -= .5;
        }else{
            this.x += this.dx;
            this.y += this.dy;
            this.opacity -= this.opDie/1000;
            this.draw();
        }
    }
}


/*************************
    Random Number Fct
***************************/
function ranNumb(min,max){
    return Number(((Math.random()*(max-min))+min).toFixed(2));
}

/**************************************
    Populate the particles array
**************************************/
//Particle array holder
let particlesArr = [];
//Particles param
let maxParticleRadius = 5;
let minParticleRadius = 2;
let maxParticlesNumber = topDivWidth*0.1;
//Create a random value for every particle
function createRandom(){
    let randomX = ranNumb(-50,topDivWidth-(maxParticleRadius*2));
    let randomRadius = ranNumb(minParticleRadius,maxParticleRadius);
    let movement = ranNumb(0.2,1);
    let delay = ranNumb(10,100);
    let opacity = ranNumb(0.5,1);;
    let opDie = ranNumb(2,4);
    return [randomX,topDivHeight+10+randomRadius,randomRadius,movement,delay,opacity,opDie];
}
//Populalte the array
for(var i = 0 ; i < maxParticlesNumber ; i++){
    particlesArr.push(new Particle(...createRandom()))
}



let colors = ['#7c1643','#492d67','#25695a','#41727f','#806020'];
let projectDiv = document.querySelector('div.projects');
let secondCanvas = document.getElementById('second');
//CANVAS INIT
let [projectWidth,projectHeight] = [projectDiv.offsetWidth,projectDiv.offsetHeight];
let particles = [];
let nParticles;

let maxSpeed = .1;

secondCanvas.width = projectWidth;
secondCanvas.height = projectHeight;

function initCanvasSize(){
    particles = [];
    nParticles = Math.floor(80 * projectWidth/1200);
    console.log(nParticles);
    [projectWidth,projectHeight] = [projectDiv.offsetWidth,projectDiv.offsetHeight];
    [topDivWidth,topDivHeight] = [top.innerWidth,top.innerHeight];
    canvasParticlesOp.height = topDivHeight;
    canvasParticlesOp.width  = topDivWidth;
    secondCanvas.width = projectWidth;
    secondCanvas.height = projectHeight;
    populateZ();
}
initCanvasSize();


let c = secondCanvas.getContext('2d');

//Circle
function ParticleSecond(x,y,radius,color,dx,dy,opacity){
    [this.x,this.y,this.radius,this.color,this.dx,this.dy,this.opacity] = [x,y,radius,color,dx,dy,opacity];
    this.draw = function(){
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
    }
    this.update = function(){
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

//populate circle
function populateZ(){
for(var i = 0 ; i < nParticles ; i++ ){
    let rX = ranNumb(0,projectWidth);
    let rY = ranNumb(0,projectHeight);
    let radius = ranNumb(2,6);
    let color = colors[Math.floor(ranNumb(0,colors.length))];
    let dx = ranNumb(-maxSpeed,maxSpeed);
    let dy = ranNumb(-maxSpeed,maxSpeed);
    particles.push(new ParticleSecond(rX,rY,radius,color,dx,dy,1));
}
}

let mooving ;
function animate(){
   
   
}



/**************************************
    ANIMATE FUNCTION (MOOOVE)
**************************************/
function animate(){
    mooving = window.requestAnimationFrame(animate);
    c.clearRect(0,0,projectWidth,projectHeight);
    ctx.clearRect(0,0,topDivWidth,topDivHeight);
    particlesArr.forEach(el=>{
        if(el.opacity < 0){
            let allRandom = createRandom();
            el.x = allRandom[0];
            el.y = allRandom[1];
            el.radius = allRandom[2];
            el.dx = allRandom[3];
            el.dy = -allRandom[3];
            el.delay = allRandom[4];
            el.opacity = allRandom[5];
            el.opDie = allRandom[6];
            
        }else{
            el.update();
        }
        
    });
    particles.forEach((el,idx)=>{
        if(el.x-30 > projectWidth || el.x+30 < 0 || el.y-30 > projectHeight || el.y+30 < 0){
            el.dx = ranNumb(-maxSpeed,maxSpeed);
            el.dy = ranNumb(-maxSpeed,maxSpeed);
            el.color = colors[Math.floor(ranNumb(0,colors.length))];
            let ranX;
            let ranY
            if(el.dx < 0){//it can not be in the left side of the dextop
                ranX = ranNumb(20,projectWidth+20);
                if(ranX>projectWidth){
                    ranY = ranNumb(20,projectHeight-20);
                }else{
                    if(el.dy<0){
                        ranY = projectHeight+20;
                    }else{
                        ranY = -20;
                    }
                }
            }else{//it can not be in the right side of the dextop
                ranX = ranNumb(-20,projectWidth-20);
                if(ranX<0){
                    ranY = ranNumb(20,projectHeight-20);
                }else{
                    if(el.dy<0){
                        ranY = projectHeight+20;
                    }else{
                        ranY = -20;
                    }
                }
            }
            el.x = ranX;
            el.y = ranY;
        }
        el.update()
    });
   
}
animate();
window.addEventListener('keydown',(e)=>{
    if(e.key=='Escape') window.cancelAnimationFrame(mooving);
})

//On resize, resize the canvas too
window.addEventListener('resize',debounce(windowResize));
function windowResize(e){
    initCanvasSize();
}
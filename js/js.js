/*****************
  INITIALIZATION
******************/
let topDiv = document.querySelector('.top');
let topBg  = topDiv.querySelector('.top-bg');
let canvasParticlesOp = document.getElementById('particles-down');
let [topDivWidth,topDivHeight] = [top.innerWidth,top.innerHeight];

function initCanvasSize(){
    [topDivWidth,topDivHeight] = [top.innerWidth,top.innerHeight];
    canvasParticlesOp.height = topDivHeight;
    canvasParticlesOp.width  = topDivWidth;
}
initCanvasSize();




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


/**************************************
    ANIMATE FUNCTION (MOOOVE)
**************************************/
let mooving ;
function animate(){
    mooving = window.requestAnimationFrame(animate);
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
   
}
animate();
window.addEventListener('keydown',(e)=>{
    if(e.key=='Escape') window.cancelAnimationFrame(mooving);
})




/*****************
 * Image Swaper
 ****************/
let images = ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b80b70ff474e7e1fb7fa4c7e17cd6d19',
    'https://images.unsplash.com/photo-1481487196290-c152efe083f5?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=f1a745f7a6165e6ab26d320ddb4be8bb',
    'https://images.unsplash.com/photo-1518773553398-650c184e0bb3?ixlib=rb-0.3.5…opy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=676e7f4…',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=ce927a31274a2b9d0574492d0352859c',
    'https://images.unsplash.com/photo-1508830524289-0adcbe822b40?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=427c2188ec017f217c7d55be9d3fe0d1',
    'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=ef78850fb6935a56d4ef04be7c13c6b3']






/******************************
 * CLICK LI TO GO TO THAT DIV
 ******************************/
let divs = [document.querySelector('div.top'),document.querySelector('div.about'),document.querySelector('div.projects'),document.querySelector('div.contact')]
let lis = document.querySelectorAll('.top ul li');
lis.forEach((el,idx)=>{
    el.addEventListener('click',(e)=>{
        if(window.scrollY != divs[idx].offsetTop){
            let pase = (divs[idx].offsetTop - window.scrollY)/200;
            window.scrollTo({
                top: divs[idx].offsetTop - 40,
                behavior: "smooth"
            });
            
            divs[idx].classList.add('active');
            
        }
    })
})













/*************************
    Window scroll
***************************/
function debounce(func,wait=20,immediate=false){
    let timeout;
    return function(){
        let context =this , args = arguments;
        let later = function(){
            timeout = null;
            if(!immediate) func.apply(context,args)
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later,wait);
        if(callNow) func.apply(context,args);
    }
}






let navUl = document.querySelector('.top ul.nav-bar');
let z = document.querySelector('.middle');

window.addEventListener('scroll',debounce(scrolling));
function scrolling(e){
    if(window.scrollY >= 30 && !navUl.classList.contains('sticky')){
        navUl.classList.add('sticky');
    }else if(window.scrollY < 30 && navUl.classList.contains('sticky')){
        navUl.classList.remove('sticky');
    }
    let scrollBottom = window.innerHeight+window.scrollY;
    divs.forEach(el=>{
        let isScrolledPass = scrollBottom > el.offsetTop+el.offsetHeight;
        if(!isScrolledPass && scrollBottom >= el.offsetTop+(el.offsetHeight*0.3)){ //wgen 30% of it is shown
            if(document.querySelector('.'+el.dataset['for']).classList.contains('active')){return}
            document.querySelector('li.active').classList.remove('active');
            document.querySelector('.'+el.dataset['for']).classList.add('active');
            
        }
    })
}


//On resize, resize the canvas too
window.addEventListener('resize',debounce(windowResize));
function windowResize(e){
    initCanvasSize();
}
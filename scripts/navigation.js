/******************************
 * CLICK LI TO GO TO THAT DIV
 ******************************/
//flag for the skills
let filled = false;
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
    divs.forEach((el,idx)=>{
        
        let isScrolledPass = scrollBottom > el.offsetTop+el.offsetHeight;
        if(!isScrolledPass && scrollBottom >= el.offsetTop+(el.offsetHeight*0.5)){ //wgen 50% of it is shown
            if(document.querySelector('.'+el.dataset['for']).classList.contains('active')){return}
            document.querySelector('li.active').classList.remove('active');
            document.querySelector('.'+el.dataset['for']).classList.add('active');
            if(!filled && idx==1){
                console.log('here');
                fillSkill();
                filled = true;
            }
        }
    })
}
scrolling();
/***************************************
 * FUNCTION THAT FILL THE SKILL CHARTS *
 ***************************************/
function fillSkill(){
    
    let liSkill = document.querySelectorAll('ul.skill-chart li');
    liSkill = Array.prototype.slice.call(liSkill).map(el=>{
        let fillChart = el.querySelector('.fill');
        let textFill = el.querySelector('.how-much');
        let toThis   = Number(fillChart.dataset.much);
        return [fillChart,textFill,toThis,0];
    })
    let fillInterval = window.setInterval(()=>{
        liSkill.forEach((el,idx)=>{
            if(el[3]==el[2]){
                if(liSkill.length==1){
                    window.clearInterval(fillInterval)
                }else{
                    liSkill.splice(idx,1);
                }
            }else{
                el[3] +=2;
                el[1].innerText = el[3] + '%';
                el[0].style.flexBasis = el[3] + '%';

            }
        })
    },80)
}


/*************************
     Burger Click
***************************/
let burger = document.querySelector('.nav-burger');
burger.addEventListener('click',burgerClicked);
function burgerClicked(e){

    let expanded = this.parentElement.dataset.expanded;
    this.parentElement.dataset.expanded = expanded=='true'?'false':'true';
}
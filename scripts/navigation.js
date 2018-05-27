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



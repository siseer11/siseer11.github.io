




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



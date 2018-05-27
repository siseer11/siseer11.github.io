let spanTextHolder = document.querySelector('span.what');

let enjoyArr = ['HTML','CSS','JavaScript','React','Photoshop'];

let addTextInterval;
let removeTxtInterval;
function changeText(text){
    let i = 0;
    let len = text.length;
    addTextInterval = window.setInterval((e)=>{
        if(i == len){
            window.clearInterval(addTextInterval);
            window.setTimeout(() => {
                console.log(i);
                removeTxtInterval = window.setInterval(()=>{
                    i--;
                    spanTextHolder.innerText = text.slice(0,i);
                    
                    if(i==0){
                        enjoyArr.push(enjoyArr.splice(0,1)[0]);
                        window.clearInterval(removeTxtInterval);
                        changeText(enjoyArr[0]);
                    }
                },70)
            }, 3000);
        }else{
            spanTextHolder.innerText += text[i];
            i++;
        }
        
    },200)
}
changeText(enjoyArr[0]);
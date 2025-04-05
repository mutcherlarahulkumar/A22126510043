


function calc(){
    const data = document.getElementById('inputText').value;
    let charCount =data.length;
    let words = 0;
    let sentences = 0;
    for(let i=0;i<data.length;i++){
        if(data[i]==' ' || data[i]=='\n')words++;
        if(data[i]=='\n')sentences++;
    }
    console.log(charCount,words+1,sentences+1);
    document.getElementById('words').innerText = (data.length>0)?words+1:0;
    document.getElementById('sentences').innerText = (data.length>0)?sentences+1:0;
    document.getElementById('character').innerText = charCount;
}

function clearText(){
    document.getElementById('inputText').value = '';
}
function appendValue(v){
    document.getElementById('display').value += v;
}

function clearDisplay(){
    document.getElementById('display').value = '';
}

function checkCode(){
    if(document.getElementById('display').value === '1234'){
        window.location = 'dashboard.html';
    }
}

function sendSOS(){

    let countdown = 5;

    let popup = document.createElement("div");

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.width = "90%";
    popup.style.maxWidth = "500px";
    popup.style.background = "#ffffff";
    popup.style.border = "5px solid red";
    popup.style.borderRadius = "20px";
    popup.style.padding = "30px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0 0 25px rgba(0,0,0,0.4)";
    popup.style.zIndex = "9999";

    popup.innerHTML = `
        <div style="font-size:80px;">🚨</div>
        <h1 style="color:red;">SOS ACTIVATED</h1>
        <h2>Sending SOS in <span id="timer">5</span> seconds...</h2>
    `;

    document.body.appendChild(popup);

    let timer = setInterval(function(){

        countdown--;

        document.getElementById("timer").innerHTML = countdown;

        if(countdown <= 0){

            clearInterval(timer);

            popup.innerHTML = `
                <div style="font-size:80px;">✅</div>
                <h1 style="color:green;">SOS Alert Sent Successfully</h1>
            `;

            setTimeout(function(){
                popup.remove();
                window.location.href = "index.html";
            },2000);
        }

    },1000);
}

function saveDiary(){
    localStorage.setItem(
        'incident_' + Date.now(),
        document.getElementById('note').value
    );
    alert('Saved');
}

function addContact(){
    localStorage.setItem(
        document.getElementById('name').value,
        document.getElementById('phone').value
    );
    alert('Added');
}

function changeLanguage(){

    let l = document.getElementById('language').value;
    let t = document.getElementById('title');
    let s = document.getElementById('sosBtn');

    if(l === 'kn'){
        t.innerHTML = 'ಸೇಫ್ ಹೋಮ್+';
        s.innerHTML = 'ತುರ್ತು ಸಹಾಯ';
    }
    else if(l === 'hi'){
        t.innerHTML = 'सेफ होम+';
        s.innerHTML = 'आपातकालीन सहायता';
    }
    else{
        t.innerHTML = 'SafeHome+';
        s.innerHTML = 'SOS ALERT';
    }
}

function fakeExit(){
    window.location.href = "https://www.google.com";
}

document.addEventListener("keydown",function(event){

    let key = event.key;

    if("0123456789+-*/.".includes(key)){
        appendValue(key);
    }

    if(key === "Backspace"){
        let display = document.getElementById("display");
        display.value = display.value.slice(0,-1);
    }

    if(key === "Escape"){
        clearDisplay();
    }

    if(key === "Enter"){
        checkCode();
    }

});

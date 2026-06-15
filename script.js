
function appendValue(v){document.getElementById('display').value+=v;}
function clearDisplay(){document.getElementById('display').value='';}
function checkCode(){if(document.getElementById('display').value==='1234')window.location='dashboard.html';}
function sendSOS() {

    let popup = document.createElement("div");

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.width = "90%";
    popup.style.maxWidth = "650px";
    popup.style.background = "#ffffff";
    popup.style.border = "5px solid red";
    popup.style.borderRadius = "20px";
    popup.style.padding = "35px";
    popup.style.textAlign = "center";
    popup.style.boxShadow = "0 0 25px rgba(0,0,0,0.4)";
    popup.style.zIndex = "9999";

    popup.innerHTML = `
        <div style="font-size:80px;">🚨</div>
        <h1 style="color:red;">SOS ACTIVATED</h1>
        <h2 id="status">📍 Detecting Current Location...</h2>
        <p style="font-size:20px;">Simulation Mode</p>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        document.getElementById("status").innerHTML =
        "🔍 Finding Nearby Police Station...";
    }, 2000);

    setTimeout(() => {
        document.getElementById("status").innerHTML =
        "📡 Connecting to Nearby Police Station...";
    }, 4000);

    setTimeout(() => {
        document.getElementById("status").innerHTML =
        "✅ Connected Successfully";
    }, 6000);

    setTimeout(() => {
        document.getElementById("status").innerHTML =
        "🚓 Emergency Alert Registered";
    }, 8000);

    setTimeout(() => {
        document.getElementById("status").innerHTML =
        "👮 Police Will Reach You Soon";
    }, 10000);

    setTimeout(() => {
        popup.remove();
        window.location.href = "index.html";
    }, 12000);
}
function saveDiary(){localStorage.setItem('incident_'+Date.now(),document.getElementById('note').value);alert('Saved');}
function addContact(){localStorage.setItem(document.getElementById('name').value,document.getElementById('phone').value);alert('Added');}
function changeLanguage(){let l=document.getElementById('language').value;let t=document.getElementById('title');let s=document.getElementById('sosBtn');
if(l==='kn'){t.innerHTML='ಸೇಫ್ ಹೋಮ್+';s.innerHTML='ತುರ್ತು ಸಹಾಯ';}
else if(l==='hi'){t.innerHTML='सेफ होम+';s.innerHTML='आपातकालीन सहायता';}
else{t.innerHTML='SafeHome+';s.innerHTML='SOS ALERT';}}
function fakeExit(){
    window.location.href="https://www.google.com";
}
document.addEventListener("keydown", function(event){

    let key = event.key;

    if("0123456789+-*/.".includes(key)){
        appendValue(key);
    }

    if(key === "Enter"){
        calculate();
    }

    if(key === "Backspace"){
        display.value =
        display.value.slice(0,-1);
    }

    if(key === "Escape"){
        clearDisplay();
    }

});

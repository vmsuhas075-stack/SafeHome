
function appendValue(v){document.getElementById('display').value+=v;}
function clearDisplay(){document.getElementById('display').value='';}
function checkCode(){if(document.getElementById('display').value==='1234')window.location='dashboard.html';}
function sendSOS() {

    navigator.geolocation.getCurrentPosition(

        function(position) {

            let popup = document.createElement("div");

            popup.innerHTML = `
                <div style="font-size:80px;">🚨</div>

                <h1 style="color:red;font-size:45px;">
                    SOS ACTIVATED
                </h1>

                <p style="font-size:28px;">
                    📍 Location Captured Successfully
                </p>

                <p style="font-size:28px;">
                    👮 Nearby Police Station Notified
                </p>

                <p style="font-size:24px;color:green;">
                    ✅ Emergency Alert Process Started
                </p>
            `;

            popup.style.position = "fixed";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
            popup.style.width = "90%";
            popup.style.maxWidth = "650px";
            popup.style.background = "#ffffff";
            popup.style.padding = "40px";
            popup.style.borderRadius = "25px";
            popup.style.textAlign = "center";
            popup.style.border = "6px solid red";
            popup.style.boxShadow = "0 0 30px rgba(0,0,0,0.5)";
            popup.style.zIndex = "9999";

            document.body.appendChild(popup);

            // After 5 seconds, return to calculator page
            setTimeout(function () {
                window.location.href = "index.html";
            }, 5000);

        },

        function() {
            alert("Location permission denied.");
        }

    );

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

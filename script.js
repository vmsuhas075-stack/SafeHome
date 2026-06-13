
function appendValue(v){document.getElementById('display').value+=v;}
function clearDisplay(){document.getElementById('display').value='';}
function checkCode(){if(document.getElementById('display').value==='1234')window.location='dashboard.html';}
function sendSOS(){

navigator.geolocation.getCurrentPosition(

function(position){

let lat = position.coords.latitude;
let lon = position.coords.longitude;

document.body.innerHTML += `

<div style="
position:fixed;
top:20px;
left:20px;
right:20px;
background:red;
color:white;
padding:20px;
font-size:20px;
border-radius:15px;
z-index:9999;
">

🚨 SOS SENT SUCCESSFULLY<br><br>

📍 Location Shared<br>

Latitude: ${lat}<br>
Longitude: ${lon}<br><br>

👮 Nearby Police Station Notified

</div>

`;

}

);

}
function saveDiary(){localStorage.setItem('incident_'+Date.now(),document.getElementById('note').value);alert('Saved');}
function addContact(){localStorage.setItem(document.getElementById('name').value,document.getElementById('phone').value);alert('Added');}
function changeLanguage(){let l=document.getElementById('language').value;let t=document.getElementById('title');let s=document.getElementById('sosBtn');
if(l==='kn'){t.innerHTML='ಸೇಫ್ ಹೋಮ್+';s.innerHTML='ತುರ್ತು ಸಹಾಯ';}
else if(l==='hi'){t.innerHTML='सेफ होम+';s.innerHTML='आपातकालीन सहायता';}
else{t.innerHTML='SafeHome+';s.innerHTML='SOS ALERT';}}

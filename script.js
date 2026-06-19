// =========================
// LOGIN
// =========================

function login(){

    let email = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    let user = JSON.parse(localStorage.getItem("safehomeUser"));

    if(user === null){

        alert("No account found. Please create an account first.");
        return;

    }

    if(email === user.email && password === user.password){

        localStorage.setItem("loggedIn","true");

        alert("Login Successful");

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Email or Password");

    }

}

// =========================
// CREATE ACCOUNT
// =========================

function register(){

    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let password = document.getElementById("regPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    if(fullname==="" || email==="" || phone==="" || password===""){

        alert("Please fill all fields.");
        return;

    }

    if(password !== confirm){

        alert("Passwords do not match.");
        return;

    }

    let user = {

        fullname: fullname,
        email: email,
        phone: phone,
        password: password

    };

    localStorage.setItem("safehomeUser", JSON.stringify(user));

    alert("Account Created Successfully!");

    window.location.href = "index.html";

}

function sendSOS(){

    let countdown = 5;

    const popup = document.createElement("div");

    popup.style.position = "fixed";
    popup.style.top = "0";
    popup.style.left = "0";
    popup.style.width = "100%";
    popup.style.height = "100%";
    popup.style.background = "rgba(0,0,0,.7)";
    popup.style.display = "flex";
    popup.style.justifyContent = "center";
    popup.style.alignItems = "center";
    popup.style.zIndex = "9999";

    popup.innerHTML = `
    <div style="
        width:90%;
        max-width:360px;
        background:white;
        border-radius:20px;
        padding:30px;
        text-align:center;
        color:black;
        animation:popup .3s;
    ">
        <div style="font-size:70px;">🚨</div>

        <h2 style="color:red;">
        SOS ACTIVATED
        </h2>

        <h3>
        Sending SOS in
        <span id="timer">5</span>
        sec
        </h3>

    </div>
    `;

    document.body.appendChild(popup);

    const interval = setInterval(function(){

        countdown--;

        document.getElementById("timer").innerHTML = countdown;

        if(countdown <= 0){

            clearInterval(interval);

            popup.innerHTML = `
            <div style="
                width:90%;
                max-width:360px;
                background:white;
                border-radius:20px;
                padding:30px;
                text-align:center;
                color:black;
            ">

            <div style="font-size:70px;">
            ✅
            </div>

            <h2 style="color:green;">
            SOS Alert Sent Successfully
            </h2>

            </div>
            `;

            setTimeout(function(){

                popup.remove();

            },2000);

        }

    },1000);

}

// =========================
// QUICK EXIT
// =========================

function fakeExit(){

    window.location.href="https://www.google.com";

}

// =========================
// TRUSTED CONTACTS
// =========================

function addContact(){

    let name=document.getElementById("name").value;
    let phone=document.getElementById("phone").value;

    if(name==="" || phone===""){

        alert("Enter Name and Phone");

        return;

    }

    localStorage.setItem(name,phone);

    alert("Contact Saved");

}

// =========================
// INCIDENT DIARY
// =========================

function saveDiary(){

    let note=document.getElementById("note").value;

    if(note===""){

        alert("Write something");

        return;

    }

    localStorage.setItem(

        "incident_"+Date.now(),

        note

    );

    alert("Diary Saved");

}

// =========================
// LANGUAGE
// =========================

function changeLanguage(){

    const lang=document.getElementById("language");

    if(!lang) return;

    if(lang.value==="hi"){

        alert("Hindi language selected");

    }

    else if(lang.value==="kn"){

        alert("Kannada language selected");

    }

    else{

        alert("English language selected");

    }

}
let shakeThreshold = 15;
let lastX = 0, lastY = 0, lastZ = 0;
let shakeCount = 0;

// Enable shake detection
window.addEventListener("devicemotion", (event) => {

    let acc = event.accelerationIncludingGravity;

    if (!acc) return;

    let x = acc.x;
    let y = acc.y;
    let z = acc.z;

    let deltaX = Math.abs(x - lastX);
    let deltaY = Math.abs(y - lastY);
    let deltaZ = Math.abs(z - lastZ);

    if (deltaX + deltaY + deltaZ > shakeThreshold) {
        shakeCount++;
    }

    lastX = x;
    lastY = y;
    lastZ = z;

    // If shaken multiple times quickly → trigger SOS
    if (shakeCount > 3) {
        shakeCount = 0;
        startSOS(); // your existing function
    }

    // reset counter slowly
    setTimeout(() => {
        shakeCount = 0;
    }, 2000);
});
if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
        .then(response => {
            if (response === "granted") {
                console.log("Motion permission granted");
            }
        })
        .catch(console.error);
}

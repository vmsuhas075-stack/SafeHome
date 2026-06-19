// =========================
// LOGIN
// =========================

function login(){

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if(username === "admin" && password === "1234"){

        localStorage.setItem("loggedIn","true");
        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Username or Password");

    }

}

// =========================
// SOS ALERT
// =========================

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

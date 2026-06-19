// ================= NAVIGATION =================

document.getElementById("showSignup").onclick = () => {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("signupCard").style.display = "block";
};

document.getElementById("showLogin").onclick = () => {
    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
};

document.getElementById("showReset").onclick = () => {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("resetCard").style.display = "block";
};

document.getElementById("backToLogin").onclick = () => {
    document.getElementById("resetCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
};


// ================= AUTH =================

function registerUser() {

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    if (localStorage.getItem("user_" + email)) {
        alert("Account already exists");
        return;
    }

    let user = { name, email, password };

    localStorage.setItem("user_" + email, JSON.stringify(user));

    alert("Account Created ✔");

    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
}

function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let data = localStorage.getItem("user_" + email);

    if (!data) {
        alert("Account not found");
        return;
    }

    let user = JSON.parse(data);

    if (user.password === password) {
        alert("Login Success ✔ Welcome " + user.name);
        document.getElementById("loginCard").style.display = "none";
    } else {
        alert("Wrong password");
    }
}

function resetPassword() {
    let email = document.getElementById("resetEmail").value;

    if (!email) {
        alert("Enter email");
        return;
    }

    alert("Reset link sent (demo) to " + email);
}


// ================= SOS TIMER =================

let sosTime = 10;
let interval;

function startSOS() {

    document.getElementById("sosBtn").style.display = "none";
    document.getElementById("sosTimerContainer").style.display = "block";

    let timer = document.getElementById("timerText");
    timer.innerText = sosTime;

    interval = setInterval(() => {

        sosTime--;
        timer.innerText = sosTime;

        if (sosTime <= 0) {
            clearInterval(interval);
            triggerSOS();
        }

    }, 1000);
}

function triggerSOS() {

    navigator.geolocation.getCurrentPosition((pos) => {

        let link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;

        alert("🚨 SOS ALERT!\n" + link);

    });

    resetSOS();
}

function resetSOS() {
    sosTime = 10;
    document.getElementById("sosBtn").style.display = "block";
    document.getElementById("sosTimerContainer").style.display = "none";
}


// ================= DIARY =================

function saveDiary() {

    let note = document.getElementById("note").value;

    if (!note) {
        alert("Write something");
        return;
    }

    localStorage.setItem("incident_" + Date.now(), note);

    alert("Saved");
}


// ================= LANGUAGE =================

function changeLanguage() {

    let lang = document.getElementById("language").value;

    if (lang === "hi") alert("Hindi selected");
    else if (lang === "kn") alert("Kannada selected");
    else alert("English selected");
}


// ================= SHAKE TO SOS =================

let lastX = 0, lastY = 0, lastZ = 0;
let shakeCount = 0;
let lastTime = 0;

window.addEventListener("devicemotion", (e) => {

    let a = e.accelerationIncludingGravity;
    if (!a) return;

    let dx = Math.abs(a.x - lastX);
    let dy = Math.abs(a.y - lastY);
    let dz = Math.abs(a.z - lastZ);

    let total = dx + dy + dz;

    let now = Date.now();

    if (total > 18 && now - lastTime < 2000) {
        shakeCount++;
    } else {
        shakeCount = 1;
    }

    lastTime = now;

    if (shakeCount >= 3) {
        shakeCount = 0;
        startSOS();
    }

    lastX = a.x;
    lastY = a.y;
    lastZ = a.z;
});


// ================= MOTION PERMISSION =================

function enableMotion() {
    if (typeof DeviceMotionEvent.requestPermission === "function") {
        DeviceMotionEvent.requestPermission().then(res => {
            if (res === "granted") {
                console.log("Motion enabled");
            }
        });
    }
}

enableMotion();

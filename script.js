// =========================
// NAVIGATION (LOGIN SYSTEM)
// =========================

document.getElementById("showSignup")?.addEventListener("click", () => {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("signupCard").style.display = "block";
});

document.getElementById("showLogin")?.addEventListener("click", () => {
    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
});

document.getElementById("showReset")?.addEventListener("click", () => {
    document.getElementById("loginCard").style.display = "none";
    document.getElementById("resetCard").style.display = "block";
});

document.getElementById("backToLogin")?.addEventListener("click", () => {
    document.getElementById("resetCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
});


// =========================
// AUTH (DUMMY)
// =========================

function loginUser() {

    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }

    let storedUser = localStorage.getItem("user_" + email);

    if (!storedUser) {
        alert("No account found. Please sign up first.");
        return;
    }

    let user = JSON.parse(storedUser);

    if (user.password === password) {

        alert("Login successful ✔ Welcome " + user.name);

        // SAVE SESSION (important fix)
        localStorage.setItem("loggedInUser", email);

        // OPTIONAL: show SOS page / hide login
        document.getElementById("loginCard").style.display = "none";

    } else {
        alert("Wrong password ❌");
    }
}

function registerUser() {

    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    // check if already exists
    if (localStorage.getItem("user_" + email)) {
        alert("Account already exists!");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("user_" + email, JSON.stringify(user));

    alert("Account created successfully ✔");

    // go to login page
    document.getElementById("signupCard").style.display = "none";
    document.getElementById("loginCard").style.display = "block";
}

function resetPassword() {
    let email = document.getElementById("resetEmail").value;

    if (email === "") {
        alert("Enter email");
        return;
    }

    alert("Reset link sent to " + email);
}


// =========================
// SOS SYSTEM (TIMER)
// =========================

let sosTime = 10;
let sosInterval;

function startSOS() {

    document.getElementById("sosBtn").style.display = "none";
    document.getElementById("sosTimerContainer").style.display = "block";

    let timer = document.getElementById("timerText");
    timer.innerText = sosTime;

    sosInterval = setInterval(() => {

        sosTime--;
        timer.innerText = sosTime;

        if (sosTime <= 0) {
            clearInterval(sosInterval);
            triggerSOS();
        }

    }, 1000);
}


// =========================
// SOS TRIGGER (GPS + ALERT)
// =========================

function triggerSOS() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            let locationLink = `https://www.google.com/maps?q=${lat},${lon}`;

            alert("🚨 SOS TRIGGERED!\n\nLocation:\n" + locationLink);

            console.log("SOS LOCATION:", locationLink);

        }, () => {
            alert("Location access denied");
        });

    } else {
        alert("Geolocation not supported");
    }

    resetSOS();
}


// Reset SOS UI
function resetSOS() {

    sosTime = 10;

    document.getElementById("sosBtn").style.display = "block";
    document.getElementById("sosTimerContainer").style.display = "none";
}


// =========================
// INCIDENT DIARY
// =========================

function saveDiary() {

    let note = document.getElementById("note").value;

    if (note === "") {
        alert("Write something");
        return;
    }

    localStorage.setItem("incident_" + Date.now(), note);

    alert("Diary Saved");
}


// =========================
// LANGUAGE SWITCH
// =========================

function changeLanguage() {

    const lang = document.getElementById("language");

    if (!lang) return;

    if (lang.value === "hi") {
        alert("Hindi language selected");
    }
    else if (lang.value === "kn") {
        alert("Kannada language selected");
    }
    else {
        alert("English language selected");
    }
}


// =========================
// SHAKE TO SOS (FIXED)
// =========================

let shakeThreshold = 18;
let lastX = 0, lastY = 0, lastZ = 0;
let shakeCount = 0;
let lastShakeTime = 0;

window.addEventListener("devicemotion", (event) => {

    let acc = event.accelerationIncludingGravity;
    if (!acc) return;

    let x = acc.x || 0;
    let y = acc.y || 0;
    let z = acc.z || 0;

    let deltaX = Math.abs(x - lastX);
    let deltaY = Math.abs(y - lastY);
    let deltaZ = Math.abs(z - lastZ);

    let totalShake = deltaX + deltaY + deltaZ;

    if (totalShake > shakeThreshold) {

        let now = Date.now();

        if (now - lastShakeTime < 2000) {
            shakeCount++;
        } else {
            shakeCount = 1;
        }

        lastShakeTime = now;

        if (shakeCount >= 3) {
            shakeCount = 0;
            startSOS();
        }
    }

    lastX = x;
    lastY = y;
    lastZ = z;
});


// =========================
// MOTION PERMISSION
// =========================

function enableMotion() {

    if (typeof DeviceMotionEvent.requestPermission === "function") {

        DeviceMotionEvent.requestPermission()
            .then(response => {
                if (response === "granted") {
                    console.log("Motion permission granted");
                } else {
                    alert("Motion permission denied");
                }
            })
            .catch(console.error);

    } else {
        console.log("Motion auto-enabled");
    }
}

// run once
enableMotion();
window.onload = function () {

    let user = localStorage.getItem("loggedInUser");

    if (user) {
        console.log("User already logged in:", user);

        // hide login
        document.getElementById("loginCard").style.display = "none";
    }
};
function logoutUser() {
    localStorage.removeItem("loggedInUser");

    document.getElementById("loginCard").style.display = "block";

    alert("Logged out successfully");
}

// dropdown menu

let menu = document.querySelector(".drop").childNodes[1]
let dropmenu = document.getElementById("dropmenu")
let nav = document.querySelector("nav")
let test = true

if (menu) {
    menu.addEventListener('click', openMenu)
}

function openMenu() {
    dropmenu.classList.toggle("Show")
    if (test) {
        nav.style.padding = "15px 0px"
        test = false;
    } else {
        nav.style.padding = "15px 0px 70px"
        test = true
    }
}

window.addEventListener("resize", resize)

function resize() {
    if (window.innerWidth > 1000) {
        dropmenu.classList.remove("Show")
    }
}



//article option buttons

let articleoptions = document.getElementById("articleoptions")
if (articleoptions) {
    articleoptions.addEventListener("click", addClass)
}

function addClass(e) {
    console.log(e.target)
    for (i = 0; i <= 7; i++) {
        if (i % 2 !== 0) {
            articleoptions.childNodes[i].classList.remove("active")
        }
    }
    e.preventDefault()
    e.target.classList.add("active")
}



// Happy client's comments

let arrows = document.getElementById("arrows")
let arrowleft = document.getElementById("arrowleft")
let arrowright = document.getElementById("arrowright")

let happyClientsCount = 2
let startcount = 1


if (arrows) {
    arrowleft.addEventListener("click", less)
    arrowright.addEventListener("click", more)
    arrowleft = arrowleft.firstElementChild
    arrowright = arrowright.lastElementChild
}

function testarrow() {
    if (startcount === 1) {
        arrowleft.classList.remove("activearrow")
        arrowleft.classList.add("passivearrow")
        arrowright.classList.remove("passivearrow")
        arrowright.classList.add("activearrow")
    }
    else if (startcount > 1 && startcount < happyClientsCount) {
        arrowright.classList.remove("passivearrow")
        arrowright.classList.add("activearrow")
        arrowleft.classList.remove("passivearrow")
        arrowleft.classList.add("activearrow")
    }
    else if (startcount === happyClientsCount) {
        arrowleft.classList.remove("passivearrow")
        arrowleft.classList.add("activearrow")
        arrowright.classList.add("passivearrow")
        arrowright.classList.remove("activearrow")
    }

}
function pagecontrol() {
    if (startcount <= 3) {
        for (i = 3; i <= 7; i += 2) {
            arrows.childNodes[i].firstElementChild.classList.remove("rectangle")
            arrows.childNodes[i].firstElementChild.classList.add("ellipse")
        }
        arrows.childNodes[startcount + (startcount + 1)].firstElementChild.classList.remove("ellipse")
        arrows.childNodes[startcount + (startcount + 1)].firstElementChild.classList.add("rectangle")
    }
}

function less() {
    testarrow()
    if (startcount > 1) {
        startcount--
        testarrow()
        pagecontrol()
    }
}

function more() {
    testarrow()
    if (startcount < happyClientsCount) {
        startcount++
        testarrow()
        pagecontrol()
    }
}

// Login and Signup buttons overlays

let overlays = document.querySelectorAll(".overlay")
let closeoverlays = document.querySelectorAll(".close")
let signupbuttons = document.querySelectorAll(".signupButton")
let loginbuttons = document.querySelectorAll(".loginButton")
let signupOverlay = document.getElementById("signupOverlay")
let signinOverlay = document.getElementById("signinOverlay")
let confirmOverlay = document.getElementById("confirmOverlay")
let securityOverlay = document.getElementById("securityOverlay")
let forgotoverlay = document.getElementById("forgotOverlay")
let forgotVerify = document.getElementById("forgotVerifyOverlay")
let newPasswordOverlay = document.getElementById("newPasswordOverlay")
let successOverlay = document.getElementById("successOverlay")


if (signupbuttons) {
    signupbuttons.forEach(signupbutton => {
        signupbutton.addEventListener("click", signup)
    })
}
if (loginbuttons) {
    loginbuttons.forEach(loginbutton => {
        loginbutton.addEventListener("click", login)
    })
}

function closewindow() {
    overlays.forEach(overlay => { overlay.style.display = "none" }
    );
}

function closer() {
    document.querySelectorAll(".close").forEach(closeoverlay => { closeoverlay.addEventListener('click', closewindow) })

}

function signup() {
    closewindow()
    console.log(overlays)
    overlays[0].style.display = "flex"
    document.getElementById("signuplogin").addEventListener("click", login)
    closer()
}

function login() {
    closewindow()
    overlays[1].style.display = "flex"
    closer()
    document.getElementById("toconfirm").addEventListener("click", confirmaccount)
    document.getElementById("forgotpassword").addEventListener("click", iforgotpassword)
    document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mousedown", textviewer) })
    document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mouseup", passwordviewer) })
}

function confirmaccount() {
    closewindow()
    overlays[2].style.display = "flex"
    document.getElementById("confirmContinue").addEventListener("click", security)
    closer()
}

function security() {
    closewindow()
    overlays[3].style.display = "flex"
    closer()
}


function iforgotpassword() {
    closewindow()
    overlays[4].style.display = "flex"
    document.getElementById("forgotnext").addEventListener("click", forgotnext)
    closer()
}

function forgotnext() {

    overlays[5].style.display = "flex"
    document.getElementById("forgotVerifyNext").addEventListener("click", verifypass)
    closer()
}

function verifypass() {
    closewindow()
    overlays[6].style.display = "flex"
    document.getElementById("NewPasswordNext").addEventListener("click", createpass)
    document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mousedown", textviewer) })
    document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mouseup", passwordviewer) })
    closer()
}

function createpass() {
    closewindow()
    overlays[7].style.display = "flex"
    closer()
}


function textviewer(e) {
    console.log(e.target.parentElement)
    e.target.parentElement.nextElementSibling.nextElementSibling.type = "text"

}
function passwordviewer(e) {
    console.log(e.target.parentElement)
    e.target.parentElement.nextElementSibling.nextElementSibling.type = "password"
}


let passes = document.querySelectorAll(".pass")
let next = document.getElementById("forgotnext")
let characterverifies = document.querySelectorAll(".characterverify")
let verifycode = []


if (characterverifies) {
    characterverifies.forEach(characterverify => { characterverify.addEventListener('change', changetype) })
}

function changetype(e) {
    e.target.type = "password"
    // e.target.nextElementByTabIndex.focus();
    console.log(e.target.value)
}

let pause = document.getElementById("pausebutton")
let play = document.getElementById("playbutton")
let video = document.getElementById("myvideo")


if (play && pause){
    play.addEventListener("click", () => {
        play.style.display = "none"
        pause.style.display = "flex"
        video.play();
    })
pause.addEventListener("click", () => {
    video.pause();
    pause.style.display = "none"
    play.style.display = "flex"
})
}
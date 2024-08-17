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

let testedusers = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('/api/users/')
        .then(response => response.json())
        .then(data => {
            data.forEach(user => {
                testedusers[user.id] = {
                    email: user.email,
                    phone: user.phone,
                    username: user.username
                };
            });
        })
        .catch(error => console.error('Error', error));
});


//article option buttons

let articleoptions = document.getElementById("articleoptions")
if (articleoptions) {
    articleoptions.addEventListener("click", addClass)
}

function addClass(e) {
    for (i = 0; i <= 7; i++) {
        if (i % 2 !== 0) {
            articleoptions.childNodes[i].classList.remove("active")
        }
    }
    e.preventDefault()
    e.target.classList.add("active")
}

//memberships


// let membershipplans = document.getElementById("membershipplans")
// if (membershipplans) {
//     membershipplans.addEventListener("click", addandremoveclass)
// }


document.querySelectorAll('.plan').forEach(plan => {
    plan.addEventListener('click', addAndRemoveClass);
});

function addAndRemoveClass(e) {
    document.querySelectorAll('#membershipplans .plan').forEach(plan => {
        plan.classList.remove('plan2');
    });
    if (e.currentTarget.classList.contains('plan')) {
        e.currentTarget.classList.add('plan2');
    }
    document.querySelectorAll('#homemembershipplans .plan').forEach(plan => {
        plan.classList.remove('plan2');
    });
    if (e.currentTarget.classList.contains('plan')) {
        e.currentTarget.classList.add('plan2');
    }
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
let securityContinue = document.getElementById("securityContinue")
let forgotoverlay = document.getElementById("forgotOverlay")
let forgotVerify = document.getElementById("forgotVerifyOverlay")
let newPasswordOverlay = document.getElementById("newPasswordOverlay")
let successOverlay = document.getElementById("successOverlay")
let poster = document.getElementById("poster")
let mailto = document.getElementById("mailto")
let messageblock = document.getElementById("messageblock")
let confirmedemail = document.getElementById("confirmedemail")
let confirmedphone = document.getElementById("confirmedphone")


function buttonhider() {
    document.addEventListener('DOMContentLoaded', function () {
        var configElement = document.getElementById('config-data');
        var configData = JSON.parse(configElement.textContent);
        var isLoggedIn = configData.is_authenticated;
        if (!isLoggedIn) {
            document.getElementById("login").style.display = "flex"
            document.getElementById("signup").style.display = "flex"
        }
        else {
            document.getElementById("login").style.display = "none"
            document.getElementById("signup").style.display = "none"
        }
    });
}

buttonhider()

var path = window.location.pathname;
var page = path.split("/")


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

if (securityContinue) {
    securityContinue.addEventListener("click", endofsignin)
}

function closewindow() {
    overlays.forEach(overlay => { overlay.style.display = "none" });
}

function closer() {
    document.querySelectorAll(".close").forEach(closeoverlay => { closeoverlay.addEventListener('click', closewindow) })

}

function signup() {
    closewindow()
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


document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
        if (form.id === 'securitypasswordform' || form.id === 'logoutForm') {
            return;
        }
        event.preventDefault();
        console.log('form gönderilmedi.');
    });
});


function confirmaccount() {
    closewindow()
    overlays[2].style.display = "flex";
    document.getElementById("confirmContinue").addEventListener("click", security);
    closer();
    for (i = 1; i <= testedusers.length; i++) {
        if (testedusers[i].username == username.value) {
            confirmedemail.innerText = testedusers[i].email
            poster.value = testedusers[i].email
            confirmedphone.innerText = testedusers[i].phone
            break
        }
        else {
            messageblock.classList.add("alert")
            messageblock.textContent = "Username is not found !!"
        }
    }
}

// send email 

function security() {
    if (document.getElementById("getcodebyphone").checked) {
        mailto.innerText = testedusers[i].phone
    } else {
        mailto.innerText = testedusers[i].email
    }
    var formElement = document.getElementById('emailform');
    if (!(formElement instanceof HTMLFormElement)) {
        console.error('The selected element is not an HTMLFormElement.');
        return;
    }

    var csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    var formData = new FormData(formElement);
    fetch('/email_verification/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': csrfToken
        }
    })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });

    closewindow()
    overlays[3].style.display = "flex"
    closer()

}

// verify mail get verifycation code

async function fetchVerificationCode() {
    try {
        const response = await fetch(`/get-verification-code/`);
        const data = await response.json();
        if (data.verification_code) {
            return data.verification_code;
        } else {
            console.error('Verifying code is not found');
            return null;
        }
    } catch (error) {
        console.error('Error', error);
        return null;
    }
}

//endofsignin
function endofsignin() {
    closer()
    let globalCode;
    async function main() {
        globalCode = await fetchVerificationCode();
        if (globalCode == verifycharacters) {
            closewindow()
        } else {
            alert("Verifycation code is invalid")
        }
    }
    main();
    let verifycharacters = ''
    document.querySelectorAll(".characterverify input").forEach(character => {
        verifycharacters += character.value;
    });
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

}

function moveToNext(current, nextFieldId) {
    if (current.lenght >= 1) {
        document.getElementById(nextFieldId).focus()
    }
}

function createpass() {
    closewindow()
    overlays[7].style.display = "flex"
    closer()
}

function textviewer(e) {
    e.target.parentElement.nextElementSibling.nextElementSibling.type = "text"

}
function passwordviewer(e) {
    e.target.parentElement.nextElementSibling.nextElementSibling.type = "password"
}

let pause = document.getElementById("pausebutton")
let play = document.getElementById("playbutton")
let video = document.getElementById("myvideo")

if (play && pause) {
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

//checkboxes

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
        });
    });
});


//add to cart
let wishlist = ["basic"]

let addtocart = document.querySelector("#addtocart")

if (addtocart) {
    addtocart.addEventListener("click", checkcart)
}

function checkcart() {
    if (wishlist) {
        document.querySelector(".red").style.display = 'block'
    }

}



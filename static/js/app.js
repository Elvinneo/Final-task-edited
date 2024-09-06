let isAuthenticated = document.querySelector('meta[name="is_authenticated"]').getAttribute('content') === 'True';
let menu = document.querySelector(".drop").childNodes[1]
let dropmenu = document.getElementById("dropmenu")
let nav = document.querySelector("nav")
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
let confirmedemail = document.getElementById("confirmedemail")
let confirmedphone = document.getElementById("confirmedphone")
let passwordfield = document.getElementById("passwordlogin")
let usernamefield = document.getElementById("usernamelogin")
let buttoncontinue = document.getElementById("confirmContinue")
let forgotmailarea = document.getElementById("forgotmailarea")
let pass = document.querySelectorAll(".pass")
let globalemail
let test = true
let nextBtn
let prevBtn
let resendbutton = document.getElementById("resend")
let path = window.location.pathname;
let page = path.split("/")
let activeClass
let articleoptions = document.getElementById("articleoptions")
let testedusers = [];
let eye = document.querySelectorAll('.eye')
let eye1 = document.querySelectorAll('.eye1')
let arrows = document.getElementById("arrows")
let arrowleft = document.getElementById("arrowleft")
let arrowright = document.getElementById("arrowright")
let happyClientsCount = 2
let startcount = 1
let passes = document.querySelectorAll(".pass")
let next = document.getElementById("forgotnext")
let characterverifies = document.querySelectorAll(".characterverify")
let verifycode = []
let pause = document.getElementById("pausebutton")
let play = document.getElementById("playbutton")
let video = document.getElementById("myvideo")
let wishlist = ["basic"]
let addtocart = document.querySelector("#addtocart")
let months = document.getElementById("months");
let priceElement = document.getElementById("price");
let total = document.getElementById("total");
let wishdelete = document.getElementById("wishdelete")
let updater = document.getElementById("profileUpdater")
let changebutton = document.getElementById("changephoto")
let profilicon = document.querySelector(".profiles");
let wishview = document.getElementById("wishview")
let faqform = document.getElementById('faqform')
let currentIndex = 0;
let temporary = {}
let userName
let purchaseButton
let planIdElement
let price
let paymethod
let resulter = {};
const welcomeMessageElement = document.getElementById("wellcome_message")
const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
let paypal = document.getElementById("paypal")
let applepay = document.getElementById("applepay")
let cardholder = document.getElementById('cardholder');
let cardnumber = document.getElementById('cardnumber');
let expiry = document.getElementById('expiryDate');
let cvv = document.getElementById('cvv');
let postal = document.getElementById('postalcode');


if (welcomeMessageElement) {
    const welcomeMessage = welcomeMessageElement.textContent.trim();
    const userNameMatch = welcomeMessage.match(/^Welcome, (.+)!$/);
    if (userNameMatch) {
        userName = userNameMatch[1];
    }
}


if (!isAuthenticated) {
    document.querySelector(".red").style.display = 'none'
    document.getElementById("wishview").disabled = true
} else {
    checkcart()
}


if (menu) {
    menu.addEventListener('click', openMenu)
}

document.querySelectorAll(".selection").forEach(selected =>
    selected.addEventListener('click', idadder)
);

function idadder(e) {
    const container = e.target.parentElement;
    const selections = container.querySelectorAll('.selection');
    selections.forEach(item => {
        if (item === e.target) {
            item.id = "selection1";
        } else {
            item.id = '';
        }
    });
}

function openMenu() {
    dropmenu.classList.toggle("Show")
    let configElement = document.getElementById('config-data');
    let configData = JSON.parse(configElement.textContent);
    if (test) {
        nav.style.padding = "15px 0px"
        test = false;
    }
    if ((configData.is_authenticated)) {
        nav.style.padding = "15px 0px 130px"
        test = true
    } else {
        nav.style.padding = "15px 0px 70px"
        test = true
    }
    setTimeout(() => {
        dropmenu.classList.toggle("Show");
    }, 8000);

}

window.addEventListener("resize", resize)
function resize() {
    if (window.innerWidth > 1000) {
        dropmenu.classList.remove("Show")
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const token = 'bvmVNBMBMHB24512vbnmmm45vbgfhvn53VGBHJbjghj275fgcgvnf';
    fetch('/api/users/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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
if (articleoptions) {
    articleoptions.childNodes[1].classList.add("active")
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
    activeClass = document.getElementsByClassName("active")[0].textContent

}

// blog category filtration

document.addEventListener('DOMContentLoaded', function () {
    const categoryLinks = document.querySelectorAll('#articleoptions a');
    const cards = document.querySelectorAll('.topcard .card');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const category = this.getAttribute('data-category');
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// eyes

if (eye) {
    eye.forEach(eye => { eye.addEventListener("mousedown", textviewer) })
    eye.forEach(eye => { eye.addEventListener("mouseup", passwordviewer) })
}
if (eye1) {
    eye1.forEach(eye => { eye.addEventListener("mousedown", textviewer) })
    eye1.forEach(eye => { eye.addEventListener("mouseup", passwordviewer) })
}

//memberships

document.querySelectorAll('.plan').forEach(plan => {
    plan.addEventListener('click', addAndRemoveClass);
});

function addAndRemoveClass(e) {
    document.querySelectorAll('#membershipplans .plan').forEach(plan => {
        plan.classList.remove('plan2');
    });
    if (e.currentTarget.classList.contains('plan')) {
        e.currentTarget.classList.add('plan2');
        document.querySelectorAll(".plan2 ul li img").forEach(image => { image.src = "/static/media/checkmark-circle-outline_green.svg"; })

    }
    document.querySelectorAll('#homemembershipplans .plan').forEach(plan => {
        plan.classList.remove('plan2');
        document.querySelectorAll(".plan ul li img").forEach(image => { image.src = "static/media/checkmark-circle-outline%201.svg"; })
    });
    if (e.currentTarget.classList.contains('plan')) {
        e.currentTarget.classList.add('plan2');
        document.querySelectorAll(".plan2 ul li img").forEach(image => { image.src = "/static/media/checkmark-circle-outline_green.svg"; })
    }
}

// Happy client's comments

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

function buttonhider() {
    document.addEventListener('DOMContentLoaded', function () {
        let configElement = document.getElementById('config-data');
        let configData = JSON.parse(configElement.textContent);
        let isLoggedIn = configData.is_authenticated;
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

if (resendbutton) {
    resendbutton.addEventListener("click", () => verificationCodeSender('emailform'));
}

function closewindow() {
    overlays.forEach(overlay => { overlay.style.display = "none" });
}

function closer() {
    closeoverlays.forEach(closeoverlay => { closeoverlay.addEventListener('click', closewindow) })

}

function signup() {
    closewindow()
    resetFormInDiv(overlays[0].id)
    overlays[0].style.display = "flex"
    document.getElementById("signuplogin").addEventListener("click", login)
    closer()
}

function login() {
    document.getElementById("toconfirm").disabled = true
    closewindow()
    resetFormInDiv(overlays[1].id)
    overlays[1].style.display = "flex"
    closer()
    document.getElementById("toconfirm").addEventListener("click", confirmaccount)
    document.getElementById("forgotpassword").addEventListener("click", iforgotpassword)
}

document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (event) {
        if (form.id === 'paymentform' || form.id === 'faqform' || form.id === 'contactform' || form.id === 'securitypasswordform' || form.id === 'logoutForm' || form.id === "loginForm" || form.id === 'signupmailform') {
            return;
        }
        event.preventDefault();
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', function (event) {
        const formData = new FormData(form);
        event.preventDefault();
        fetch('/login/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                const messageElement = document.getElementById('responseMessage');
            })
            .catch(error => {
                console.error('error', error);
            });
    });
});

function resetFormInDiv(divId) {
    let div = document.getElementById(divId);
    if (div) {
        let form = div.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// verification login fields

if (passwordfield && usernamefield) {
    usernamefield.addEventListener("change", testbuttons)
    passwordfield.addEventListener("change", testbuttons)
}
function testbuttons() {
    test = false
    for (i = 1; i <= testedusers.length - 1; i++) {
        if (!testedusers[i]) {
            continue
        }
        if (testedusers[i].username == usernamelogin.value) {
            confirmedemail.innerText = testedusers[i].email
            poster.value = testedusers[i].email
            confirmedphone.innerText = testedusers[i].phone
            test = true
            break
        }
    }
    if (test && !passwordfield.value == "") {
        document.getElementById("toconfirm").disabled = false
    }
}

// verification forgot password fields

if (forgotmailarea) {
    forgotmailarea.addEventListener("change", testmailfields)
}

function testmailfields() {
    test = false
    for (i = 1; i <= testedusers.length - 1; i++) {
        if (testedusers[i].email == forgotmailarea.value) {
            confirmedemail.innerText = testedusers[i].email
            document.getElementById("verifyemailaddress").textContent = forgotmailarea.value
            test = true
            break
        }
    }
    if (test) {
        document.getElementById("forgotnext").disabled = false
    }
}

function confirmaccount() {
    buttoncontinue.disabled = true
    closewindow()
    resetFormInDiv(overlays[2].id)
    document.getElementById("confirmContinue").addEventListener("click", security);
    overlays[2].style.display = "flex";
    closer();
}

// send email
function verificationCodeSender(form) {
    if (document.getElementById("getcodebyphone").checked) {
        mailto.innerText = testedusers[i].phone
    } else {
        mailto.innerText = testedusers[i].email
    }
    var formElement = document.getElementById(form);
    if (!(formElement instanceof HTMLFormElement)) {
        console.error('The selected element is not an HTMLFormElement.');
        return;
    }
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
            if (data.status == "success") {
                Swal.fire({
                    title: 'Info',
                    text: 'A verification  code has been sent to your email',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                });
                return;
            }
            else {
                Swal.fire({
                    title: 'Info',
                    text: 'Check email or phone field',
                    icon: 'info',
                    confirmButtonText: 'Ok'
                });

            }
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'An error occured',
                icon: 'info',
                confirmButtonText: 'Ok'
            });
        });
}

function security() {
    verificationCodeSender('emailform')
    closewindow()
    resetFormInDiv(overlays[3].id)
    start = 1
    overlays[3].style.display = "flex"
    document.getElementById("input1").focus()
    closer()

}

// verify mail get verifycation code

async function fetchVerificationCode() {
    try {
        const response = await fetch(`/get-verification-code/`, {
            method: 'GET',
            headers: {
                'Authorization': 'bvmVNBMBMHB24512vbnmmm45vbgfhvn53VGBHJbjghj275fgcgvnf',
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.verification_code) {
            return data.verification_code;
        } else {
            Swal.fire({
                title: 'Invalid Code!',
                text: 'Verification code is not found',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            return null;
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'An error occured',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
        return null;
    }
}

//endofsignin
function endofsignin() {
    closer()
}

function iforgotpassword() {
    closewindow()
    resetFormInDiv(overlays[4].id)
    overlays[4].style.display = "flex"
    document.getElementById("forgotnext").addEventListener("click", forgotnext)
    closer()
}

function forgotnext() {
    verificationCodeSender('forgotmailform')
    resetFormInDiv(overlays[5].id)
    overlays[5].style.display = "flex"
    start = 7
    document.getElementById("forgotVerifyNext").addEventListener("click", verifypass)
    globalemail = forgotmailarea.value
    document.getElementById("input7").focus()
    closer()
}

function verifypass() {
    closewindow()
    resetFormInDiv(overlays[6].id)
    overlays[6].style.display = "flex"
    document.getElementById("NewPasswordNext").disabled = true
    document.getElementById("NewPasswordNext").addEventListener("click", createpass)
    closer()
}

if (characterverifies) {
    characterverifies.forEach(characterverify => { characterverify.addEventListener('change', changetype) })
}

function changetype(e) {
    e.target.type = "password"
}

function moveToNext(previousFieldId, current, nextFieldId) {
    if (!current.value == "") {
        document.getElementById(nextFieldId).focus()
    } else {
        document.getElementById(previousFieldId).focus()
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



function checkcart() {
    if (wishlist) {
        if (!localStorage.getItem(userName)) {
            overlays[9].style.display = 'none';
            document.querySelector(".red").style.display = 'none'
            document.getElementById("wishview").disabled = true
        } else {
            document.querySelector(".red").style.display = 'block'
            document.getElementById("wishview").disabled = false
        }
    }

}

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        document.querySelectorAll('input[type="checkbox"]').forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;
            }
            if (checkbox.checked) {
                buttoncontinue.disabled = false;
            } else {
                buttoncontinue.disabled = true;
            }
        });
    });
});

//verifycharacter tester

let start
document.querySelectorAll(".characterverify").forEach(char => {
    char.addEventListener("change", function () {
        verifier(start);
    });
});

function verifier(start) {
    let counter = 0
    for (i = start; i <= start + 5; i++) {
        if (document.getElementById(`input${i}`).value) {
            counter++
        }
    }
    if (counter === 6) {
        let verifycharacters = ''
        document.querySelectorAll(".characterverify input").forEach(character => {
            verifycharacters += character.value;
        });
        let globalCode;
        async function main() {
            globalCode = await fetchVerificationCode();
            if (globalCode == verifycharacters) {
                document.getElementById('securityContinue').disabled = false
                document.getElementById('forgotVerifyNext').disabled = false
            } else {
                Swal.fire({
                    title: 'Invalid Code!',
                    text: 'Verification code is invalid',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        }
        main();
    }
}

// password controller

if (pass) {
    pass.forEach(passwordzone => {
        passwordzone.addEventListener('change', activator)
    })
}

function activator() {
    if (
        document.getElementById('id_new_password1').value && document.getElementById('id_new_password2').value) {
        if (document.getElementById('id_new_password1').value === document.getElementById('id_new_password2').value) {
            document.getElementById("NewPasswordNext").disabled = false
            changer()
        } else {
            Swal.fire({
                title: 'Passwords',
                text: 'Passwords is not same',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }
}

function changer() {
    const passwordChangeForm = document.getElementById('passwordchange');
    if (passwordChangeForm) {
        passwordChangeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newPassword1 = document.getElementById('id_new_password1').value;
            const newPassword2 = document.getElementById('id_new_password2').value;
            email = globalemail
            fetch('/password-change/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ new_password1: newPassword1, new_password2: newPassword2, email: email })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        overlays[7].style.display = "flex"
                    } else if (data.status === 'error') {
                        Swal.fire({
                            title: 'Error',
                            text: data.message,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    }
    if (document.getElementById("successContinue")) {
        this.addEventListener("click", () => { overlays[7].style.display = 'none' })
    }

}

// profiles

if (profilicon) {
    profilicon.addEventListener("click", toggledrop);
}

function toggledrop() {
    let profileContents = document.querySelector(".profilecontents");
    if (profileContents) {
        if (profileContents.classList.contains("showed")) {
            profileContents.classList.remove("showed");
            setTimeout(() => {
                profileContents.style.display = 'none';
            }, 300);
        } else {
            profileContents.style.display = 'flex';
            setTimeout(() => {
                profileContents.classList.add("showed");
            }, 10);

            setTimeout(() => {
                if (profileContents.classList.contains("showed")) {
                    profileContents.classList.remove("showed");
                    setTimeout(() => {
                        profileContents.style.display = 'none';
                    }, 300);
                }
            }, 3000);
        }
    }
}


if (updater && changephoto) {
    changephoto.addEventListener("click", changeprofilephoto)
}

function changeprofilephoto() {
    updater.style.display = "flex"

}

document.addEventListener('DOMContentLoaded', function () {
    let profileForm = document.getElementById('profilePictureForm');
    let profileUpdater = document.getElementById('profileUpdater');
    closer()
    if (profileForm) {
        profileForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let formData = new FormData(profileForm);
            fetch('/update-profile-picture/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        if (data.new_picture_url) {
                            document.getElementById('profilepictureimage').src = data.new_picture_url;
                            profileUpdater.style.display = 'none';
                            Swal.fire({
                                title: 'Profile picture',
                                text: 'Profile picture updated successfully!',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'An error occurred. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('bookaclass');
    if (form) {
        form.addEventListener('submit', function (event) {
            if (!isAuthenticated) {
                login()
                return;
            }
            event.preventDefault();
            if (profile_programId) {
                if (profile_programId == programId) {
                    Swal.fire({
                        title: 'Existing Program Selection',
                        text: 'This program has already been selected.',
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            document.querySelector('#bookaclass').submit();
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Change Program',
                        text: 'You are about to change your current schedule. Do you want to continue?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'Yes, change it',
                        cancelButtonText: 'No, cancel'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Program changed successfully!',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            }).then(() => {
                                document.querySelector('#bookaclass').submit();
                            });
                        }
                    });
                }
            } else {
                document.querySelector('#bookaclass').submit();
            }
        });
    }
});

// prices calculater

if (months) {
    price = parseFloat(priceElement.textContent.replace('$', ''));
    months.addEventListener("change", calculate);
    calculate();
}

function calculate() {
    let selectedMonths = parseFloat(months.value);
    if (!isNaN(selectedMonths) && selectedMonths > 0) {
        total.innerText = ` $ ${price * selectedMonths}`;
    } else {
        total.innerText = ' $ 0';
    }
}

//contact message sent

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactform');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            formData.append('form_id', form.id);
            fetch('/contact/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'X-CSRFToken': csrfToken
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: data.message,
                        })
                            .then(() => {
                                form.reset();
                            });
                    } else {
                        let errorMessages = '';
                        for (const [field, messages] of Object.entries(data.errors)) {
                            messages.forEach(error => {
                                errorMessages += error + '<br>';
                            });
                        }
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            html: errorMessages,
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'An unexpected error occurred.',
                    });
                });
        })
    };
});


//blog category accordions

document.addEventListener('DOMContentLoaded', function () {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', function () {
            const item = this.parentElement;
            const body = item.querySelector('.accordion-body');
            document.querySelectorAll('.accordion-item.active .accordion-body').forEach(openBody => {
                if (openBody !== body) {
                    openBody.classList.remove('open');
                    setTimeout(() => {
                        openBody.style.maxHeight = '0';
                        openBody.style.opacity = '0';
                    }, 500);
                    item.classList.remove('active');
                }
            });
            if (body.classList.contains('open')) {
                body.classList.remove('open');
                setTimeout(() => {
                    body.style.maxHeight = '0';
                    body.style.opacity = '0';
                }, 500);
                item.classList.remove('active');
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
                body.style.opacity = '1';
                body.classList.add('open');
                item.classList.add('active');
            }
        });
    });
});


if (faqform) {
    faqform.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        formData.append('form_id', this.id);
        fetch('/faq/', {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    icon: data.status === 'success' ? 'success' : 'error',
                    title: data.status === 'success' ? 'Success' : 'Error',
                    text: data.message,
                });
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong!',
                });
            });
    });
}


// plan purchase login reguired control

function sentsale(months, planId) {
    const url = `${window.location.origin}/payment/${planId}/${months}/`;
    console.log('Redirecting to:', url);
    window.location.href = url;
}
purchaseButton = document.getElementById('purchasebutton');
if (purchaseButton) {
    planIdElement = document.getElementById('planId');
    const planId = planIdElement.textContent.trim();
    if (purchaseButton && planIdElement) {
        purchaseButton.addEventListener('click', testIsAuth);
    }
    function testIsAuth(event) {
        event.preventDefault();
        if (!isAuthenticated) {
            login();
        } else {
            console.log(months.value + planId)
            sentsale(months.value, planId)
        }

    }
}

// wishlist to paymentpage

let selectandpay = document.getElementById('selectandpay')

if (selectandpay) {
    selectandpay.addEventListener('click', selector)
}

async function selector() {
    try {
        const wishId = resulter[currentIndex];

        const response = await fetch(`/wishlistcont/${wishId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken
            }
        });

        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received:', data);

        if (data.error) {
            console.error('Error:', data.error);
            return;
        }
        const { user: userId, plan: planid, added_at: addedAt, amount, months: month } = data;

        console.log(`Months: ${month}, Plan ID: ${planid}`);
        sentsale(month, planid);


    } catch (error) {
        console.error('Fetch error:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const addToCartButton = document.getElementById('addtocart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', testisauth)
    }
    function testisauth(event) {
        const months = document.getElementById("months").value
        const planId = document.getElementById("planId").textContent;
        event.preventDefault();
        if (!isAuthenticated) {
            login();
        } else {
            fetch(`/add_to_wishlist/${planId}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ months })
            })
                .then(response => response.json())
                .then(data => {
                    Swal.fire({
                        icon: data.status === 'success' ? 'success' : 'error',
                        title: data.status === 'success' ? 'Success' : 'Error',
                        text: data.message,
                    });
                })
                .then(() => {
                    temporary[userName] = planId
                    localStorage.setItem(userName, temporary);
                    checkcart()
                })
        }
    }
});

if (wishview) {
    wishview.addEventListener("click", wishviewer)
}




function wishviewer() {
    closewindow();
    overlays[9].style.display = 'flex';
    fetch(`/wishlist/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken
        }
    })
        .then(response => response.json())
        .then(data => {
            const wishlistItems = document.getElementById('wishlist-items');
            wishlistItems.innerHTML = '';
            if (data.status === 'success') {
                let startid = 0;
                data.wishlist_items.forEach(item => {
                    resulter[startid] = item.id;
                    localStorage.setItem("wishlist", JSON.stringify(resulter));
                    startid++;
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                    <span id="planidhidden" style="display: block;">${item.id}</span>
                    <strong>Plan: </strong> ${item.plan.name} <br><br>
                    <strong>User: </strong> ${item.user.username} <br><br>
                    <strong>Amount: </strong> $ ${item.amount} <br><br>
                    <strong>Months: </strong> ${item.months} <br><br>
                    <strong>Added At: </strong> ${new Date(item.added_at).toLocaleString()}
                `;
                    wishlistItems.appendChild(listItem);
                });
                console.log(resulter);
                setupSliderfunc();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message,
                });
            }
        })
        .catch(error => {
            closewindow();
            localStorage.removeItem(userName);
            localStorage.removeItem("wishlist")
            checkcart();
            Swal.fire({
                icon: 'info',
                title: 'Info',
                text: 'Your wishlist is empty',
            });
        });

    closer();
}


function setupSliderfunc() {
    const itemsWrapper = document.getElementById('wishlist-items-wrapper');
    const items = document.getElementById('wishlist-items');
    prevBtn = document.getElementById('prev-btn');
    const itemWidth = items.querySelector('li').offsetWidth;
    const itemCount = items.children.length;
    nextBtn = document.getElementById('next-btn');

    function updateButtons() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= itemCount - 1;
    }

    function moveTo(index) {
        items.style.transform = `translateX(-${index * itemWidth}px)`;
        currentIndex = index;
        updateButtons();
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveTo(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < itemCount - 1) {
            moveTo(currentIndex + 1);
        }
    });
    updateButtons();
}

if (wishdelete) {
    wishdelete.addEventListener('submit', function (event) {
        event.preventDefault();
        const formData = new FormData(this);
        wishId = resulter[currentIndex]
        formData.append('form_id', this.id);
        fetch(`/wishdelete/${wishId}/`, {
            method: 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRFToken': csrfToken
            }
        })
            .then(response => response.json())
            .then(data => {
                Swal.fire({
                    icon: data.status === 'success' ? 'success' : 'error',
                    title: data.status === 'success' ? 'Success' : 'Error',
                    text: data.message,
                });
            })
            .then(() => {
                delete resulter[currentIndex];
                if (Object.keys(resulter).length === 0) {
                    localStorage.removeItem(userName)
                    temporary = {}
                    localStorage.removeItem("wishlist")
                    checkcart()
                } else {
                    wishviewer()
                    prevBtn.click()
                }
            })
    })
};


//payment checkboxes

const paypalCheckbox = document.getElementById('paypal');
const applepayCheckbox = document.getElementById('applepay');

if (paypalCheckbox) {
    paypalCheckbox.addEventListener('change', handleCheckboxChange);
    applepayCheckbox.addEventListener('change', handleCheckboxChange);
}
function handleCheckboxChange() {
    if (paypalCheckbox.checked) {
        applepayCheckbox.checked = false;
    } else if (applepayCheckbox.checked) {
        paypalCheckbox.checked = false;
    } else {
        paypalCheckbox.checked = false;
        applepayCheckbox.checked = false;
    }
}


let confirmpay = document.getElementById('confirmpay')
if (confirmpay) {
    confirmpay.addEventListener('click', payandsave)
}

async function payandsave() {
    console.log(currentIndex);
    let storedData = localStorage.getItem("wishlist");
    if (!storedData) {
        console.log("This sale without  wishlist");
        let plan_id
        let total_amount
        if (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const formData = new FormData(this);
                try {
                    const response = await fetch(`/purchase/${plan_id}/${total_amount}/`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRFToken': csrfToken
                        }
                    });
                    const data = await response.json();
                    await Swal.fire({
                        icon: data.status === 'success' ? 'success' : 'error',
                        title: data.status === 'success' ? 'Success' : 'Error',
                        text: data.message
                    });
                    wishviewer();
                } catch (error) {
                    await Swal.fire({
                        title: 'Error',
                        text: 'An error occurred',
                        icon: 'error'
                    });
                }
            });
        }









        return;
    } else {
        console.log("This sale with wishlist");
        let parsedData = JSON.parse(storedData);
        let wishId = parsedData[currentIndex];
        const form = document.getElementById('confirmandpay');
        if (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                const formData = new FormData(this);
                try {
                    const response = await fetch(`/wishlist/purchase/${wishId}/`, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest',
                            'X-CSRFToken': csrfToken
                        }
                    });
                    const data = await response.json();
                    await Swal.fire({
                        icon: data.status === 'success' ? 'success' : 'error',
                        title: data.status === 'success' ? 'Success' : 'Error',
                        text: data.message
                    });
                    wishviewer();
                } catch (error) {
                    await Swal.fire({
                        title: 'Error',
                        text: 'An error occurred',
                        icon: 'error'
                    });
                }
            });
        }
    }
}

if (cardholder || cardnumber || expiry || cvv) {
    cardholder.addEventListener('change', paytester);
    cardnumber.addEventListener('change', paytester);
    expiry.addEventListener('change', paytester);
    cvv.addEventListener('change', paytester);
    postal.addEventListener('change', paytester);
    paypal.addEventListener('change', paytester);
    applepay.addEventListener('change', paytester);
}

function paytester() {
    if (paypal.checked == true) {
        paymethod = "paypal"
    } else if (applepay.checked == true) {
        paymethod = "applepay"
    } else if (paypal.checked == false && applepay.checked == false) {
        if (cardholder.value != '' && cardnumber.value != '' && expiry.value != '' && cvv.value != '' && postal.value != '') {
            paymethod = "card"
        }
    }
    if (paymethod) {
        confirmpay.disabled = false
    }
}







// get CSRF token
// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

//Mirqafar js kodlar

const lists = [...document.querySelectorAll(".introduction_col")];
lists.map((li) => {
    const p = li.querySelector("p");
    const icon = li.querySelector(".fa-solid");
    if (li.classList.contains("open")) {
        p.style.height = p.scrollHeight + "px";
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
    }
    li.querySelector(".accordion_header").addEventListener("click", () => {
        if (p.style.height && p.style.height !== "0px") {
            p.style.height = 0;
            icon.classList.remove("fa-angle-up");
            icon.classList.add("fa-angle-down");
            return;
        }
        lists.forEach((otherLi) => {
            if (otherLi !== li) {
                const otherP = otherLi.querySelector("p");
                const otherIcon = otherLi.querySelector(".fa-solid");
                otherP.style.height = 0;
                otherIcon.classList.remove("fa-angle-up");
                otherIcon.classList.add("fa-angle-down");
            }
        });
        p.style.height = p.scrollHeight + "px";
        icon.classList.remove("fa-angle-down");
        icon.classList.add("fa-angle-up");
    });
});







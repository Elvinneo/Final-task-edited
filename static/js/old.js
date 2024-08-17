// function testLoggedIn() {
//     document.addEventListener('DOMContentLoaded', function () {
//         var configElement = document.getElementById('config-data');
//         var configData = JSON.parse(configElement.textContent);
//         var isLoggedIn = configData.is_authenticated;
//         if (!isLoggedIn) {
//             login()
//         }
//         else {
//             loginbuttons.forEach(button => {
//                 button.textContent = "Logout"
//             })
//         }
//     });
// }

// testLoggedIn()


// function login(e) {
//     console.log(e)
//     if (e.target.textContent === "Login") {
//         closewindow()
//         overlays[1].style.display = "flex"
//         closer()
//         document.getElementById("toconfirm").addEventListener("click", confirmaccount)
//         document.getElementById("forgotpassword").addEventListener("click", iforgotpassword)
//         document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mousedown", textviewer) })
//         document.querySelectorAll(".eye").forEach(eye => { eye.addEventListener("mouseup", passwordviewer) })
//     }
// }

// //ajax


// document.getElementById('form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Sayfanın yenilenmesini engeller

//     const form = event.target;
//     const formData = new FormData(form);
//     const action = formData.get('action');

//     fetch('/your-url/', {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'X-Requested-With': 'XMLHttpRequest' // Django CSRF token'ı için gerekli
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             document.getElementById('responseMessage').textContent = data.message;
//         } else {
//             document.getElementById('responseMessage').textContent = 'Bir hata oluştu: ' + data.message;
//         }
//     })
//     .catch(error => {
//         console.error('Hata:', error);
//     });
// });


// <form id="form" method="post">
// {% csrf_token %}
// <button class="loginButton" id="login" type="submit" name="login">Login</button>
// <button class="signupButton" id="signup" type="submit" name="signup">Signup</button>
// </form>


// def home_view(request):
//     if request.method == 'POST':
//         if request.user.is_authenticated:
//             logout(request)
//             return redirect('home')
//         else:
//             form = AuthenticationForm(request, data=request.POST)
//             if form.is_valid():
//                 user = form.get_user()
//                 login(request, user)
//                 return redirect('home')
//             else:
//                 return render(request, 'home.html')
//     else:
//         form = AuthenticationForm()
//     return render(request, 'home.html')


// function fetchVerificationCode() {
//     fetch(`/get-verification-code/`)
//         .then(response => response.json())
//         .then(data => {
//             if (data.verification_code) {
//                 const code = data.verification_code;
//                 console.log('Your verification code is: ' + code);
//             } else {
//                 console.log('Your verification code is not found: ' + code);
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching verification code:', error);
//         });
//         return code
// }
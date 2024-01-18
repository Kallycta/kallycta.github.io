const email = document.querySelector("#email-2");
const password = document.querySelector("#password");
const btn = document.querySelector("#btn-submit");
const errorMes = document.querySelector(".error-mes");
const form = document.querySelector('#wf-form-Signin-Form');

console.log(form)

function checkPassword(input) {
    if ( password.value.length > 0 ) {
        showSuccess(input)
        return true
    } else {
        showError(input);
        return false
    }
}
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input)
        return true
    } else {
        showError(input, 'Email is not invalid');
        return false
    }
}

function showSuccess(input) {
    const formControl = input.parentElement;
    if (formControl) {
        input.classList.remove('error');
        formControl.classList.remove('error');
        const small = formControl.parentElement.querySelector(".extra");
        if (small) {
            small.style.display = "none";
        } 
    }
}
const showError = (input) => {
    const formControl = input.parentElement;
    formControl.classList.add("error");
    input.classList.add("error");
    if (formControl) {
        formControl.classList.add("error");

        const small = formControl.parentElement.querySelector(".extra");
        if (small) {
            small.style.display = "block";
            // small.textContent = msg;
        } else {
            const smallParent = formControl.parentElement;
            const smallPhone = smallParent.parentElement.querySelector(".extra");
            if (smallPhone) {
                smallPhone.style.display = "block";
                // smallPhone.textContent = 'Phone not valid';
            }
        }

    }
};

const validateForm = () => {
    const validateResult = [
          checkEmail(email),
    checkPassword(password)
    ]
    return validateResult.every(v => v === true)
};

    form.addEventListener("submit",  (e) => {
    console.log('submit')
    e.preventDefault();
    e.stopPropagation();

    if(validateForm()) {
        console.log('ok')
        sendData();
    } else {
        console.log('ne ok')
    }
})

    function sendData() {
        errorMes.style.display = "none";
        const XHR = new XMLHttpRequest();
        
        const formDataObj = {
            password: password.value,
            email: email.value
        };

        console.log(formDataObj)
        
        const sendObject = JSON.stringify(formDataObj)
   console.log(sendObject)
        XHR.onload = () => {
            console.log(XHR)
            if (XHR.readyState === 4) {
                if (XHR.status === 200 || XHR.status === 201) {
                    var myobj = JSON.parse(XHR.response)
                    console.log(myobj)
                    if(myobj.token) {
                        // window.location.href = `http://localhost:4201/?is_login=${myobj.token}&current_page=/pages/dashboard`
                      // window.location.href = `http://localhost:4201/pages/dashboard?is_login=${myobj.token}&current_page=/pages/dashboard`
                        setTimeout(()=> {
                            // window.open(`http://localhost:3201/pages/dashboard?is_login=${myobj.token}&current_page=/pages/dashboard`, '_self');
                            window.location.href = `http://localhost:4201/pages/dashboard?is_login=${myobj.token}&current_page=/pages/dashboard`
                        }, 500)
                       
                    } else {
                           // window.location.href = `https://new.app.convolo.ai/pages/pbx/self-onboarding?is_login=${myobj.token}`
                    }
              // http://localhost:4201/security/login?is_login=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDYwMDQ5MDgsImljYklkIjo3MDUxOSwidmVyIjoidjEiLCJpYXQiOjE3MDU0MDAxMDh9.-3-hIQivnmBTgYAgBe-qvzdcM5uvWw8SQ9MEGPsKdJw&current_page=/pages/dashboard
                } else {
                    errorMes.style.display = "flex";
                    if (XHR.response) {
                        const responseJson = JSON.parse(XHR.response)
                        if (errorTextMes) {
                            errorTextMes.textContent = responseJson.message
                                console.error(errorTextMes);
                            }
                        } else {
                            // console.log('no errorTextMes')
                        }
                    }  
                        // console.log('no XHR.response')
                }
        };

        XHR.open("POST", "https://api.leads.convolo.ai/api/v1/auth/login"); 
        XHR.setRequestHeader("Content-type", "application/json");
        XHR.setRequestHeader("Access-Control-Allow-Origin", "*");
        XHR.send(sendObject);
    } 

// https://api.leads.convolo.ai/api/v1/auth/login


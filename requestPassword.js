const email = document.querySelector("#email-3");
const message = document.querySelector("#message-check");
const messageBlock = document.querySelector("#message-block");
const formBlock = document.querySelector("#containter-form");
const btn = document.querySelector("#btn-submit"); 
const form = document.querySelector('#wf-form-Signin-Form');

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
    ]
    return validateResult.every(v => v === true)
};

    form.addEventListener("submit",  (e) => {
    console.log('submit')
    e.preventDefault();
    e.stopPropagation();

    if(validateForm()) {
        console.log('ok')
        // sendData();
    } else {
        console.log('ne ok')
    }
})

function sendData() {
        errorMes.style.display = "none";
        const XHR = new XMLHttpRequest();
        
        const formDataObj = {
            email: email.value
        };

        console.log(formDataObj)
        
        const sendObject = JSON.stringify(formDataObj)

        XHR.onload = () => {
            console.log(XHR)
            if (XHR.readyState === 4) {
                if (XHR.status === 200 || XHR.status === 201) {
                    var myobj = JSON.parse(XHR.response)
                    console.log(myobj)
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
// https://api.leads.convolo.ai/api/v1/auth/request-pass

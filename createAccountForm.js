const form = document.querySelector("#create-account-form");
const users = document.querySelector('#Users');
const fullName = document.querySelector('#full_name-2');
const email = document.querySelector("#email-2");
const companyName = document.querySelector("#company_name-3");
const phone = document.querySelector("#phone_number-2");
const agree = document.querySelector("#terms");
// const selectedState = document.querySelector("#select-field-2")
const selectedState = null;
const parentSelect = document.querySelector("#parent-select")

const errorMes = document.querySelector(".error-mes");
const errorTextMes = document.querySelector("#text-error-message");
if (agree) {
    agree.addEventListener('click', () => {
        if (agree.checked) {
            showSuccess(agree);
            if (errorMes) {
                errorMes.style.display = "none";
            }
        } else {
            showError(agree, `Please agree to the Convolo Terms of Service`)
        }
    })
}

const showError = (input, msg) => {

    if(input.tagName === 'SELECT') {
        const formControl = document.querySelector("#parent-state-dd");
        console.log(formControl)
        formControl.classList.add("error");
        input.classList.add("error");
        if (formControl) {
            formControl.classList.add("error");
            const small = formControl.parentElement.querySelector(".extra");
            console.log(small);
            if (small) {
                small.style.display = "block";
                // small.textContent = msg;
        }
        }
    } else {
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
                const checkbox = formControl.querySelector(".w-checkbox-input");
                if (checkbox) {
                    checkbox.classList.add("error");
                }
            }
        }
    };

    function showSuccess(input) {
        if(input) {
            if(input.tagName === 'select') {
            console.log(input)
        const formControl = parentSelect;
        if (formControl) {
            input.classList.remove('error');
            formControl.classList.remove('error');
            const small = formControl.parentElement.querySelector(".extra");
            if (small) {
                small.style.display = "none";
            } else {
                const smallParent = formControl.parentElement;
                const smallPhone = smallParent.parentElement.querySelector(".extra");
                if (smallPhone) {
                    smallPhone.style.display = "none";
                }
            }
        }

} else {
        console.log(input)
        console.log(input.parentElement)
        const formControl = input.parentElement;
        if (formControl) {
            input.classList.remove('error');
            formControl.classList.remove('error');
            const small = formControl.parentElement.querySelector(".extra");
            if (small) {
                small.style.display = "none";
            } else {
                const smallParent = formControl.parentElement;
                const smallPhone = smallParent.parentElement.querySelector(".extra");
                if (smallPhone) {
                    smallPhone.style.display = "none";
                }
            }
        }
            }
        }


    }

//check email is valid
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


//checkRequired fields
    function checkRequired(inputArr) {
        let check = true
        inputArr.forEach(function(input) {
            console.log(input)
            if (input && (input.value !== undefined) && (input.value.trim() === '')) {
                showError(input, `${getFieldName(input)} is required`)
                check = false
            } else {
                showSuccess(input);
            }
        });
        return check
    }

    function checkSelectedState(select) {
        console.log(select.value)
        if (select && select?.value) {
        console.log(select && select?.value)
            if (select.value === 'State') {
                 console.log(select.value === 'State')
                showError(select, 'Please choose a state from the dropdown list.');
                return false
            } else {
                console.log('else')
                showSuccess(select);
                return true
                
            }
        }
        console.log('not if')
    }

    const getFieldName = (input) => {
        const firstLetter = input.id.charAt(0).toUpperCase();
        return firstLetter + input.id.slice(1);
    };


    const checkLength = (input, min, max) => {
        if (input.value.length < min || input.value.length > max) {
            showError(
                input,
                `${getFieldName(
                    input
                )} must be between ${min} and ${max} characters long`
            );
            return false
        } else {
            return true
        }
    };

    const checkAgree = (input) => {
        if (input.checked) {
            showSuccess(input);
        } else {
            showError(input, `Please agree to the Convolo Terms of Service`)
        }
        return input.checked
    }

    const checkPhone = (input) => {
        if (window.isValidNumber) {
            showSuccess(input);
        } else {
            // showError(input, `${getFieldName(input)} is not valid`)
            showError(input, `Phone is not valid`)
        }
        return window.isValidNumber
    }

    const validateForm = () => {
        const validateResult = [
            // checkRequired([email, password, passwordConfirmation]),
            checkRequired([email, companyName, fullName, users]),
            checkEmail(email),
           // checkSelectedState(selectedState),
            // checkPasswordMatch(passwordConfirmation, password),
            checkPhone(phone),
            checkAgree(agree)
        ]
        console.log(validateResult)
        return validateResult.every(v => v === true)
    };


    form.addEventListener("submit", function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (validateForm()) {
            sendData()
            console.log('valide form')
        } else {
            console.log('error')
        }
    });


    function sendData() {
        errorMes.style.display = "none";
        const XHR = new XMLHttpRequest();
        const FD = new FormData(form);
        const formDataObj = {};

        FD.delete("terms")
        FD.forEach((value, key) => {
            if(formDataObj[key] === 'state') {
                 formDataObj[key] = key
            } else {
                 formDataObj[key] = value
            }
           
        });
       console.log(formDataObj);
        formDataObj.agree_to_terms = true;
        
        const sendObject = `${JSON.stringify(formDataObj).substr(0, JSON.stringify(formDataObj).length - 1)}` + `, "terms": ${agree.checked} }`

        XHR.onload = () => {
            if (XHR.readyState === 4) {
                if (XHR.status === 200 || XHR.status === 201) {
                    console.log(XHR)

                    window.location.href = 'https://app.convolo.ai/pages/pbx/self-onboarding';
              
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

        XHR.open("POST", "https://api.leads.convolo.ai/api/v2/auth/register-self-onboarding"); 
        XHR.setRequestHeader("Content-type", "application/json");
        XHR.setRequestHeader("Access-Control-Allow-Origin", "*");
        XHR.send(sendObject);
    } 

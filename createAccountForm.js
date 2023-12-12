const form = document.querySelector("#signup-form");
const email = document.querySelector("#email-2");
const name = document.querySelector("#name");
const affiliate = document.querySelector("#Affiliate-2");
const password = document.querySelector("#password");
// const passwordConfirmation = document.querySelector("#confirm_password");
const phone = document.querySelector("#phone_number-2");
const promoCode = document.querySelector("#promo_code-2");
const agree = document.querySelector("#terms");
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
    const formControl = input.parentElement;
    formControl.classList.add("error");
    input.classList.add("error");
    if (formControl) {
        formControl.classList.add("error");

        const small = formControl.parentElement.querySelector(".extra");
        if (small) {
            small.style.display = "block";
            small.textContent = msg;
        } else {
            const smallParent = formControl.parentElement;
            const smallPhone = smallParent.parentElement.querySelector(".extra");
            if (smallPhone) {
                smallPhone.style.display = "block";
                smallPhone.textContent = 'Phone not valid';
            }
        }
        const checkbox = formControl.querySelector(".w-checkbox-input");
        if (checkbox) {
            checkbox.classList.add("error");
        }
    }
};

function showSuccess(input) {
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
        if (input && (input.value !== undefined) && (input.value.trim() === '')) {
            showError(input, `${getFieldName(input)} is required`)
            check = false
        } else {
            showSuccess(input);
        }
    });
    return check
}

// const checkPasswordMatch = (input1, input2) => {
//     if (input1.value !== input2.value) {
//         showError(input1, "Passwords must match");
//         return false
//     } else {
//         showSuccess(input1);
//         return true
//     }
// };


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
        checkRequired([email, password, name]),
        checkLength(password, 8, 30),
        checkEmail(email),
        // checkPasswordMatch(passwordConfirmation, password),
        checkPhone(phone),
        checkAgree(agree)
    ]
    return validateResult.every(v => v === true)
};


form.addEventListener("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (validateForm()) {
        sendData()
    } else {
        console.log('error')
    }
});


function sendData() {
    errorMes.style.display = "none";
    const XHR = new XMLHttpRequest();
    const FD = new FormData(form);
    const formDataObj = {};
    const promo = FD.get("promo_code");
    if (!promo) FD.set("promo_code", '')
    if (window.selectedCountryCode) {
        // console.log('window.selectedCountryCode', window.selectedCountryCode)
        formDataObj['country_code'] = window.selectedCountryCode;
    } else {
        // console.log('no window.selectedCountryCode', window.selectedCountryCode)
    }


    FD.delete("terms")
    FD.forEach((value, key) => (formDataObj[key] = value));
    if (window.internationalNumber) {
        // console.log('window.internationalNumber', window.internationalNumber)
        formDataObj['phone_number'] = window.internationalNumber;
    } else {
        // console.log('no window.internationalNumber', window.internationalNumber)
    }

    const utm_sourceFromLocalStorage = window.localStorage.getItem('utm_source')
    const utm_campaignFromLocalStorage = window.localStorage.getItem('utm_campaign')
    const utm_contentFromLocalStorage = window.localStorage.getItem('utm_content')
    const utm_termFromLocalStorage = window.localStorage.getItem('utm_term')
    const utm_mediumFromLocalStorage = window.localStorage.getItem('utm_medium')

    if (utm_sourceFromLocalStorage) {
        formDataObj['utm_source'] = utm_sourceFromLocalStorage
    }

    if (utm_campaignFromLocalStorage) {
        formDataObj['utm_campaign'] = utm_campaignFromLocalStorage
    }

    if (utm_contentFromLocalStorage) {
        formDataObj['utm_content'] = utm_contentFromLocalStorage
    }

    if (utm_termFromLocalStorage) {
        formDataObj['utm_term'] = utm_termFromLocalStorage
    }

    if (utm_mediumFromLocalStorage) {
        formDataObj['utm_medium'] = utm_mediumFromLocalStorage
    }

    const paramPartner = window.localStorage.getItem('paramPartner');
    if (paramPartner) {
        formDataObj['Affiliate'] = paramPartner;
        formDataObj['utm_source'] = 'Affiliate'
        formDataObj['utm_campaign'] = paramPartner
    } else {
        // console.log('no paramPartner')
    }


    const sendObject = `${JSON.stringify(formDataObj).substr(0, JSON.stringify(formDataObj).length - 1)}` + `, "terms": ${agree.checked} }`

    XHR.onload = () => {
        if (XHR.readyState === 4) {
            if (XHR.status === 200 || XHR.status === 201) {

                window.location.href = 'https://convolo.ai/success';
                // Google analytics
                if (window.dataLayer) {
                    let sendEvent = "SIGNUP_FORM_SUBMIT"
                    console.log('window.countryCodeGlobal', window.countryCodeGlobal)
                    if (window.countryCodeGlobal && euArray && euArray.includes(window.countryCodeGlobal.toUpperCase())) {
                        sendEvent = "SIGNUP_FORM_SUBMIT_EU"
                    }
                    if (window.countryCodeGlobal && naArray && naArray.includes(window.countryCodeGlobal.toUpperCase())) {
                        sendEvent = "SIGNUP_FORM_SUBMIT_NA"
                    }
                    if (window.countryCodeGlobal && meArray && meArray.includes(window.countryCodeGlobal.toUpperCase())) {
                        sendEvent = "SIGNUP_FORM_SUBMIT_ME"
                    }
                    if (window.countryCodeGlobal && asiaArray && asiaArray.includes(window.countryCodeGlobal.toUpperCase())) {
                        sendEvent = "SIGNUP_FORM_SUBMIT_ASIA"
                    }
                    if (window.countryCodeGlobal && latamArray && latamArray.includes(window.countryCodeGlobal.toUpperCase())) {
                        sendEvent = "SIGNUP_FORM_SUBMIT_LATAM"
                    }
                    window.dataLayer.push({event: sendEvent});
                }
                if ($FPROM) {
                    $FPROM.trackSignup(
                        { email: formDataObj.email},
                        // function(){console.log('Callback received!')}
                        );
                } else {
                    // console.log('no $FPROM')
                }

            } else {
                errorMes.style.display = "flex";
                if (XHR.response) {
                    const responseJson = JSON.parse(XHR.response)
                    if (errorTextMes) {
                        errorTextMes.textContent = responseJson.message
                        if (responseJson.message === 'wrong promo code') {
                            setTimeout(() => {
                                window.location = "https://convolo.ai/success";
                            }, 2000)
                        }
                    } else {
                        // console.log('no errorTextMes')
                    }
                } else {
                    // console.log('no XHR.response')
                }
            }
        }
    };

    XHR.open("POST", "https://api.leads.convolo.ai/api/v2/auth/register");
    XHR.setRequestHeader("Content-type", "application/json");
    XHR.setRequestHeader("Access-Control-Allow-Origin", "*");
    XHR.send(sendObject);
}

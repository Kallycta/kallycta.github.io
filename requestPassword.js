const email = document.querySelector("#email-3");
const message = document.querySelector("#message-check");
const messageBlock = document.querySelector("#message-block");
const formBlock = document.querySelector("#containter-form");
const btn = document.querySelector("#btn-submit"); 



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

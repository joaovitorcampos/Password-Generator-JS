let passwordLength = 16;//Starts password length
//Starts constants for query selectors on IDs
const inputEl = document.querySelector("#password");
const upperCaseCheckEl = document.querySelector("#uppercase-check");
const numberCheckEl = document.querySelector("#number-check");
const securityIndicatorBarEl = document.querySelector("#security-indicator-bar");
const specialCheckEl = document.querySelector("#special-check");
function generatePassword() {//Generates an random password
    let chars = "abcdefghijklmnpqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNPQRSTUVWXY";
    const numberChars = "1234567890";
    const specialChars = "?!@&*()";
    if (upperCaseCheckEl.checked) {//If upper case is checked, adds upper case characters into chars constant
        chars += uppercaseChars;
    }
    if (numberCheckEl.checked) {//If number is checked, adds numbers characters into chars constant
        chars += numberChars;
    }
    if (specialCheckEl.checked) {//If special is checked, adds special characters into chars constant
        chars += specialChars;
    }
    let password = "";//Starts an empty password
    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);//Gets a random number based on chars length
        password += chars.substring(randomNumber, randomNumber + 1);//Adds to password a random character from chars
    }
    inputEl.value = password;
    calculateSecurity();
    calculateFontSize();
    //console.log(password);
}
function calculateSecurity() {
    const percent = Math.round((passwordLength / 64) * 40 + (upperCaseCheckEl.checked ? 15 : 0) + (numberCheckEl.checked ? 20 : 0) + (specialCheckEl.checked ? 25 : 0));//Makes an percentage based on Elements checked and password length
    securityIndicatorBarEl.style.width = `${percent}%`
    if (percent < 25) {//Displays critical bar (red)
        securityIndicatorBarEl.classList.add("critical");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.remove("safe");
        document.querySelector("#security-indicator-text").innerText="Not an safe password"
    } else if (percent >= 25 && percent <= 60) {//Displays warning bar (yellow)
        securityIndicatorBarEl.classList.add("warning");
        securityIndicatorBarEl.classList.remove("critical");
        securityIndicatorBarEl.classList.remove("safe");
        document.querySelector("#security-indicator-text").innerText="An avarage password"
    } else {//Displays safe bar (green)
        securityIndicatorBarEl.classList.add("safe");
        securityIndicatorBarEl.classList.remove("warning");
        securityIndicatorBarEl.classList.remove("critical");
        document.querySelector("#security-indicator-text").innerText="An safe password"
    }//Adjusts bar for 100%
    if (percent === 100) {
        securityIndicatorBarEl.classList.add("completed");
    } else {
        securityIndicatorBarEl.classList.remove("completed");
    }
    //console.log(percent);
}
function calculateFontSize() {//Makes font lower 
    if (passwordLength > 42) {
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-sm");
        inputEl.classList.add("font-xxs");
    } else if (passwordLength >= 32) {
        inputEl.classList.remove("font-sm");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.add("font-xs");
    } else if (passwordLength >= 22) {
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.add("font-sm");
    } else {
        inputEl.classList.remove("font-xs");
        inputEl.classList.remove("font-xxs");
        inputEl.classList.remove("font-sm");
    }
}
function copy() {//copy password into clipboard
    navigator.clipboard.writeText(inputEl.value);
}
const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", function () {//Adjusts password length bar
    passwordLength = passwordLengthEl.value;
    document.querySelector("#password-length-text").innerText = passwordLength;
    //console.log(passwordLength);
    generatePassword();
});
upperCaseCheckEl.addEventListener("click", generatePassword);
numberCheckEl.addEventListener("click", generatePassword);
specialCheckEl.addEventListener("click", generatePassword);
document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);
document.querySelector("#renew").addEventListener("click", generatePassword);
generatePassword();
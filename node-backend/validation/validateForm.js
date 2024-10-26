const config = require('../config/config.json');
// password complexity check

function isPasswordComplex(password) {
    const { minLength, requireUppercase, requireLowercase, requireNumbers, requireSpecialCharacters } = config.password;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // const existInDictionary = !dictionary.includes(password);


    return password.length >= minLength &&
        (!requireUppercase || hasUppercase) &&
        (!requireLowercase || hasLowercase) &&
        (!requireNumbers || hasNumbers) &&
        (!requireSpecialCharacters || hasSpecial);
}

function isEmailFormat(email) {
    // email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email && emailRegex.test(email);
}

const formValidation = function (formData) {
    for (const [key, value] of Object.entries(formData)) {
        if (value !== '') {
            if (key.toLowerCase().includes("email")) {
                if (!isEmailFormat(value))
                    return 'Recipient email is not in a valid format';
            }
            else if (key.toLowerCase().includes("password")) {
                if (!isPasswordComplex(value))
                    return 'Password does not meet complexity requirements';
            }
        }
        else {
            return 'Please fill all fields';
        }

    }
    return '';
}

module.exports = { formValidation };
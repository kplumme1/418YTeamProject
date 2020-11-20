const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
    let errors = {};

// Convert empty fields to an empty string so we can use validator functions
    data.name = !Validator.isEmpty(data.name) ? data.name : "";
    data.email = !Validator.isEmpty(data.email) ? data.email : "";
    data.password = !Validator.isEmpty(data.password) ? data.password : "";
// Name checks
    if (Validator.isEmpty(data.name)) {
        errors.name = "Username field is required";
    }
    if (data.name.length > 16 || data.name.length < 6) {
        errors.name = "Username is not between 6 and 16 characters";
    }
// Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
// Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    } else {
        if (!data.password.match("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()-+=_])(?=.*[0-9]).{8,100}$")) {
        errors.password = "Password must meet requirements";
        }
    }
    return {
        errors,
        isValid: (errors.name == null && errors.password == null && errors.email == null)
    };
};
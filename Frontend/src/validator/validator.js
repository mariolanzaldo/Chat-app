import validate from 'validator';
import { t } from 'i18next';

export const validator = (values, fieldName) => {
    let errors = {};
    switch (fieldName) {
        case "username":
            validateUsername(values.username, errors);
            break;
        case "firstName":
            validateFirstName(values.firstName, errors);
            break;
        case "lastName":
            validateLastName(values.lastName, errors);
            break;
        case "email":
            validateEmail(values.email, errors);
            break;
        case "password":
            validatePassword(values.password, errors);
            break;
        case "confirmPassword":
            validateConfirmPassword(values.password, values.confirmPassword, errors);
            break;
        default:
            break;
    }
    return errors;
}

function validateFirstName(firstName, errors) {
    let result = true;

    if (!firstName) {
        errors.firstName = t("firstNameError");
        result = false;
    }

    return result;
}

function validateLastName(lastName, errors) {
    let result = true;

    if (!lastName) {
        errors.lastName = t("lastNameError");
        result = false;
    }

    return result;
}

function validateUsername(username, errors) {
    let result = true;
    if (!username) {
        errors.username = t("usernameError");
        result = false;
    }

    return result;
}

function validatePassword(password, errors) {
    let result = true;
    const valid = validate.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: true,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
    });
    if (!password) {
        errors.password = t("passwordErrorReq");
        result = false;
    } else if (valid < 50) {
        errors.password = t("passwordError");
    }

    return result;
}

function validateConfirmPassword(password, confirmPassword, errors) {
    let result = true;
    if (!confirmPassword) {
        errors.password = t("confirmPasswordErrorReq");
        result = false;
    } else if (password !== confirmPassword) {
        errors.confirmPassword = t("confirmPasswordError");
        result = false;
    }

    return result;
}

function validateEmail(email, errors) {
    let result = true;
    if (!email) {
        errors.email = t("emailErrorReq");
        result = false;
    } else {
        result = validate.isEmail(String(email).toLocaleLowerCase());
        if (!result) errors.email = t("emailError");
    }
    return result;
}
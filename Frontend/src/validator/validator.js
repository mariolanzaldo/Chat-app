import validate from 'validator';
import { t } from 'i18next';

export const validator = (values, fieldName, existence) => {
    let errors = {};
    switch (fieldName) {
        case "username":
            validateUsername(values.username, errors, existence);
            break;
        case "firstName":
            validateFirstName(values.firstName, errors);
            break;
        case "lastName":
            validateLastName(values.lastName, errors);
            break;
        case "email":
            validateEmail(values.email, errors, existence);
            break;
        case "password":
            validatePassword(values.password, values.confirmPassword, errors);
            break;
        case "passwordLog":
            validatePasswordLog(values.passwordLog, errors);
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
    let isValid = true;

    if (!firstName || firstName.trim() === "") {
        errors.firstName = t("firstNameError");
        isValid = false;
    }

    return isValid;
}

function validateLastName(lastName, errors) {
    let isValid = true;

    if (!lastName || lastName.trim() === "") {
        errors.lastName = t("lastNameError");
        isValid = false;
    }

    return isValid;
}

function validateUsername(username, errors, existence) {
    let isValid = true;
    if (!username || username.trim() === "") {
        errors.username = t("usernameError");
        isValid = false;
    }

    if (username[0] === " ") {
        errors.username = t("usernameError2");
        isValid = false;
    }

    if (existence?.username) {
        errors.username = t("usernameExistsError");
        isValid = false;
    }

    return isValid;
}

function validatePassword(password, confirmPassword, errors) {
    let isValid = true;
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
        isValid = false;
    } else if (valid < 50) {
        errors.password = t("passwordError");
    } else if (password && valid > 50 && confirmPassword.trim() !== "") {
        validateConfirmPassword(password, confirmPassword, errors);
    }

    return isValid;
}

function validatePasswordLog(password, errors) {
    let isValid = true;
    if (!password) {
        errors.password = t("passwordErrorReq");
        isValid = false;
    }

    return isValid;
};

function validateConfirmPassword(password, confirmPassword, errors) {
    let isValid = true;

    if (!confirmPassword) {
        errors.confirmPassword = t("confirmPasswordErrorReq");
        isValid = false;
    } else if (password !== confirmPassword) {
        errors.confirmPassword = t("confirmPasswordError");
        errors.password = t("confirmPasswordError");

        isValid = false;
    }
    return isValid;
};

function validateEmail(email, errors, existence) {
    let isValid = true;
    if (!email) {
        errors.email = t("emailErrorReq");
        isValid = false;
    } else if (existence.email) {
        errors.email = t("emailExistsError");
        isValid = false;
    } else {
        isValid = validate.isEmail(String(email).toLocaleLowerCase());
        if (!isValid) errors.email = t("emailError");
    }
    return isValid;
};
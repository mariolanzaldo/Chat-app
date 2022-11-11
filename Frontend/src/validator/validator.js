import validate from 'validator';

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
        errors.firstName = "First name is required";
        result = false;
    }

    return result;
}

function validateLastName(lastName, errors) {
    let result = true;

    if (!lastName) {
        errors.lastName = "Last name is required";
        result = false;
    }

    return result;
}

function validateUsername(username, errors) {
    let result = true;
    if (!username) {
        errors.username = "Username is required";
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
        errors.password = "Password is required";
        result = false;
    } else if (valid < 50) {
        errors.password = 'Password must contain at least one lowercase, uppercase, number, and symbol';
    }

    return result;
}

function validateConfirmPassword(password, confirmPassword, errors) {
    let result = true;
    if (!confirmPassword) {
        errors.password = "Confirm password is required";
        result = false;
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Password must be the same'
        result = false;
    }

    return result;
}

function validateEmail(email, errors) {
    let result = true;
    if (!email) {
        errors.email = "Email is Required";
        result = false;
    } else {
        result = validate.isEmail(String(email).toLocaleLowerCase());
        if (!result) errors.email = "Invalid Email address";
    }
    return result;
}
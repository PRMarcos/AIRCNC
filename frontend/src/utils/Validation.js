const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

const isEmail = (emial) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    if (emial.match(emailRegEx)) return true;
    else return false;
}

const ValidateUser = (user) => {

    let errors = {};

    if (isEmpty(user.name)) {
        errors.name = "Name must not be empty.";
    }

    if (isEmpty(user.techs)) {
        errors.techs = "Techs must not be empty.";
    }

    if (isEmpty(user.email)) {
        errors.email = "Email must not be empty.";
    } else if (!isEmail(user.email)) {
        errors.email = "Must be a valid email";
    }

    if (isEmpty(user.password)) {
        errors.password = "Must not be empty.";
    }
    if ((user.password !== user.confirmPassword)) {
        errors.confirmPassword = "Passwords must match.";
    }

    return errors;
}


const validateSession = (email, password) => {
    let errors = {};

    if (isEmpty(email)) {
        errors.email = "Email must not be empty.";
    } else if (!isEmail(email)) {
        errors.email = "Must be a valid email";
    }

    if (isEmpty(password)) {
        errors.password = "Must not be empty.";
    }

    return errors;
}

export { isEmpty, isEmail, validateSession, ValidateUser }
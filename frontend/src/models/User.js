const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

const isEmail = (emial) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    if (emial.match(emailRegEx)) return true;
    else return false;
}

const Validate = (user) => {
    let errors = {};
    if (isEmpty(user.name)) {
        errors.name = "Name must not be empty.";
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

class User {
    constructor(user) {

        const { name, email, password, confirmPassword } = user;
        const errors = Validate(user)

        if (Object.keys(errors).length > 0) {
            throw (errors);
        } else {

            this.name = name;
            this.email = email;
            this.password = password;
            this.confirmPassword = confirmPassword;
        }
    }


}

module.exports = User;
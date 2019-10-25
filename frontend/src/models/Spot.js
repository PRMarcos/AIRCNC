
isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
}

Validate = (spot) => {
    let errors = {};

    if (isEmpty(spot.thumbnail)) {
        errors.thumbnail = "Name must not be empty.";
    }

    if (isEmpty(spot.company)) {
        errors.company = "company must not be empty.";
    }
    if (isEmpty(spot.techs)) {
        errors.techs = "Techs must not be empty.";
    }

    return errors;
}

class Spot {
    constructor(spot) {

        const { thumbnail, company, price, techs, userId } = user;
        const errors = Validate(spot)

        if (Object.keys(errors).length > 0) {
            throw (errors);
        } else {

            this.thumbnail = thumbnail;
            this.company = company;
            this.price = price;
            this.techs = techs;
            this.userId = userId;
        }
    }


}

module.exports = Spot;
const mongoose = require('mongoose');
const MongoContainer = require('./containers/mongo.container');
const userSchema = require('./schemas/User.schema')

const collection = 'users'

class Users extends MongoContainer {
    constructor() {
        super(collection, userSchema)
    }

    async getByEmail(username) {
        const document = await this.model.findOne({ email: username }, { __v: 0 });
        if (!document) {
            const message = `Resource with id ${id} does not exist in our records`;
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message);
        }
        return document;
    }
}

module.exports = Users;
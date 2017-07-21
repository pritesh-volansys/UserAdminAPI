const database = require('./database');
const USER_SCHEMA = "User";

module.exports = {
    saveUser: function (data) {
        return database.saveUser(USER_SCHEMA, data);
    },

    getUser: function (userName) {
        return database.findOne(USER_SCHEMA, { name: userName });
    },

    checkUser: function (userName) {
        return database.findOne(USER_SCHEMA, { name: userName });
    },

    getAllUser: function(){
        return database.findOne(USER_SCHEMA, {});
    }
};
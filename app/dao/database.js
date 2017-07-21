const config = require('../../config');
var MongoClient = require('mongodb').MongoClient;
var Promise = require("promise");

var DBmodule =  module.exports = {
    connectionString: function () {        
        const userDtl = config.user + ':' + config.pass;        
        const hostname = config.host + ':' + config.databaseport; 
        const Url = 'mongodb://' + userDtl + '@' + hostname + '/' + config.databasename;
        return(Url);
    },
    connection: function () {
        MongoClient.connect(this.connectionString() , function (err, db) {
        if (db) {
            console.log("Database is connected");
            connection = db;
            return;
        }
        if (err) {
            console.log("Error while connection db .. " + this.connectionString);
        }
    })
    },
    save: function (schemaName, data) {
        return new Promise(function (resolve, reject) {
            //TODO implements callback and return the result else reject with DatabaseException
            connection.collection(schemaName).insertOne(data).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        });
    },
    findOne: function (schemaName, criteria) {
        return new Promise(function (resolve, reject) {
            var cursor = db.collection(schemaName).find(criteria);
            //TODO check for cursor null
            if (cursor == null) {
                //Add database exception
                reject("");
                return;
            }

            var returnObj = null;
            cursor.each(function (err, item) {
                if (item != null) {
                    returnObj = item;
                }
            });
            resolve(returnObj);
        });
    }
};
"use strict";
var a = "test";
function p1(input) {
    console.log(input.name + ":" + input.age);
}
var zhang = {
    name: 'zhang',
    age: 20,
};
var myObj = {
    id: 1,
    name: 'foo',
    properties: ['a', 'b', 'c']
};
function getValue(value) {
    return myObj[value];
}
var MySqlDB = /** @class */ (function () {
    function MySqlDB() {
    }
    MySqlDB.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MySqlDB.prototype.update = function (info, id) {
        throw new Error("Method not implemented.");
    };
    MySqlDB.prototype.delete = function (id) {
        throw new Error("Method not implemented.");
    };
    MySqlDB.prototype.get = function (id) {
        throw new Error("Method not implemented.");
    };
    return MySqlDB;
}());
var User = /** @class */ (function () {
    function User(username, passowd) {
        this.username = username;
        this.password = passowd;
    }
    return User;
}());
var user1 = new User('zhangsan', '12345678');
var mysqlDB = new MySqlDB();
mysqlDB.add(user1);

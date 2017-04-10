class Users {
    constructor () {
        this.userList = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.userList.push(user);
        return user;
    }
    getUserList(room) {
        var users = this.userList.filter((user) => user.room === room);
        return users.map((user) => user.name);
    }
    getUser(id) {
        return this.userList.filter((user) => user.id === id)[0];
    }
    removeUser(id) {
        var foundUser = this.getUser(id);
        if (foundUser) {
            this.userList = this.userList.filter((user) => user.id !== id);
        }
        return foundUser;
    }
}

module.exports = {Users};

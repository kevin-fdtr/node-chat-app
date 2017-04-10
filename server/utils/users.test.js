var expect = require('expect');

var {Users} = require('./users');


describe('Users - addUser', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.userList = [{
            id: '1',
            name: 'Kevin',
            room: 'Big room'
        },{
            id: '2',
            name: 'Sarah',
            room: 'Another room'
        },{
            id: '3',
            name: 'Cacia',
            room: 'Big room'
        }];
    });

    it('should add a user', () => {
        var users = new Users();
        var user = {id:'123', name:'Kevin', room:'Big room'};
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.userList).toEqual([user]);
    });

    it('should return names of users in a specific room', () => {
        var userList = users.getUserList('Big room');
        expect(userList).toEqual(['Kevin','Cacia']);
        userList = users.getUserList('Another room');
        expect(userList).toEqual(['Sarah']);
    });
});

describe('Users - removeUser', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.userList = [{
            id: '1',
            name: 'Kevin',
            room: 'Big room'
        },{
            id: '2',
            name: 'Sarah',
            room: 'Another room'
        },{
            id: '3',
            name: 'Cacia',
            room: 'Big room'
        }];
    });

    it('should remove a user and return true', () => {
        remUser = users.userList[1];
        expect(users.removeUser(remUser.id)).toEqual(remUser);
        expect(users.userList.filter( (user) => {
            return user === remUser;
        }).length).toBe(0);
    });

    it('should return false when failing to remove a user', () => {
        remUser = {
        id: '4',
        name: 'Fred',
        room: 'Another room'
        };
        expect(users.removeUser(remUser.id)).toNotExist();
        expect(users.userList.length).toBe(3);
    });
});

describe('Users - getUser', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.userList = [{
            id: '1',
            name: 'Kevin',
            room: 'Big room'
        },{
            id: '2',
            name: 'Sarah',
            room: 'Another room'
        },{
            id: '3',
            name: 'Cacia',
            room: 'Big room'
        }];
    });

    it('should get a user', () => {
        user = users.userList[1];
        expect(users.getUser(user.id)).toEqual(user);
    });

    it('should not get a user that does not exist', () => {
        expect(users.getUser(99)).toNotExist();
    });
});

const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
var users;
beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'David',
    room: "What lies in your future is defeat"
  },
  {
    id: '2',
    name: 'Katie',
    room: "Destroy and rebuild"
  },
  {
    id: '3',
    name: 'Billy',
    room: "What lies in your future is defeat"
  }]
});

  it('should add a user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'David',
      room: "Seeker of a thousand miles"
    }

    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove user', () => {
    var userId = '1'
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    var userId = '22'
    var user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should get a user', () => {
    var userId = '1'
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not get a user', () => {
    var userId = '22';
    var user = users.getUser(userId);
    expect(user).toNotExist();
  });

  it('should return users for What lies in your future is defeat', () => {
    var userList = users.getUserList('What lies in your future is defeat');
    expect(userList).toEqual(['David', 'Billy']);
  });

  it('should return users for What lies in your future is defeat', () => {
    var userList = users.getUserList('Destroy and rebuild');
    expect(userList).toEqual(['Katie']);
  });
});

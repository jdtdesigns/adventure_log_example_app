const { getData, saveData } = require('../db');
const { v4 } = require('uuid');

class User {
  static create(userData) {
    const data = getData();
    const userExists = data.users.find(user => user.username === userData.username);

    if (userExists) throw new Error('User already exists');

    const user = {
      id: v4(),
      ...userData
    };

    data.users.push(user);

    saveData(data);

    return user;
  }

  static getByUsername(username) {
    const { users } = getData();
    const user = users.find(u => u.username === username);

    if (!user) throw new Error('User not found with that username.');

    return user;
  }
}

module.exports = User;
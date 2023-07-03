const { getData, saveData } = require('../db');
const { v4 } = require('uuid');

class User {
  static create(formData) {
    const data = getData();
    const userExists = data.users.find(u => u.username === formData.username);

    // Ensure the form inputs have been filled out
    if (!formData.username || !formData.password) throw new Error('empty_creds');

    // Check if user already exists in the db
    if (userExists) throw new Error('user_exists');

    const user = {
      id: v4(),
      ...formData
    };

    data.users.push(user);

    saveData(data);

    return user;
  }

  static getUserByUsername(username) {
    const { users } = getData();
    const user = users.find(u => u.username === username);

    if (!user) throw new Error('not_found');

    return user;
  }
}

module.exports = User;
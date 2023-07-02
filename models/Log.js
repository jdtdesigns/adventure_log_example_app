const { getData, saveData } = require('../db');
const { v4 } = require('uuid');

class Log {
  static create(logData) {
    const data = getData();

    const log = {
      id: v4(),
      ...logData
    };

    data.logs.push(log);

    saveData(data);
  }

  static getAll() {
    const data = getData();

    const logs = data.logs.map(log => {
      return {
        ...log,
        username: data.users.find(u => u.id === log.user_id).username
      }
    });

    return logs;
  }

  static getAllByUserId(user_id) {
    const { logs } = getData();
    const userLogs = logs.filter(l => l.user_id === user_id);

    return userLogs;
  }

  static getById(id) {
    const { logs } = getData();
    const log = logs.find(l => l.id === id);

    return log;
  }

  static update(formData) {
    const data = getData();
    const log = data.logs.find(l => l.id === formData.id);

    log.title = formData.title;
    log.location = formData.location;

    saveData(data);
  }

  static delete(id) {
    const data = getData();
    data.logs = data.logs.filter(l => l.id !== id);

    saveData(data);
  }
}

module.exports = Log;
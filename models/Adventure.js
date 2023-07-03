const { getData, saveData } = require('../db');
const { v4 } = require('uuid');
const dayjs = require('dayjs');

class Adventure {
  static create(formData) {
    const data = getData();

    // Ensure the form inputs have been filled out
    if (!formData.title || !formData.location) throw new Error('empty_data');

    const adventure = {
      id: v4(),
      createdOn: dayjs().unix(),
      ...formData
    };

    data.adventures.push(adventure);

    saveData(data);

    return adventure;
  }

  static getByUserId(user_id) {
    const { adventures } = getData();
    const filtered = adventures.filter(a => a.user_id === user_id);
    const sorted = filtered.sort((a, b) => b.createdOn - a.createdOn);
    const output = sorted.map(a => ({
      ...a,
      createdOn: dayjs.unix(a.createdOn).format('M/DD/YYYY')
    }))

    return output;
  }

  static getById(id) {
    const { adventures } = getData();
    const adventure = adventures.find(a => a.id === id);

    return adventure;
  }

  static getAll() {
    const data = getData();
    const sorted = data.adventures.sort((a, b) => b.createdOn - a.createdOn);
    const adventures = sorted.map(a => ({
      ...a,
      username: data.users.find(u => u.id === a.user_id).username,
      createdOn: dayjs.unix(a.createdOn).format('M/DD/YYYY')
    }));

    return adventures;
  }

  static update(id, formData) {
    const data = getData();
    const adventure = data.adventures.find(a => a.id === id);

    adventure.title = formData.title;
    adventure.location = formData.location;

    saveData(data);
  }

  static deleteAdventure(id) {
    const data = getData();
    data.adventures = data.adventures.filter(a => a.id !== id);

    saveData(data);
  }
}

module.exports = Adventure;
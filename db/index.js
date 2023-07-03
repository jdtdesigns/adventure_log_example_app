const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, 'data.json');

function getData() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function saveData(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  console.log('Data saved successfully!');
}

module.exports = {
  getData: getData,
  saveData: saveData
}
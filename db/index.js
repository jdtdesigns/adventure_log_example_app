const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, '../db/data.json');

function getData() {
  const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));

  return data;
}

function saveData(dataObj) {
  fs.writeFile(DB_PATH, JSON.stringify(dataObj, null, 2), err => {
    if (err) throw err;

    console.log('Data updated successfully!');
  })
}

module.exports = {
  getData: getData,
  saveData: saveData
}
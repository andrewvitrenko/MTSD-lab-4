const fs = require("fs").promises;

class JSONFileService {
  constructor(filePath) {
    this.filePath = filePath;
  }

  getData() {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => JSON.parse(data))
      .catch((error) => {
        throw error;
      });
  }

  updateData(newData) {
    const data = JSON.stringify(newData, null, 2);
    return fs
      .writeFile(this.filePath, data, "utf8")
      .then(() => {
        console.log("Data updated successfully.");
      })
      .catch((error) => {
        throw error;
      });
  }
}

module.exports = JSONFileService;

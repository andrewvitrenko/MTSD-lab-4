const fs = require("fs").promises;

class JSONFileService {
  constructor(filePath = "./db/db.json") {
    this.filePath = filePath;
  }

  async getData() {
    const data = await fs.readFile(this.filePath, "utf8").catch((error) => {
      throw error;
    });
    return JSON.parse(data).tasks;
  }

  async updateData(newData) {
    const data = JSON.stringify({ tasks: newData }, null, 2);
    await fs.writeFile(this.filePath, data, "utf8").catch((error) => {
      throw error;
    });
    console.log("Data updated successfully.");
  }
}

module.exports = JSONFileService;

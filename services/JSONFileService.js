const fs = require("fs").promises;

class JSONFileService {
  constructor(filePath = "./db/db.json") {
    this.filePath = filePath;
  }

  async getData() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data).tasks;
    } catch (error) {
      throw error;
    }
  }

  async updateData(newData) {
    try {
      const data = JSON.stringify({ tasks: newData }, null, 2);
      await fs.writeFile(this.filePath, data, "utf8");
      console.log("Data updated successfully.");
    } catch (error) {
      throw error;
    }
  }
}

module.exports = JSONFileService;

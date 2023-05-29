const fs = require("fs").promises;

class JSONFileService {
  /**
   *
   * @param filePath {string | undefined}
   */
  constructor(filePath = "./db/db.json") {
    this.filePath = filePath;
  }

  /**
   * Get data from db
   * @returns {Promise<Todo[]>}
   */
  async getData() {
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      return JSON.parse(data).tasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Write data to db
   * @param newData {Todo[]}
   * @returns {Promise<void>}
   */
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

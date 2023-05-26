const fs = require('fs');
const JSONFileService = require('../services/JSONFileService');

jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn(),
    writeFile: jest.fn(),
  },
}));

describe('JSONFileService', () => {
  let jsonFileService;
  let consoleLogSpy;

  beforeEach(() => {
    jsonFileService = new JSONFileService();
    consoleLogSpy = jest.spyOn(console, 'log');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getData', () => {
    it('should read file and return parsed JSON tasks', async () => {
      const mockData = { tasks: ['task1', 'task2'] };
      const mockFileContent = JSON.stringify(mockData);

      fs.promises.readFile.mockResolvedValueOnce(mockFileContent);

      const result = await jsonFileService.getData();

      expect(fs.promises.readFile).toHaveBeenCalledWith(
        './db/db.json',
        'utf8'
      );
      expect(result).toEqual(mockData.tasks);
    });

    it('should throw an error if file read fails', async () => {
      const mockError = new Error('File read error');

      fs.promises.readFile.mockRejectedValueOnce(mockError);

      await expect(jsonFileService.getData()).rejects.toThrow(mockError);
      expect(fs.promises.readFile).toHaveBeenCalledWith(
        './db/db.json',
        'utf8'
      );
    });
  });

  describe('updateData', () => {
    it('should write updated data to the file', async () => {
      const mockData = ['task1', 'task2'];
      const mockFileContent = JSON.stringify({ tasks: mockData }, null, 2);

      fs.promises.writeFile.mockResolvedValueOnce();

      await jsonFileService.updateData(mockData);

      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        './db/db.json',
        expect.any(String),
        'utf8'
      );
      expect(fs.promises.writeFile.mock.calls[0][1]).toEqual(mockFileContent);
      expect(consoleLogSpy).toHaveBeenCalledWith('Data updated successfully.');
    });

    it('should throw an error if file write fails', async () => {
      const mockData = ['task1', 'task2'];
      const mockError = new Error('File write error');

      fs.promises.writeFile.mockRejectedValueOnce(mockError);

      await expect(jsonFileService.updateData(mockData)).rejects.toThrow(
        mockError
      );
      expect(fs.promises.writeFile).toHaveBeenCalledWith(
        './db/db.json',
        expect.any(String),
        'utf8'
      );
      expect(fs.promises.writeFile.mock.calls[0][1]).toEqual(
        JSON.stringify({ tasks: mockData }, null, 2)
      );
    });
  });
});

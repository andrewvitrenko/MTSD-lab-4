const dayjs = require('dayjs');
const Todo = require('../schemas/todo');
const JSONFileService = require('./JSONFileService');

class TodoService {
  constructor() {
    this.fileService = new JSONFileService();
  }

  /**
   * Get active tasks
   * @returns {Promise<Todo[]>}
   */
  async getActive() {
    try {
      const tasks = await this.fileService.getData();
      return tasks
        .filter(task => !task.isCompleted)
        .sort((next, prev) => -dayjs(next.deadline).isBefore(prev.deadline))
        .map(task => ({ title: task.title, deadline: task.deadline }));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all tasks
   * @returns {Promise<Todo[]>}
   */
  async getAll() {
    try {
      const tasks = await this.fileService.getData();
      return tasks.map(({ title, deadline, completedAt }) => ({ title, deadline, completedAt }));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Complete single task
   * @param taskId {string}
   * @returns {Promise<Todo>}
   */
  async complete(taskId) {
    try {
      const tasks = await this.fileService.getData();
      const updatedTasks = tasks.map(task => task.id === taskId ? {
        ...task,
        isCompleted: true,
        completedAt: dayjs().format(),
      } : task);

      await this.fileService.updateData(updatedTasks);

      return updatedTasks.find(task => task.id === taskId);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create new task
   * @param {string} title
   * @param {string | undefined} description
   * @param {string | undefined} deadline
   * @returns {Promise<Todo>}
   */
  async create(title, description, deadline) {
    try {
      const newTask = new Todo({ title, description, deadline });
      const tasks = await this.fileService.getData();

      await this.fileService.updateData([...tasks, newTask]);

      return newTask;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get all expired tasks
   * @returns {Promise<Todo[]>}
   */
  async getExpired() {
    try {
      const tasks = await this.fileService.getData();
      return tasks.filter(task => dayjs(task.deadline).isBefore(dayjs()));
    } catch (error) {
      throw error;
    }
  }

  /**
   * Remove specific task
   * @param taskId {string}
   * @returns {Promise<Todo[]>}
   */
  async remove(taskId) {
    try {
      const tasks = await this.fileService.getData();
      const filteredTasks = tasks.filter(task => task.id !== taskId);
      await this.fileService.updateData(filteredTasks);

      return filteredTasks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edit separate task
   * @param taskId {string}
   * @param options {string[]}
   * @returns {Promise<Todo>}
   */
  async edit(taskId, options) {
    try {
      const updateData = options.reduce((acc, option) => {
        const [key, value] = option.split('=');
        return {
          ...acc,
          [key]: value,
        };
      }, {});

      const tasks = await this.fileService.getData();
      const updatedTasks = tasks.map(task => task.id === taskId ? {
        ...task,
        title: updateData.title || task.title,
        deadline: updateData.deadline || task.deadline,
        description: updateData.description || task.description,
      } : task);

      await this.fileService.updateData(updatedTasks);

      return updatedTasks.find(task => task.id === taskId);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new TodoService();

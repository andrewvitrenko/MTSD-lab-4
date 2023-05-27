const dayjs = require('dayjs');
const Todo = require('../schemas/todo');

class TodoService {
  /**
   *
   * @type {Todo[]}
   */
  tasks = new Array(10).fill(new Todo({ title: 'test title' }));

  /**
   * Get active tasks
   * @returns {Todo[]}
   */
  getActive() {
    return this.tasks.filter(task => !task.isCompleted);
  }

  /**
   * Get all tasks
   * @returns {Todo[]}
   */
  getAll() {
    return this.tasks;
  }

  /**
   * Complete single task
   * @param taskId {string}
   * @returns {Todo}
   */
  complete(taskId) {
    this.tasks = this.tasks.map(task => task.id === taskId ? {
      ...task,
      isCompleted: true,
      completedAt: dayjs().format(),
    } : task);

    return this.tasks.find(task => task.id === taskId);
  }

  /**
   * Create new task
   * @param {string} title
   * @param {string | undefined} description
   * @param {string | undefined} deadline
   * @returns {Todo}
   */
  create(title, description, deadline) {
    const newTask = new Todo({ title, description, deadline });
    this.tasks = [...this.tasks, newTask];

    return this.tasks[this.tasks.length - 1];
  }

  /**
   * Get all expired tasks
   * @returns {Todo[]}
   */
  getExpired() {
    return this.tasks.filter(task => dayjs(task.deadline).isBefore(dayjs()));
  }

  /**
   * Remove specific task
   * @param taskId {string}
   * @returns {Todo[]}
   */
  remove(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);

    return this.tasks;
  }

  /**
   * Edit separate task
   * @param taskId {string}
   * @param options {string[]}
   * @returns {Todo}
   */
  edit(taskId, options) {
    const edited = options.reduce((acc, option) => {
      const [key, value] = option.split('=');
      return {
        ...acc,
        [key]: value,
      };
    }, {});

    this.tasks = this.tasks.map(task => task.id === taskId ? {
      ...task,
      title: edited.title || task.title,
      deadline: edited.deadline || task.deadline,
      description: edited.description || task.description,
    } : task);

    return this.tasks.find(task => task.id === taskId);
  }
}

module.exports = new TodoService();

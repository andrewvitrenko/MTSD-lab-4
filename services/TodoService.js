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
   */
  complete(taskId) {
    for (let task of this.tasks) {
      if (taskId === task.id) {
        task.isCompleted = true;
        task.completedAt = dayjs().format();
      }
    }
  }

  /**
   * Create new task
   * @param {string} title
   * @param {string | undefined} description
   * @param {string | undefined} deadline
   */
  create(title, description, deadline) {
    var newTask = new Todo({ title, description, deadline });
    this.tasks = [...this.tasks, newTask];
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
   */
  remove(taskId) {
    for (let i = 0; i < this.tasks.length; i++) {
      var task = this.tasks[i];
      if (taskId === task.id) {
        this.tasks.splice(i, 1)
      }
    }
  }

  /**
   * Edit separate task
   * @param taskId {string}
   * @param options {string[]}
   */
  edit(taskId, options) {
    var edited = {};
    for (let opt of options) {
      var key = opt.split('=')[0];
      var value = opt.split('=')[1];
      edited[key] = value;
    }

    for (let task of this.tasks) {
      if (task.id === taskId) {
        task.title = edited.title || task.title;
        task.deadline = edited.deadline || task.deadline;
        task.description = edited.description || task.description;
      }
    }
  }
}

module.exports = new TodoService();

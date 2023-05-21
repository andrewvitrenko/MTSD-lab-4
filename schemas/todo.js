const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

/**
 * @class Todo
 * @property id {string}
 * @property title {string}
 * @property deadline {string}
 * @property description {string}
 * @property isCompleted {boolean}
 * @property completedAt {string | null}
 */
class Todo {
  /**
   * @type {string}
   */
  id;
  /**
   * @type {string}
   */
  title;
  /**
   * @type {string}
   */
  deadline;
  /**
   * @type {string}
   */
  description;
  /**
   *
   * @type {boolean}
   */
  isCompleted = false;
  /**
   *
   * @type {string | null}
   */
  completedAt = null;

  /**
   *
   * @param title {string}
   * @param deadline {string | undefined}
   * @param description {string | undefined}
   */
  constructor({ title, deadline, description }) {
    this.title = title;
    this.description = description || '';
    this.deadline = deadline || dayjs().add(1, 'day').format();
    this.id = uuidv4();
  }
}

module.exports = Todo;

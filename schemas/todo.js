const dayjs = require('dayjs');

class TODO {
  title;
  deadline;
  description;
  isCompleted = false;
  completedAt = null;

  constructor({ title, deadline, description }) {
    this.title = title;
    this.description = description || '';
    this.deadline = deadline || dayjs().add(1, 'day').format();
  }
}

module.exports = TODO;

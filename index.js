const commander = require("commander");
const TodoService = require('./services/TodoService');

commander
  .option("-a, --all", "Show all")
  .option("-f, --finish <task_id>", "Mark some task as finished")
  .option("-n, --new <options...>", "Create new task")
  .option("-e, --expired", "Show expired tasks")
  .option("-d, --delete <task_id>", "Delete task")
  .option("--edit <task_id> <options...>", "Edit task")
  .parse(process.argv);

const options = commander.opts();

const flags = {
  all: () => TodoService.getAll(),
  finish: (taskId) => TodoService.complete(taskId),
  new: ([title, description, deadline]) =>
    TodoService.create(title, description, deadline),
  expired: () => TodoService.getExpired(),
  delete: (taskId) => TodoService.remove(taskId),
  edit: ([taskId, ...options]) => TodoService.edit(taskId, options),
};

const handleFlags = async (options) => {
  const optionKeys = Object.keys(options);
  if (!optionKeys.length) return await TodoService.getActive();

  const currentFlag = optionKeys[0];

  const action = flags[currentFlag];
  const actionProps = options[currentFlag];
  return await action(actionProps);
};

const start = async () => {
  const output = await handleFlags(options);
  console.log(output);
}

start();

const commander = require("commander");

commander
  .option("-a, --all", "Show all")
  .option("-f, --finished <task_id>", "Mark some task as finished")
  .option("-n, --new <options...>", "Create new task")
  .option("-e, --expired", "Show expired tasks")
  .option("-d, --delete <task_id>", "Delete task")
  .parse(process.argv);

const options = commander.opts();

const flags = {
  all: () => console.log("all"),
  finished: (value) => console.log("finished", value),
  new: ([title, description, deadline]) =>
    console.log("new", title, description, deadline),
  expired: () => console.log("expired"),
  delete: (value) => console.log("delete", value),
};

const handleFlags = (options) => {
  const optionKeys = Object.keys(options);
  if (!optionKeys.length) return console.log("show active");

  const currentFlag = optionKeys[0];

  const action = flags[currentFlag];
  const actionProps = options[currentFlag];
  action(actionProps);
};

handleFlags(options);

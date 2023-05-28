# TODO-list

## Intro
This is a simple todo-list console-app. It stores all data in JSON file, reads it, updates, etc.

## Usage

### Preparation
Before running the app you need to clone the repo
```shell
$ git clone git@github.com:andrewvitrenko/MTSD-lab-4.git
```

You need to have [Node.js 12+](https://nodejs.org) installed on your computer. You can simply check this with
```shell
$ node -v
```

Run this command to install dependencies:
```shell
$ npm install
```

### Running
After you have all the dependencies installed, you can run the app with simple command
```shell
$ node . <...flag>
```

`flag` - is an additional flag which helps you to use this app in additional way.
This is optional, if you don't pass any flag - you will see a list of all active tasks

### Flags for cli:
```
-a, -all - show all
-f, finish <task_id> - mark some task as finished
-n, --new <title> <optional_description> <optional_deadline> - create new task
-e, --expired - show expired tasks
-d, --delete <task_id> - delete task
--edit <task_id> <options...> - edit task
```

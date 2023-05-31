const dayjs = require('dayjs');
const TodoService = require('../services/TodoService');
const JSONFileService = require('../services/JSONFileService');
const Todo = require('../schemas/todo');

/**
 * Mock data for tests
 * @type {Todo[]}
 */
const mockData = [
  {
    id: "e30b3906-b48b-477b-a2be-62c2c5232357",
    title: "test title",
    deadline: "2023-05-29T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "b8ed6c93-3a00-4c16-9e70-0bca13a9e2aa",
    title: "test title",
    deadline: "2023-05-28T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "2e55d4f2-1125-4856-995b-43bded42abd7",
    title: "test title",
    deadline: "2023-05-27T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "1c1b48e4-7915-4d9b-b8cf-8e8e2a1c0c4e",
    title: "test title",
    deadline: "2023-05-26T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "3c50624e-0913-42b0-b1e3-0929cc2a1d55",
    title: "test title",
    deadline: "2023-05-25T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "60f41395-2307-479a-8a97-12ee65db761e",
    title: "test title",
    deadline: "2023-05-24T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "addbf24f-9e8a-4c1e-ab71-5292391d86d3",
    title: "test title",
    deadline: "2023-05-23T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "c51f32aa-c833-4e7a-b08f-5786603e23df",
    title: "test title",
    deadline: "2023-05-22T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "d8739ee5-e371-49b5-b3b6-d9c518bac0b5",
    title: "test title",
    deadline: "2023-05-21T13:46:47+02:00",
    description: "",
    isCompleted: false,
    completedAt: null,
  },
  {
    id: "7f269cef-37a2-462e-92a1-3b77d2b7c596",
    title: "chanegd title",
    deadline: "2023-05-27T14:21:47+02:00",
    description: "",
    isCompleted: true,
    completedAt: "2023-05-28T14:21:47+02:00",
  },
]

describe('TodoService', () => {
  beforeEach(async () => {
    await new JSONFileService().updateData(mockData)
  });

  describe('getActive', () => {
    it('should return only active tasks', async () => {
      const activeTasks = await TodoService.getActive();
      const completedTasks = activeTasks.filter(({ completedAt, isCompleted }) => isCompleted || completedAt);
      expect(completedTasks).toStrictEqual([]);
    });
  });

  describe('getAll', () => {
    it('should return all tasks', async () => {
      const allTasks = await TodoService.getAll();
      const formattedMock = mockData.map(({ deadline, completedAt, title }) =>
        ({ title, deadline, completedAt }));
      expect(allTasks).toStrictEqual(formattedMock);
    });
  });

  describe('getExpired', () => {
    it('should return expired tasks', async () => {
      const expired = await TodoService.getExpired();
      const isAllExpired = expired.every(({ deadline }) => dayjs(deadline).isBefore(dayjs()));
      expect(isAllExpired).toBeTruthy();
    });
  });

  describe('create', () => {
    it('should create new task', async () => {
      const newTask = new Todo({ title: 'new task title' });
      const returnedTask = await TodoService.create('new task title');
      const updatedTasks = await TodoService.getAll();
      expect(returnedTask).toMatchObject({ ...newTask, id: returnedTask.id });
      expect(updatedTasks.length).toEqual(mockData.length + 1);
    });
  });

  describe('complete', () => {
    it('should complete task', async () => {
      const completedTask = await TodoService.complete(mockData[0].id);
      const expiredTasks = await TodoService.getExpired();
      const findExpired = expiredTasks.find(({ id }) => id === mockData[0].id);
      expect(findExpired).toBeTruthy();
      expect(completedTask.isCompleted).toBeTruthy();
      expect(completedTask.isCompleted).toEqual(true);
    });
  });

  describe('remove', () => {
    it('should delete task from array', async () => {
      const filteredTasks = await TodoService.remove(mockData[0].id);
      const removedTask = filteredTasks.find(({ id }) => id === mockData[0].id);
      expect(removedTask).toBeUndefined();
    });
  });

  describe('edit', () => {
    it('should edit task', async () => {
      const config = {
        title: 'edit title',
        description: 'some edit desc',
        deadline: '2023-05-15T13:46:47+02:00',
      };
      const editedTask = await TodoService.edit(mockData[0].id, [`title=${config.title}`, `description=${config.description}`, `deadline=${config.deadline}`]);
      expect(editedTask.title).toEqual(config.title);
      expect(editedTask.description).toEqual(config.description);
      expect(editedTask.deadline).toEqual(config.deadline);
    });
  });
})

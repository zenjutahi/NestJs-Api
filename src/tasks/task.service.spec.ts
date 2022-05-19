import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
});

const mockUser = {
  username: 'someUser',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};

const mockTask = {
  title: 'someTitle',
  id: 'taskId',
  description: 'some desc',
  status: TaskStatus.DONE,
};

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    // initialize a NestJS module with TasksService and TasksRepository
    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();

    taskService = moduleRef.get<TasksService>(TasksService);
    taskRepository = moduleRef.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      taskRepository.getTasks.mockResolvedValue(mockTask);
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toBe(mockTask);
    });
  });

  describe('getTaskById', () => {
    it('calls TasksRepository.findOne and returns the result', async () => {
      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById(mockTask.id, mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TasksRepository.findOne and handles an error', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.getTaskById(mockTask.id, mockUser)).rejects.toThrow(
        `Task with id ${mockTask.id} is not found`,
      );
    });
  });

  describe('deleteTaskById', () => {
    it('calls TaskRepository.remove and returns null', async () => {
      taskRepository.findOne.mockResolvedValue(mockTask);
      taskRepository.remove.mockResolvedValue(null);
      expect(await taskService.deleteTaskById(mockTask.id, mockUser)).toBe(
        null,
      );
    });

    it('calls TaskRepository.remove and handles an error', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(taskService.deleteTaskById(mockTask.id, mockUser)).rejects.toThrow(
        `Task with id ${mockTask.id} is not found`,
      );
    });
  });
});

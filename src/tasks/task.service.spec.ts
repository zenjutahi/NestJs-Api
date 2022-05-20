import { Test, TestingModule } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn().mockResolvedValue([mockTask]),
  createTask: jest.fn().mockResolvedValue(mockTask),
  findOne: jest.fn().mockResolvedValue(mockTask),
  remove: jest.fn().mockResolvedValue(true),
  save: jest.fn().mockResolvedValue(mockTask),
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
  let taskRepository: TasksRepository;

  beforeEach(async () => {
    // initialize a NestJS module with TasksService and TasksRepository
    const moduleRef: TestingModule = await Test.createTestingModule({
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
      const result = await taskService.getTasks(null, mockUser);
      expect(result).toEqual([mockTask]);
    });
  });

  //   describe('getTaskById', () => {
  //     it('calls TasksRepository.findOne and returns the result', async () => {
  //       const result = await taskService.getTaskById(mockTask.id, mockUser);
  //       expect(result).toEqual(mockTask);
  //     });

  //     it('calls TasksRepository.findOne and handles an error', () => {
  //       jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
  //       expect(taskService.getTaskById(mockTask.id, mockUser)).rejects.toThrow(
  //         `Task with id ${mockTask.id} is not found`,
  //       );
  //     });
  //   });

  //   describe('deleteTaskById', () => {
  //     it('calls TaskRepository.remove and returns null', async () => {
  //       expect(await taskService.deleteTaskById(mockTask.id, mockUser)).toBe(
  //         true,
  //       );
  //     });

  //     it('handles an error before calling TaskRepository.remove', async () => {
  //       jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
  //       expect(taskService.deleteTaskById(mockTask.id, mockUser)).rejects.toThrow(
  //         `Task with id ${mockTask.id} is not found`,
  //       );
  //       expect(taskRepository.remove).not.toHaveBeenCalled();
  //     });
  //   });

  //   describe('updateTaskStatus', () => {
  //     it('calls TaskRepository.save and returns the result', async () => {
  //       const result = await taskService.updateTaskStatus(
  //         mockTask.id,
  //         TaskStatus.DONE,
  //         mockUser,
  //       );
  //       expect(result).toEqual(mockTask);
  //     });

  //     it('handles an error before calling TasksRepository.save', async () => {
  //       jest.spyOn(taskRepository, 'findOne').mockResolvedValue(null);
  //       expect(taskService.deleteTaskById(mockTask.id, mockUser)).rejects.toThrow(
  //         `Task with id ${mockTask.id} is not found`,
  //       );
  //       expect(taskRepository.save).not.toHaveBeenCalled();
  //     });
  //   });

  //   describe('createTask', () => {
  //     it('calls TasksRepository.createTask and returns the result', async () => {
  //       const result = await taskService.createTask(mockTask, mockUser);
  //       expect(result).toEqual(mockTask);
  //     });
  //   });
});

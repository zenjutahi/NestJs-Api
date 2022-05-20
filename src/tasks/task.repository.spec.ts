import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { User } from 'src/auth/user.entity';
import { GetTaskFilterDto } from './dto/get-task-filiters.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm';

const mockUser: User = {
  id: 'someId',
  username: 'someName',
  password: 'somePass',
  tasks: [],
};
const mockTask = {
  id: 'someId',
  title: 'someTitle',
  description: 'some desc',
  status: TaskStatus.DONE,
  user: mockUser,
};

const taskFilters: GetTaskFilterDto = {
  status: TaskStatus.DONE,
  search: 'string',
};

describe('TasksRepository', () => {
  let taskRepository: TasksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksRepository,
        {
          provide: getRepositoryToken(Task),
          useValue: createMock<TasksRepository>(),
        },
      ],
    }).compile();

    taskRepository = module.get<TasksRepository>(TasksRepository);
  });
  it('should have the repo mocked', () => {
    expect(typeof taskRepository.createQueryBuilder).toBe('function');
  });

  describe('createTask', () => {
    it('calls TasksRepository.create and .save and returns the result', async () => {
      jest.spyOn(taskRepository, 'create').mockReturnValueOnce(mockTask);
      jest.spyOn(taskRepository, 'save').mockResolvedValue(mockTask);
      const result = await taskRepository.createTask(mockTask, mockUser);
      expect(result).toEqual(mockTask);
    });
  });

  //   describe('getTasks', () => {
  //     it('calls TasksRepository.createQueryBuilder,builds a query', async () => {
  //       jest
  //         .spyOn(taskRepository, 'createQueryBuilder')
  //         .mockReturnValue(SelectQueryBuilder.prototype);
  //       jest.spyOn(SelectQueryBuilder.prototype, 'where').mockReturnThis();
  //       jest.spyOn(SelectQueryBuilder.prototype, 'andWhere').mockReturnThis();
  //       jest
  //         .spyOn(SelectQueryBuilder.prototype, 'getMany')
  //         .mockResolvedValue(mockTask);

  //       const result = await taskRepository.getTasks(taskFilters, mockUser);
  //       console.log(result);
  //     });
  //   });
});

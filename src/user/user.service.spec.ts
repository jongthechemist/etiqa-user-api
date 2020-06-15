import { Model } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User } from './user.schema';
import { getModelToken } from '@nestjs/mongoose';
import { UserCreateDto } from './user.dto';

const userDto: UserCreateDto = {
  username: 'hello',
  email: 'hello@mail.com',
  phone: '01234568',
  skillsets: ['angular'],
  hobby: 'hiking',
};

export class MockUser {
  static data: User;
  constructor(public data?: any) {
    data.save = this.save;
    MockUser.data = data;
  }
  get status(): string {
    return this.data.status;
  }
  set status(value: string) {
    this.data.status = value;
  }
  get uuid(): string {
    return this.data.uuid;
  }
  set uuid(value: string) {
    this.data.uuid = value;
  }
  get create(): string {
    return this.data.create;
  }
  set create(value: string) {
    this.data.create = value;
  }
  save(): any {
    return MockUser.data;
  }
  static findOne(): any {
    return MockUser.data;
  }
  static find(): any {}
  static sort(): any {}
  static update(): any {}
  static deleteOne(): any {}
}

describe('UserService', () => {
  let service: UserService;
  let model: Model<User>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockUser,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model, User>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get all users', async () => {
    expect.assertions(1);
    const list = [MockUser.data];

    const sort = jest.fn(() => list);
    const find = jest.fn(() => ({ sort }));
    jest.spyOn(model, 'find').mockImplementation(find);

    const result = await service.getAll();
    expect(result).toBe(list);
  });

  it('should get user details', async () => {
    expect.assertions(1);
    const findOne = jest.fn(() => userDto);
    jest.spyOn(model, 'findOne').mockImplementation(findOne);

    const result = await service.get('abcd');
    expect(result).toBe(userDto);
  });

  it('should create new user', async () => {
    expect.assertions(1);

    const result = await service.create(userDto);
    expect(result).toBe(userDto);
  });

  it('should update user', async () => {
    expect.assertions(1);
    jest.spyOn(model, 'update').mockResolvedValueOnce({ n: 1 });
    const result = await service.edit('abcd', userDto);
    expect(result).toBe(MockUser.data);
  });

  it('should throw error if edit count is other than one', async () => {
    expect.assertions(1);
    jest.spyOn(model, 'update').mockResolvedValueOnce({ n: 0 });
    try {
      await service.edit('abcd', userDto);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });

  it('should delete users', async () => {
    expect.assertions(1);
    jest.spyOn(model, 'deleteOne').mockResolvedValueOnce({ n: 1 });
    const result = await service.delete('abcd');
    expect(result).toBe(true);
  });

  it('should throw error if delete count is other than one', async () => {
    expect.assertions(1);
    jest.spyOn(model, 'deleteOne').mockResolvedValueOnce({ n: 0 });
    try {
      await service.delete('abcd');
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});

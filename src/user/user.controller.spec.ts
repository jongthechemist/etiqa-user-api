import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.schema';
import { MockUser } from './user.service.spec';
import { getModelToken } from '@nestjs/mongoose';
import { UserListDto, UserCreateDto, UserDto } from './user.dto';

const userCreateDto: UserCreateDto = {
  username: 'hello',
  email: 'hello@mail.com',
  phone: '01234568',
  skillsets: ['angular'],
  hobby: 'hiking',
};
const userListDto: UserListDto = {
  uuid: 'abcd',
  username: 'hello',
};
const userDto: UserDto = {
  uuid: 'abcd',
  created: new Date(),
  username: 'hello',
  email: 'hello@mail.com',
  phone: '01234568',
  skillsets: ['angular'],
  hobby: 'hiking',
};

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: MockUser,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);

    jest.spyOn(service, 'getAll').mockResolvedValue([userDto]);
    jest.spyOn(service, 'get').mockResolvedValue(userDto);
    jest.spyOn(service, 'create').mockResolvedValue(userDto);
    jest.spyOn(service, 'edit').mockResolvedValue(userDto);
    jest.spyOn(service, 'delete').mockResolvedValue(true);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get user list', async () => {
    expect.assertions(1);
    const list = await controller.getUserList();
    expect(list).toEqual([userListDto]);
  });

  it('should get user details', async () => {
    expect.assertions(1);
    const details = await controller.getUserDetails('abcd');
    expect(details).toEqual(userDto);
  });

  it('should create user', async () => {
    expect.assertions(1);
    const details = await controller.createUser(userCreateDto);
    expect(details).toEqual(userDto);
  });

  it('should edit user', async () => {
    expect.assertions(1);
    const details = await controller.editUser('abcd', userCreateDto);
    expect(details).toEqual(userDto);
  });

  it('should return success delete status', async () => {
    expect.assertions(1);
    const result = await controller.removeUser('abcd');
    expect(result).toEqual({ success: true });
  });
});

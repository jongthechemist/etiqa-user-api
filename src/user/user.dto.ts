export interface UserCreateDto {
  username: string;
  email: string;
  phone: string;
  skillsets: string[];
  hobby: string;
}

export interface UserDto extends UserCreateDto {
  uuid: string;
  created: Date;
}

export interface UserListDto {
  uuid: string;
  username: string;
}

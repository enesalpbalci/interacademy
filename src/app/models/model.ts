
import { UserRoles } from './user-roles.interface';

export interface UserForLoginDto {
  userName: string;
  passWord: string;
}
export interface TokenDto {
  token: string;
  expiration: string;
  role: UserRoles;
}

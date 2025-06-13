import { IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  firstName: string;

  lastName: string;

  @IsStrongPassword()
  password: string;
}
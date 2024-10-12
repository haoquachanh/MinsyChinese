import { IsEmpty, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/typings/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmpty()
  role?: UserRole;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsString()
  birth?: string;
}

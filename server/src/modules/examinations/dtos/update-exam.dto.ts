import { IsEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/common/typings/user-role.enum';

export class UpdateUserDto {
  @IsEmpty({ message: "email can't be change" })
  @IsString()
  email: string;

  @IsEmpty({ message: 'you want change password here? not good!' })
  @IsString()
  password: string;

  @IsEmpty({ message: "role can't be change" })
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

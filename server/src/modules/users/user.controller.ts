import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  // Request,
  UseGuards,
  // ValidationPipe,
  // UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/security/role.guard';
import { UserRole } from 'src/common/typings/user-role.enum';
import { UserEntity } from 'src/entities/user.entity';
// import { JwtAuthGuard } from '@common/security/jwt.auth.guard';
// import { RolesGuard } from '@common/security/role.guard';

@ApiTags('Users')
@Controller('user')
// @UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@User() user: { id: number }): Promise<any> {
    return this.userService.getUserById(user.id);
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async getAll(): Promise<any> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async getById(@Param('id') id: string): Promise<UserEntity> {
    return this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(user);
  }

  @Put(':id')
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.userService.delete(id);
  }
}

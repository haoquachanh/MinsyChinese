import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/common/security/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}

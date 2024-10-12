import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/common/security/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule {}

import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
// import { UserLoginDto } from '@modules/users/dtos/userlogin';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register(user: User): Promise<User> {
    const exist = await this.userRepository.findOneBy({
      email: user.email,
    });
    console.log(exist);
    if (exist) throw new ConflictException();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.avt = Math.floor(Math.random() * 12).toString();
    user.password = hash;
    return await this.userRepository.save(user);
  }
  async validateUser(credentials: LoginDto): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({
      email: credentials.email,
    });
    if (foundUser) {
      if (await bcrypt.compare(credentials.password, foundUser.password)) {
        return foundUser;
      }
      throw new UnauthorizedException();
    }
    return null;
  }

  async login(credentials: LoginDto): Promise<{ access_token: string }> {
    const foundUser = await this.validateUser(credentials);
    if (!foundUser) throw new NotFoundException();
    const payload = {
      email: foundUser.email,
      fullname: foundUser.fullname,
      avt: foundUser.avt,
      id: foundUser.id,
      role: foundUser.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

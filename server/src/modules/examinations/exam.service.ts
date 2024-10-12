import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dtos/create-exam.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dtos/update-exam.dto';
import { Examination } from 'src/entities/examination.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Examination)
    private readonly examRepository: Repository<Examination>,
  ) {}

  async getAllUsers(): Promise<Examination[]> {
    return await this.examRepository.find();
  }

  async getUserById(id: string | number): Promise<Examination> {
    const theId = typeof id === 'string' ? parseInt(id) : id;
    if (!theId) {
      throw new UnprocessableEntityException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          id: 'examIdMustBeNumber',
        },
      });
    }
    const theUser = await this.examRepository.findOneBy({ id: theId });
    if (!theUser) {
      throw new UnprocessableEntityException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'examNotFound',
        },
      });
    }
    delete theUser.password;
    return theUser;
  }

  async create(exam: CreateUserDto): Promise<Examination> {
    const clonedPayload = { ...exam };
    if (clonedPayload.email) {
      const examObject = await this.examRepository.findOne({
        where: { email: clonedPayload.email },
      });
      if (examObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            email: 'emailAlreadyExists',
          },
        });
      }
    }
    if (clonedPayload.password) {
      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);
    }

    const result = await this.examRepository.save(clonedPayload);
    // delete result.password;
    return result;
  }

  async update(id: string, exam: UpdateUserDto): Promise<UpdateResult> {
    const theId = parseInt(id);
    const theUser = await this.examRepository.findOneBy({ id: theId });
    if (!theUser) {
      throw new UnprocessableEntityException({
        status: HttpStatus.NOT_FOUND,
        errors: {
          id: 'examNotFound',
        },
      });
    }
    return await this.examRepository.update(id, exam);
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.examRepository.delete(id);
  }
}

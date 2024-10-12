import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Examination } from 'src/entities/examination.entity';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Examination])],
  providers: [ExamService],
  controllers: [ExamController],
})
export class UserModule {}

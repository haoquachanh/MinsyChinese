import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  // Request,
  UseGuards,
  // ValidationPipe,
  // UseGuards
} from '@nestjs/common';
import { ExamService } from './exam.service';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from '@common/security/jwt.auth.guard';
// import { RolesGuard } from '@common/security/role.guard';

@ApiTags('Exams')
@Controller('user')
// @UseGuards(RolesGuard)
export class ExamController {
  constructor(private readonly examService: ExamService) {}
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.examService.delete(id);
  }
}

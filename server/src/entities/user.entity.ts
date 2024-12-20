import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { UserRole } from 'src/common/typings/user-role.enum';
import { Examination } from './examination.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  @Column({ type: 'simple-enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  phone: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  avt: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  fullname: string;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  birth: string;

  @IsEmpty()
  @CreateDateColumn()
  created: Date;

  @IsEmpty()
  @UpdateDateColumn()
  updated: Date;

  @ManyToMany(() => Examination, (question) => question.users)
  examinations: Examination[];
}

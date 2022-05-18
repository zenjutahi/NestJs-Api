import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNotEmpty()
  description: string;
}

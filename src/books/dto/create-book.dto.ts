import { IsNotEmpty, IsNumberString } from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  title: string;

  cover: string;

  @IsNumberString()
  rating: string;

  synopsis: string;
}
import { IsNotEmpty, IsString, NotContains } from 'class-validator';

export class GetBookDto {
  @IsNotEmpty()
  @IsString()
  @NotContains(' ', { message: 'The slug should NOT contain any whitespace.' })
  slug: string;
}
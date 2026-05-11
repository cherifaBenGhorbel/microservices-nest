import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'The name should not be empty' })
  name: string;

  @IsNumber()
  @IsPositive({ message: 'The price should be a positive number' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'The stock should be a positive number or zero' })
  stock: number;
}

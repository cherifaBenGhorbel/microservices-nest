import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'The name should not be empty' })
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive({ message: 'The price should be a positive number' })
  @IsOptional()
  price?: number;

  @IsNumber()
  @Min(0, { message: 'The stock should be a positive number or zero' })
  @IsOptional()
  stock?: number;
}

import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsPhoneNumber(null)
  phonenumber?: string;

  @IsOptional()
  @IsString()
  bankaccountnumber?: string;
}

import { IsString, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  bankAccountNumber?: string;
}

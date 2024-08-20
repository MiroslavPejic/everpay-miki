import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';

@Controller('clients')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }
}
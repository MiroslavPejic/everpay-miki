import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto'; // Import UpdateClientDto
import { Client } from './client.entity';

@Injectable()
export class ClientService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const { data, error } = await this.supabaseService.getClient()
        .from('clients')
        .insert([createClientDto])
        .single();

      if (error) {
        // Log the error or handle it accordingly
        throw new InternalServerErrorException(`Error creating client: ${error.message}`);
      }
      console.log('data: ', data);
      console.log('error: ', error);
      if (!data) {
        throw new InternalServerErrorException('No data returned after client creation.');
      }

      return data as Client;
    } catch (err) {
      // Catch any unexpected errors and rethrow them
      throw new InternalServerErrorException(`Unexpected error: ${err.message}`);
    }
  }

  async findAll(): Promise<Client[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('clients')
      .select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data as Client[]; // Type assertion
  }

  async findOne(id: string): Promise<Client> {
    const { data, error } = await this.supabaseService.getClient()
      .from('clients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new NotFoundException(`Client with id ${id} not found.`);
    }

    return data as Client; // Type assertion
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    try {
      // Update the client record
      const { data, error } = await this.supabaseService.getClient()
        .from('clients')
        .update(updateClientDto)
        .eq('id', id)
        .single();

      if (error) {
        throw new InternalServerErrorException(`Error updating client: ${error.message}`);
      }

      if (!data) {
        throw new NotFoundException(`Client with id ${id} not found.`);
      }

      return data as Client; // Type assertion
    } catch (err) {
      throw new InternalServerErrorException(`Unexpected error: ${err.message}`);
    }
  }
}

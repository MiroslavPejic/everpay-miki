// src/users/users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('users')
export class UsersController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async getUsers() {
    const { data, error } = await this.supabaseService
      .getClient()
      .from('users')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}

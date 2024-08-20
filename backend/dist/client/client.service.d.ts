import { SupabaseService } from '../supabase/supabase.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
export declare class ClientService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
}

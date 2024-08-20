import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { Client } from './client.entity';
export declare class ClientController {
    private readonly clientService;
    constructor(clientService: ClientService);
    create(createClientDto: CreateClientDto): Promise<Client>;
    findAll(): Promise<Client[]>;
    findOne(id: string): Promise<Client>;
}

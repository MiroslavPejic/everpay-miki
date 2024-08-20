"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let ClientService = class ClientService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async create(createClientDto) {
        try {
            const { data, error } = await this.supabaseService.getClient()
                .from('clients')
                .insert([createClientDto])
                .single();
            if (error) {
                throw new common_1.InternalServerErrorException(`Error creating client: ${error.message}`);
            }
            console.log('data: ', data);
            console.log('error: ', error);
            if (!data) {
                throw new common_1.InternalServerErrorException('No data returned after client creation.');
            }
            return data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Unexpected error: ${err.message}`);
        }
    }
    async findAll() {
        const { data, error } = await this.supabaseService.getClient()
            .from('clients')
            .select('*');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }
    async findOne(id) {
        const { data, error } = await this.supabaseService.getClient()
            .from('clients')
            .select('*')
            .eq('id', id)
            .single();
        if (error) {
            throw new Error(error.message);
        }
        if (!data) {
            throw new common_1.NotFoundException(`Client with id ${id} not found.`);
        }
        return data;
    }
    async update(id, updateClientDto) {
        try {
            const { data, error } = await this.supabaseService.getClient()
                .from('clients')
                .update(updateClientDto)
                .eq('id', id)
                .single();
            if (error) {
                throw new common_1.InternalServerErrorException(`Error updating client: ${error.message}`);
            }
            if (!data) {
                throw new common_1.NotFoundException(`Client with id ${id} not found.`);
            }
            return data;
        }
        catch (err) {
            throw new common_1.InternalServerErrorException(`Unexpected error: ${err.message}`);
        }
    }
};
exports.ClientService = ClientService;
exports.ClientService = ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], ClientService);
//# sourceMappingURL=client.service.js.map
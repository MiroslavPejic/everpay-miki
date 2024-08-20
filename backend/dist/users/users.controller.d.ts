import { SupabaseService } from '../supabase/supabase.service';
export declare class UsersController {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getUsers(): Promise<any[]>;
}

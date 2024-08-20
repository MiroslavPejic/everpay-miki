import { SupabaseService } from '../supabase/supabase.service';
import { Payment } from './payment.entity';
export declare class PaymentService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    createPayment(paymentData: Payment): Promise<any>;
    getPayments(): Promise<Payment[]>;
    getPaymentById(id: string): Promise<Payment>;
    updatePaymentStatus(id: string, status: string): Promise<any>;
}

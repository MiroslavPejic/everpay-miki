import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createPayment(paymentData: Payment): Promise<any> {
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .insert([paymentData])
      .single();

    if (error) {
      throw new Error(`Error creating payment: ${error.message}`);
    }

    return data;
  }

  async getPayments(): Promise<Payment[]> {
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .select('*');

    if (error) {
      throw new Error(`Error fetching payments: ${error.message}`);
    }

    return data;
  }

  async getPaymentById(id: string): Promise<Payment> {
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Error fetching payment: ${error.message}`);
    }

    return data;
  }

  async updatePaymentStatus(id: string, status: string): Promise<any> {
    const { data, error } = await this.supabaseService.getClient()
      .from('payments')
      .update({ status })
      .match({ id });

    if (error) {
      throw new Error(`Error updating payment status: ${error.message}`);
    }

    return data;
  }
}

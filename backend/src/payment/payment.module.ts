import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  imports: [],
  controllers: [PaymentController],
  providers: [PaymentService, SupabaseService],
})
export class PaymentModule {}

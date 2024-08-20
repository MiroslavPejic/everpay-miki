import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from './client/client.module';
import { SupabaseModule } from './supabase/supabase.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the config globally available
    }),
    ClientModule,
    SupabaseModule,
    PaymentModule
  ],
})
export class AppModule {}

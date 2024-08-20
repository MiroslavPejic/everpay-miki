import { Controller, Post, Body, Get, Param, HttpException, HttpStatus, Patch } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async create(@Body() paymentData: Payment): Promise<any> {
    try {
      console.log('payment data: ', paymentData)
      return await this.paymentService.createPayment(paymentData);
    } catch (error) {
      throw new HttpException(`Error creating payment: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(): Promise<Payment[]> {
    try {
      return await this.paymentService.getPayments();
    } catch (error) {
      throw new HttpException(`Error fetching payments: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Payment> {
    try {
      const payment = await this.paymentService.getPaymentById(id);
      if (!payment) {
        throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
      }
      return payment;
    } catch (error) {
      throw new HttpException(`Error fetching payment: ${error.message}`, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  async updatePaymentStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.paymentService.updatePaymentStatus(id, status);
  }
}

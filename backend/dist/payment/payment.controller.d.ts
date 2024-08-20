import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(paymentData: Payment): Promise<any>;
    findAll(): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    updatePaymentStatus(id: string, status: string): Promise<any>;
}

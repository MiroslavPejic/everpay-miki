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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let PaymentService = class PaymentService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async createPayment(paymentData) {
        const { data, error } = await this.supabaseService.getClient()
            .from('payments')
            .insert([paymentData])
            .single();
        if (error) {
            throw new Error(`Error creating payment: ${error.message}`);
        }
        return data;
    }
    async getPayments() {
        const { data, error } = await this.supabaseService.getClient()
            .from('payments')
            .select('*');
        if (error) {
            throw new Error(`Error fetching payments: ${error.message}`);
        }
        return data;
    }
    async getPaymentById(id) {
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
    async updatePaymentStatus(id, status) {
        const { data, error } = await this.supabaseService.getClient()
            .from('payments')
            .update({ status })
            .match({ id });
        if (error) {
            throw new Error(`Error updating payment status: ${error.message}`);
        }
        return data;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map
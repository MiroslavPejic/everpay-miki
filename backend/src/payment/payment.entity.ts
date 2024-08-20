import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class Payment {
  id: string = uuidv4(); // Generate a new UUID for each client
  clientid: string;
  amount: number;
  bankname: string;
  accountnumber: string;
  notes?: string;
  status: string;
}

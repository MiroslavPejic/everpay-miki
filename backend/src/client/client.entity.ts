import { v4 as uuidv4 } from 'uuid';

export class Client {
  id: string = uuidv4(); // Generate a new UUID for each client
  name: string;
  address: string;
  phoneNumber: string;
  bankAccountNumber?: string;
}

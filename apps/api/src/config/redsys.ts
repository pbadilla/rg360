import { RedsysConfig } from "@/types/redsys";

export const REDSYS_CONFIG: RedsysConfig = {
  merchantCode: '999008881',
  terminal: '1',
  secretKey: 'Your_SECRET_KEY_FROM_REDSYS',
  currency: '978',
  transactionType: '0',
  merchantURL: 'https://yourdomain.com/api/payments/redsys-callback',
  successURL: 'https://yourdomain.com/payment/success',
  failureURL: 'https://yourdomain.com/payment/failure',
  environment: 'test',
  urls: {
    live: 'https://sis.redsys.es/sis/realizarPago',
    test: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  },
};

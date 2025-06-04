import { RedsysConfig } from "@/types/redsys";
import type { CurrencyNum, TransactionType } from 'redsys-easy';

export const REDSYS_CONFIG: RedsysConfig & { currency: CurrencyNum } = {
  merchantCode: '999008881',
  terminal: '1',
  secretKey: 'Your_SECRET_KEY_FROM_REDSYS',
  currency: 978 as unknown as CurrencyNum,  // now explicitly typed as CurrencyNum
  transactionType: 1 as unknown as TransactionType, // now explicitly typed as TransactionType
  merchantURL: 'https://yourdomain.com/api/payments/redsys-callback',
  successURL: 'https://yourdomain.com/payment/success',
  failureURL: 'https://yourdomain.com/payment/failure',
  environment: 'test',
  urls: {
    redirect: 'https://yourdomain.com/api/payments/redsys-callback',
    restTrataPeticion: 'https://sis.redsys.es/sis/realizarPago',
    restIniciaPeticion: 'https://sis-t.redsys.es:25443/sis/realizarPago',
  },
};
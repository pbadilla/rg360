import type { CurrencyNum, TransactionType } from 'redsys-easy';

/**
 * Redsys API settings
 *
 * @public
 */

export interface RedsysConfig {
  merchantCode: string;
  terminal: string;
  secretKey: string;
  currency: CurrencyNum;
  transactionType: TransactionType;
  merchantURL: string;
  successURL: string;
  failureURL: string;
  environment: 'test' | 'live';
  urls: {
    redirect: string;
    restTrataPeticion: string;
    restIniciaPeticion: string;
  };
}
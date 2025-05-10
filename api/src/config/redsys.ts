export const REDSYS_CONFIG = {
  merchantCode: '999008881', // Fictitious code for testing
  terminal: '1',
  secretKey: 'Your_SECRET_KEY_FROM_REDSYS',
  currency: '978', // Euro
  transactionType: '0', // Normal Authorization
  merchantURL: 'https://yourdomain.com/api/payments/redsys-callback',
  successURL: 'https://yourdomain.com/payment/success',
  failureURL: 'https://yourdomain.com/payment/failure',
  environment: 'test', // 'live' for production
};

export interface RedsysConfig {
  merchantCode: string;
  terminal: string;
  secretKey: string;
  currency: string;
  transactionType: string;
  merchantURL: string;
  successURL: string;
  failureURL: string;
  environment: 'test' | 'live';
  urls: {
    live: string;
    test: string;
  };
}
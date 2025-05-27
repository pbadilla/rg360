import { Request, Response } from 'express';
import { REDSYS_CONFIG } from '@/config/redsys';
import { createRedsysAPI } from 'redsys-easy'; // ✅ Only import this

const redsysPayment = async (req: Request, res: Response) => {
  const { orderId, amount, userId } = req.body;

  const formattedAmount = (amount * 100).toFixed(0);
    
  const redsys = createRedsysAPI({
    secretKey: REDSYS_CONFIG.secretKey,
    urls: {
      live: REDSYS_CONFIG.urls.live,
      test: REDSYS_CONFIG.urls.test
    }
  });

  const orderNumber = `ORD${Date.now()}`;
  const merchantParams = {
    DS_MERCHANT_AMOUNT: formattedAmount,
    DS_MERCHANT_ORDER: orderNumber,
    DS_MERCHANT_MERCHANTCODE: REDSYS_CONFIG.merchantCode,
    DS_MERCHANT_CURRENCY: REDSYS_CONFIG.currency,
    DS_MERCHANT_TRANSACTIONTYPE: REDSYS_CONFIG.transactionType,
    DS_MERCHANT_TERMINAL: REDSYS_CONFIG.terminal,
    DS_MERCHANT_MERCHANTURL: REDSYS_CONFIG.merchantURL,
    DS_MERCHANT_URLOK: REDSYS_CONFIG.successURL,
    DS_MERCHANT_URLKO: REDSYS_CONFIG.failureURL,
    DS_MERCHANT_PRODUCTDESCRIPTION: 'E-commerce Order',
    DS_MERCHANT_TITULAR: 'Customer Name',
  };

  const merchantParamsBase64 = redsys.signMerchantParameters(merchantParams);
  const signature = redsys.signMerchantParameters(merchantParams.DS_MERCHANT_ORDER, merchantParamsBase64);

  // The target form URL depends on the environment
  const formUrl =
    REDSYS_CONFIG.environment === 'live'
      ? 'https://sis.redsys.es/sis/realizarPago'
      : 'https://sis-t.redsys.es:25443/sis/realizarPago';

  res.json({
    redsysForm: {
      url: formUrl,
      params: {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters: merchantParamsBase64,
        Ds_Signature: signature,
      },
    },
  });
};

export default redsysPayment;

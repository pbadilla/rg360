import { Request, Response } from 'express';
import { REDSYS_CONFIG } from '@/config/redsys';
import { createRedsysAPI } from 'redsys-easy';

const redsysPayment = async (req: Request, res: Response) => {
  const { orderId, amount, userId } = req.body;

  const formattedAmount = (amount * 100).toFixed(0);

  const redsys = createRedsysAPI({
  secretKey: REDSYS_CONFIG.secretKey,
  urls: {
    redirect: REDSYS_CONFIG.urls.redirect,
    restTrataPeticion: REDSYS_CONFIG.urls.restTrataPeticion,
    restIniciaPeticion: REDSYS_CONFIG.urls.restIniciaPeticion,
  },
});

const orderNumber = `ORD${Date.now()}`;

const { url, body } = redsys.createRedirectForm({
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
});

res.json({
  redsysForm: {
    url,
    body,
  },
});
};

export default redsysPayment;

import express from 'express';
// import {
//   encodeMerchantParameters,
//   createMerchantSignature,
//   getEnvironment
// } from 'redsys-easy';
import { 
  createPayment, 
  getPaymentById, 
  getAllPayments, 
  getAllTransactions, 
  getAllRefunds, 
  getAllCustomers 
} from '@/controllers/payments';
import { authMiddleware } from '@/middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, createPayment);
router.get('/transactions', getAllTransactions);
router.get('/refunds', getAllRefunds);
router.get('/customers', getAllCustomers);
router.get('/', getAllPayments);
router.get('/:id', authMiddleware, getPaymentById); // :id last

// router.post('/redsys', authMiddleware, (req, res) => {
//   const { orderId, amount, userId } = req.body;

//   const formattedAmount = (amount * 100).toFixed(0);
//   const orderNumber = `ORD${Date.now()}`;

//   const merchantParams = {
//     DS_MERCHANT_AMOUNT: formattedAmount,
//     DS_MERCHANT_ORDER: orderNumber,
//     DS_MERCHANT_MERCHANTCODE: REDSYS_CONFIG.merchantCode,
//     DS_MERCHANT_CURRENCY: REDSYS_CONFIG.currency,
//     DS_MERCHANT_TRANSACTIONTYPE: REDSYS_CONFIG.transactionType,
//     DS_MERCHANT_TERMINAL: REDSYS_CONFIG.terminal,
//     DS_MERCHANT_MERCHANTURL: REDSYS_CONFIG.merchantURL,
//     DS_MERCHANT_URLOK: REDSYS_CONFIG.successURL,
//     DS_MERCHANT_URLKO: REDSYS_CONFIG.failureURL,
//     DS_MERCHANT_PRODUCTDESCRIPTION: 'E-commerce Order',
//     DS_MERCHANT_TITULAR: 'Customer Name',
//   };

//   const merchantParamsBase64 = encodeMerchantParameters(merchantParams);
//   const signature = createMerchantSignature(REDSYS_CONFIG.secretKey, merchantParamsBase64);
//   const redsysUrl = getEnvironment(REDSYS_CONFIG.environment);

//   res.json({
//     redsysForm: {
//       url: redsysUrl,
//       params: {
//         Ds_SignatureVersion: 'HMAC_SHA256_V1',
//         Ds_MerchantParameters: merchantParamsBase64,
//         Ds_Signature: signature,
//       },
//     },
//   });
// });

export default router;

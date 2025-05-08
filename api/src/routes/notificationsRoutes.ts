// routes/notificationsRoutes.ts
import { Router } from 'express';
import {
  sendOrderConfirmationSMS,
  sendOrderShippedSMS,
  sendPasswordResetSMS,
  sendPromotionalSMS
} from '@/controllers/notifications'

import {
  sendOrderCancellationEmail,
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
  sendPasswordResetEmail,
  sendPromotionalEmail
} from '@/controllers/notifications';

const router = Router();

router.post('/email/order-cancellation', sendOrderCancellationEmail);
router.post('/email/order-confirmation', sendOrderConfirmationEmail);
router.post('/email/order-shipped', sendOrderShippedEmail);
router.post('/email/password-reset', sendPasswordResetEmail);
router.post('/email/promotional', sendPromotionalEmail);

router.post('/sms/order-confirmation', sendOrderConfirmationSMS);
router.post('/sms/order-shipped', sendOrderShippedSMS);
router.post('/sms/password-reset', sendPasswordResetSMS);
router.post('/sms/promotional', sendPromotionalSMS);

export default router;

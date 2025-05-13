import { Router } from 'express';

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

export default router;

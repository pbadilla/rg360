/controllers
  /admin
    - rolesController.ts
    - dashboardController.ts
  /analytics
    - salesController.ts
    - trafficController.ts
  /cart
    - cartController.ts
  /inventory
    - inventoryController.ts
  /notifications
    - emailController.ts
    - smsController.ts
  /orders
    - ordersController.ts
  /passwords
    - requestResetController.ts
    - resetPasswordController.ts
  /payments
    - stripeWebhookController.ts
    - paymentController.ts
  /products
    - productsController.ts
  /promotions
    - promotionsController.ts
  /reviews
    - reviewsController.ts
  /shipping
    - shippingController.ts
  /users
    - usersController.ts
  /vendors
    - vendorsController.ts
  /wishlist
    - wishlistController.ts

/models
  - ProductModel.ts
  - UserModel.ts
  - OrderModel.ts
  - InventoryModel.ts
  - CartModel.ts
  - WishlistModel.ts
  - ReviewModel.ts
  - PaymentModel.ts
  - ShippingModel.ts
  - PromotionModel.ts
  - RoleModel.ts
  - NotificationModel.ts

/routes
  - adminRoutes.ts
  - analyticsRoutes.ts
  - cartRoutes.ts
  - inventoryRoutes.ts
  - notificationsRoutes.ts
  - ordersRoutes.ts
  - passwordRoutes.ts
  - paymentRoutes.ts
  - productsRoutes.ts
  - promotionRoutes.ts
  - reviewRoutes.ts
  - shippingRoutes.ts
  - userRoutes.ts
  - vendorRoutes.ts
  - wishlistRoutes.ts

/services
  - auth.ts
  - mailer.ts
  - payment.ts
  - analytics.ts
  - shipping.ts
  - logger.ts

/utils
  - tokenGenerator.ts
  - validators.ts
  - errorHandler.ts

/middleware
  - authMiddleware.ts
  - roleMiddleware.ts
  - rateLimiter.ts

.env
app.ts
server.ts
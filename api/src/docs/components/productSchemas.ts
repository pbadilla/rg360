/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       properties:
 *         pvp:
 *           type: number
 *         pv:
 *           type: number
 *         benefit_percentage:
 *           type: number
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         color:
 *           type: string
 *     Tag:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         color:
 *           type: string
 *         type:
 *           type: string
 *           enum: [offer, category, brand]
 *     SizeVariation:
 *       type: object
 *       properties:
 *         size:
 *           type: string
 *         stock:
 *           type: number
 *         price:
 *           $ref: '#/components/schemas/Price'
 *         own_stock:
 *           type: boolean
 *     Variation:
 *       type: object
 *       properties:
 *         color:
 *           type: string
 *         sizes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SizeVariation'
 *     ProductImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         alt:
 *           type: string
 *         type:
 *           type: string
 *           enum: [image, video]
 *     Product:
 *       type: object
 *       required:
 *         - ean13
 *         - name
 *         - reference
 *         - status
 *         - rating
 *         - vendorId
 *       properties:
 *         SKU:
 *           type: string
 *         brand:
 *           type: string
 *         category:
 *           $ref: '#/components/schemas/Category'
 *         description:
 *           type: string
 *         ean13:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductImage'
 *         name:
 *           type: string
 *         price:
 *           $ref: '#/components/schemas/Price'
 *         rating:
 *           type: number
 *         reference:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive, discontinued]
 *         stock:
 *           type: number
 *         tags:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Tag'
 *         variations:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Variation'
 *         vendorId:
 *           type: string
 */

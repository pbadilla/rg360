/**
 * @swagger
 components:
  schemas:
    AbandonedCart:
      type: object
      properties:
        _id:
          type: string
          description: The unique ID of the abandoned cart
        userId:
          type: string
          description: ID of the user who abandoned the cart
        items:
          type: array
          items:
            type: object
            properties:
              productId:
                type: string
                description: ID of the product
              quantity:
                type: integer
                description: Quantity of the product
        createdAt:
          type: string
          format: date-time
          description: Date when cart was abandoned
      required:
        - _id
        - userId
        - items
        - createdAt

    Category:
      type: object
      properties:
        id:
          type: string
          description: Unique ID of the category
        name:
          type: string
          description: Name of the category
        description:
          type: string
          description: Detailed description of the category
      required:
        - id
        - name

    Order:
      type: object
      properties:
        id:
          type: string
          description: Unique order ID
        userId:
          type: string
          description: ID of the user who placed the order
        items:
          type: array
          items:
            type: object
            properties:
              productId:
                type: string
              quantity:
                type: integer
              price:
                type: number
                format: float
          description: List of ordered items
        totalAmount:
          type: number
          format: float
          description: Total price of the order
        status:
          type: string
          description: Order status (e.g., pending, shipped)
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - userId
        - items
        - totalAmount
        - status
        - createdAt

    Product:
      type: object
      properties:
        id:
          type: string
          description: Unique product ID
        name:
          type: string
          description: Product name
        description:
          type: string
          description: Product description
        price:
          type: number
          format: float
        brand:
          type: string
          description: Product brand
        category:
          type: string
          description: Product category
        stock:
          type: integer
          description: Available stock count
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - price
        - category
        - stock
        - createdAt

    Shipping:
      type: object
      properties:
        id:
          type: string
          description: Unique shipping ID
        userId:
          type: string
          description: User associated with shipping
        address:
          type: string
          description: Shipping address
        city:
          type: string
        postalCode:
          type: string
        country:
          type: string
        phone:
          type: string
        status:
          type: string
          description: Shipping status
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - userId
        - address
        - city
        - postalCode
        - country
        - status
        - createdAt

    User:
      type: object
      properties:
        id:
          type: string
          description: Unique user ID
        username:
          type: string
        email:
          type: string
          format: email
        password:
          type: string
          description: Hashed password
        roles:
          type: array
          items:
            type: string
          description: User roles (e.g., admin, user)
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - username
        - email
        - password
        - createdAt

    Vendor:
      type: object
      properties:
        id:
          type: string
          description: Unique vendor ID
        name:
          type: string
        email:
          type: string
          format: email
        phone:
          type: string
        address:
          type: string
        createdAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - email
        - createdAt

    WishlistItem:
      type: object
      properties:
        productId:
          type: string
          description: ID of the product in wishlist
        addedAt:
          type: string
          format: date-time
      required:
        - productId
        - addedAt
 */

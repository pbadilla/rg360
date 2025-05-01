# 🛒 RG360 E-commerce API

A RESTful API built with **Express** and **TypeScript** to manage products, handle CSV imports, generate AI-based descriptions, and send email notifications. Built for the [RG360](https://rollergrind360.com) ecosystem.

---

## 🚀 Features

- 🔍 CRUD operations for products
- 📦 Bulk product import via CSV (with authentication)
- ✨ AI-generated product descriptions
- 📧 Email sending via Gmail
- 🧠 Typed and structured with TypeScript
- 🧪 Easy to test and extend

---

## 📁 Project Structure

api/
├── controllers/
│   ├── product.ts
│   ├── email.ts
│   └── csvController.ts
├── services/
│   └── aiDescription.ts
├── routes/
│   ├── productRoutes.ts
│   ├── emailRoutes.ts
│   └── csvRoutes.ts
├── utils/
│   ├── fileUtils.ts
│   └── productUtils.ts
├── types/
│   └── product.d.ts
├── models/
│   └── (optional if using MongoDB/Mongoose)
├── app.ts / index.ts
└── .env

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/rg360-api.git
cd rg360-api
```

### 2. Install Dependencies

```
pnpm install
```

Note: Uses pnpm for faster installs. You can also use npm or yarn if preferred.

### 3. Set Up Environment Variables

Create a .env file in the root directory:

```
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🔌 Available Endpoints

### 🧾 Products

| Method | Endpoint                | Description                             |
|--------|-------------------------|-----------------------------------------|
| POST   | `/product`              | Generate a product description using AI |
| POST   | `/products`             | Add a new product                        |
| GET    | `/products`             | Get all products                         |
| GET    | `/products/:productId`  | Get product by ID                        |
| DELETE | `/products`             | Delete all products                      |
| DELETE | `/products/:productId`  | Delete a product by ID                   |

---

### 📤 Email

| Method | Endpoint  | Description          |
|--------|-----------|----------------------|
| POST   | `/email`  | Send a contact email |

---

### 📈 CSV Import

| Method | Endpoint | Description                         |
|--------|----------|-------------------------------------|
| GET    | `/csv`   | Download and process Universkate CSV |

---

## 🧪 Sample Request: Send Email

```http
POST /email
Content-Type: application/json

{
  "subject": "New Order",
  "message": "A customer placed an order for SKU #1234"
}

## 🔒 Security

- Uses [`basic-auth-header`](https://www.npmjs.com/package/basic-auth-header) to securely authenticate when downloading CSV files.
- Emails are sent using Gmail’s SMTP service with app password authentication.
- Make sure your `.env` file is included in your `.gitignore` to avoid exposing sensitive credentials.

---

## 📦 Import Notes

The CSV import process includes:

1. 📥 **Downloading** a remote CSV file from Universkate.
2. ✂️ **Removing** the first row (typically headers).
3. 🛠️ **Parsing and processing** each product row using the `procesarProducto()` utility function.

---

## 📄 License

**MIT License** — [RG360](https://rollergrind360.com)

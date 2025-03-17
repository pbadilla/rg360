require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");

const uri = process.env.MONGO_URI;
const dbName = "rg360_ecommerce "; // Database name

async function seedDatabase() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);

    // Collections
    const users = db.collection("users");
    const vendors = db.collection("vendors");
    const products = db.collection("products");
    const orders = db.collection("orders");
    const inventory = db.collection("inventory");
    const payments = db.collection("payments");

    // Clear existing data (optional)
    await users.deleteMany({});
    await vendors.deleteMany({});
    await products.deleteMany({});
    await orders.deleteMany({});
    await inventory.deleteMany({});
    await payments.deleteMany({});

    console.log("Database cleared. Seeding data...");

    // Insert Users
    const userIds = await users.insertMany([
      { _id: new ObjectId(), name: "John Doe", email: "johndoe@example.com", password: "hashed_password", role: "customer", createdAt: new Date(), updatedAt: new Date() },
      { _id: new ObjectId(), name: "Admin User", email: "admin@example.com", password: "hashed_password", role: "admin", createdAt: new Date(), updatedAt: new Date() }
    ]);

    console.log("Users inserted");

    // Insert Vendors
    const vendorIds = await vendors.insertMany([
      { _id: new ObjectId(), name: "Tech Store Inc.", owner: userIds.insertedIds[1], email: "vendor@example.com", status: "active", createdAt: new Date(), updatedAt: new Date() }
    ]);

    console.log("Vendors inserted");

    // Insert Products
    const productIds = await products.insertMany([
      {
        _id: new ObjectId(),
        name: "Wireless Keyboard",
        description: "Ergonomic wireless keyboard with backlight.",
        price: 59.99,
        category: new ObjectId(),
        vendorId: vendorIds.insertedIds[0],
        stock: 100,
        images: ["keyboard1.jpg"],
        SKU: "LOGI1234",
        rating: 4.7,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: new ObjectId(),
        name: "Bluetooth Mouse",
        description: "Rechargeable Bluetooth mouse with silent click.",
        price: 29.99,
        category: new ObjectId(),
        vendorId: vendorIds.insertedIds[0],
        stock: 150,
        images: ["mouse1.jpg"],
        SKU: "BTM123",
        rating: 4.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log("Products inserted");

    // Insert Inventory
    await inventory.insertMany([
      { _id: new ObjectId(), productId: productIds.insertedIds[0], vendorId: vendorIds.insertedIds[0], stock: 100, lowStockThreshold: 10, lastUpdated: new Date() },
      { _id: new ObjectId(), productId: productIds.insertedIds[1], vendorId: vendorIds.insertedIds[0], stock: 150, lowStockThreshold: 15, lastUpdated: new Date() }
    ]);

    console.log("Inventory inserted");

    // Insert Orders
    const orderIds = await orders.insertMany([
      {
        _id: new ObjectId(),
        userId: userIds.insertedIds[0],
        items: [{ productId: productIds.insertedIds[0], vendorId: vendorIds.insertedIds[0], quantity: 2, price: 59.99 }],
        totalAmount: 119.98,
        status: "processing",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);

    console.log("Orders inserted");

    // Insert Payments
    await payments.insertMany([
      {
        _id: new ObjectId(),
        userId: userIds.insertedIds[0],
        orderId: orderIds.insertedIds[0],
        amount: 119.98,
        paymentMethod: "credit_card",
        transactionId: "txn_123456",
        status: "success",
        createdAt: new Date()
      }
    ]);

    console.log("Payments inserted");

    console.log("✅ Database seeding completed!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await client.close();
  }
}

seedDatabase();

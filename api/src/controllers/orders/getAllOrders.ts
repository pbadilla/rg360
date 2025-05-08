import { Request, Response } from 'express';
import { OrderModel } from '@/models/order';

const getAllOrders = async (_req: Request, res: Response) => {
  try {
      // Log the start of the query
      console.log("Fetching all orders from the database...");

      // Query the database for all orders
      const orders = await OrderModel.find().lean();

      // Log how many orders were found
      console.log(`Found ${orders.length} orders.`);

      // If no orders found, return an empty response with a message
      if (orders.length === 0) {
          return res.status(200).json({
              message: "No orders found.",
              count: 0,
              orders: []
          });
      }

      // Send back the orders and the count
      return res.status(200).json({
          orders,
          count: orders.length
      });
  } catch (error: any) {
      // Log the error for debugging purposes
      console.error("Error fetching orders:", error);

      // Return an error response if something went wrong
      return res.status(500).json({
          message: error.message,
          error
      });
  }
};

export default getAllOrders;


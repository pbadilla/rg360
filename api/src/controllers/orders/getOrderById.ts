import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '@/models/order';

const getOrderById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { orderId } = req.params;
        console.log(`Fetching order by ID: ${orderId}`);

        const order = await OrderModel.findById(orderId).lean();

        if (!order) {
            console.log('Order not found.');
            return res.status(404).json({ message: 'Order not found.' });
        }

        console.log('Order found:', order.name || order._id);
        return res.status(200).json({ order });
    } catch (error: any) {
        console.error('Error fetching order by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getOrderById;

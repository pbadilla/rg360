import { Request, Response, NextFunction } from 'express';
import { OrderModel } from '@/models/order';

const deleteOrderById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { orderId } = req.params;
        console.log(`Deleting order with ID: ${orderId}`);

        const result = await OrderModel.findByIdAndDelete(orderId).lean();

        if (!result) {
            console.log('Order not found.');
            return res.status(404).json({ message: 'Order not found.' });
        }

        console.log('Order deleted successfully.');
        return res.status(200).json({ message: 'Order deleted successfully.' });
    } catch (error: any) {
        console.error('Error deleting order by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default deleteOrderById;

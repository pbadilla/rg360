import { Request, Response, NextFunction } from 'express';
import { PromotionsModel, PromotionsDocument } from '@/models/tracking';

const getTrackingById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { trackingId } = req.params;
        console.log(`Fetching tracking by ID: ${trackingId}`);

        const tracking = await PromotionsModel.findById(trackingId).lean() as PromotionsDocument | null;

        if (!tracking) {
            console.log('Tracking not found.');
            return res.status(404).json({ message: 'Tracking not found.' });
        }

        console.log('Tracking found:', tracking.title || tracking._id);
        return res.status(200).json({ tracking });
    } catch (error: any) {
        console.error('Error fetching tracking by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getTrackingById;

import { Request, Response, NextFunction } from 'express';
import { CarrierModel, CarrierDocument } from '@/models/carriers';

const getCarrierById = async (req: Request, res: Response, _next: NextFunction) => {
    try {
        const { carrierId } = req.params;
        console.log(`Fetching carrier by ID: ${carrierId}`);

        const carrier = await CarrierModel.findById(carrierId).lean() as CarrierDocument | null;

        if (!carrier) {
            console.log('Carrier not found.');
            return res.status(404).json({ message: 'Carrier not found.' });
        }

        console.log('Carrier found:', carrier.name || carrier._id);
        return res.status(200).json({ carrier });
    } catch (error: any) {
        console.error('Error fetching carrier by ID:', error);
        return res.status(500).json({
            message: error.message,
            error
        });
    }
};

export default getCarrierById;

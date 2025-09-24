import { Request, Response } from 'express';

import { syncUniverskateProducts } from '@/controllers/imports/syncUniverskateProducts';
import { syncRollerbladeProducts } from '@/controllers/imports/syncRollerbladeProducts';

/**
 * Unified endpoint that downloads and processes both CSV sources
 * Reuses existing working functions
 */
const importCSVs = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Starting unified CSV download process...');
    
    // Create mock request/response objects for the existing functions
    const createMockResponse = () => {
      let jsonData: any = null;
      let statusCode = 200;
      
      return {
        json: (data: any) => { jsonData = data; },
        status: (code: number) => ({ 
          json: (data: any) => { statusCode = code; jsonData = data; },
          send: (data: any) => { statusCode = code; jsonData = data; }
        }),
        send: (data: any) => { jsonData = data; },
        getResult: () => ({ data: jsonData, status: statusCode })
      };
    };

    // Call both existing functions concurrently
    const [rollerbladeResult, universkateResult] = await Promise.allSettled([
      (async () => {
        const mockRes = createMockResponse();
        await syncUniverskateProducts(req, mockRes as any);
        // await downloadRollerbladeCSV(req, mockRes as any);
        return mockRes.getResult();
      })(),
      (async () => {
        const mockRes = createMockResponse();
        await syncRollerbladeProducts(req, mockRes as any);
        // await downloadUniverskateCSV(req, mockRes as any);
        return mockRes.getResult();
      })()
    ]);

    // Extract data from results
    const rollerbladeData = rollerbladeResult.status === 'fulfilled' && rollerbladeResult.value.status < 400
      ? rollerbladeResult.value.data
      : { 
          message: 'Rollerblade download failed', 
          totalGroups: 0, 
          successGroups: 0, 
          failedGroupsCount: 0,
          products: [],
          error: rollerbladeResult.status === 'rejected' ? rollerbladeResult.reason : rollerbladeResult.value.data
        };

    const universkateData = universkateResult.status === 'fulfilled' && universkateResult.value.status < 400
      ? universkateResult.value.data
      : { 
          message: 'Universkate download failed', 
          totalGroups: 0, 
          successGroups: 0, 
          failedGroupsCount: 0,
          products: [],
          error: universkateResult.status === 'rejected' ? universkateResult.reason : universkateResult.value.data
        };

    // Combine results
    const combinedResults = {
      message: 'Unified CSV download and processing completed',
      rollerblade: {
        success: rollerbladeResult.status === 'fulfilled' && rollerbladeResult.value.status < 400,
        message: rollerbladeData.message || 'Rollerblade processing completed',
        totalGroups: rollerbladeData.totalGroups || 0,
        successGroups: rollerbladeData.successGroups || 0,
        failedGroupsCount: rollerbladeData.failedGroupsCount || 0,
        products: rollerbladeData.products || [],
      },
      universkate: {
        success: universkateResult.status === 'fulfilled' && universkateResult.value.status < 400,
        message: universkateData.message || 'Universkate processing completed',
        totalGroups: universkateData.totalGroups || 0,
        successGroups: universkateData.successGroups || 0,
        failedGroupsCount: universkateData.failedGroupsCount || 0,
        products: universkateData.products || [],
      },
      summary: {
        totalSources: 2,
        successfulSources: [
          rollerbladeResult.status === 'fulfilled' && rollerbladeResult.value.status < 400,
          universkateResult.status === 'fulfilled' && universkateResult.value.status < 400
        ].filter(Boolean).length,
        totalGroups: (rollerbladeData.totalGroups || 0) + (universkateData.totalGroups || 0),
        totalSuccessGroups: (rollerbladeData.successGroups || 0) + (universkateData.successGroups || 0),
        totalFailedGroups: (rollerbladeData.failedGroupsCount || 0) + (universkateData.failedGroupsCount || 0),
        totalProducts: (rollerbladeData.products || []).length + (universkateData.products || []).length,
      },
      errors: [
        ...(rollerbladeData.error ? [{ source: 'rollerblade', error: rollerbladeData.error }] : []),
        ...(universkateData.error ? [{ source: 'universkate', error: universkateData.error }] : []),
      ],
    };

    const bothSuccess = combinedResults.rollerblade.success && combinedResults.universkate.success;
    const partialSuccess = combinedResults.rollerblade.success || combinedResults.universkate.success;
    
    const statusCode = bothSuccess ? 200 : (partialSuccess ? 207 : 500);

    res.status(statusCode).json(combinedResults);

  } catch (err: any) {
    console.error('Unified download error:', err);
    res.status(500).json({
      message: 'Unified CSV download failed',
      error: err.message,
      rollerblade: { success: false, products: [] },
      universkate: { success: false, products: [] },
      summary: {
        totalSources: 2,
        successfulSources: 0,
        totalGroups: 0,
        totalSuccessGroups: 0,
        totalFailedGroups: 0,
        totalProducts: 0,
      },
    });
  }
};

// Export the unified function
export { importCSVs };
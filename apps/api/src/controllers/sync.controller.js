import { priceSyncService } from '../services/price-sync.service.js';

export const getSyncStatus = async (req, res) => {
  try {
    const status = priceSyncService.getStatus();
    res.json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Error fetching sync status:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching sync status' });
  }
};

export const triggerManualSync = async (req, res) => {
  try {
    const result = await priceSyncService.syncAllProducts('admin_manual_trigger');
    res.json({
      success: true,
      message: 'Full catalog price sync executed successfully',
      data: result
    });
  } catch (error) {
    console.error('Error triggering price sync:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to execute price sync' });
  }
};

export const getSyncLogs = async (req, res) => {
  try {
    const logs = priceSyncService.syncLogs;
    res.json({
      success: true,
      data: logs
    });
  } catch (error) {
    console.error('Error fetching sync logs:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch sync logs' });
  }
};

export const resetSyncPrices = async (req, res) => {
  try {
    const result = await priceSyncService.resetAllPrices();
    res.json({
      success: true,
      message: result.message,
      data: result
    });
  } catch (error) {
    console.error('Error resetting prices:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to reset canonical prices' });
  }
};


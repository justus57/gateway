const loanService = require('../services/loanService');

/**
 * Handles POST requests to fetch loan balances.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {Promise<void>}
 */
export async function fetchLoanBalances  (req, res) {
    try {
        const { CustomerNumber, PaybillAccount, ReferenceNumbers } = req.body;
        const requiredParams = [CustomerNumber, PaybillAccount, ReferenceNumbers].every(Boolean);
        if (!requiredParams) {
            return res.status(400).json({ Error: 'Missing required parameters' });
        }
        const result = await loanService.getLoanBalances(CustomerNumber, PaybillAccount, ReferenceNumbers);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
}

/**
 * Handles POST requests to process split payments.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 *
 * @returns {Promise<void>}
 */
exports.postSplitPayment = async (req, res) => {
    try {
        const { CustomerNumber, PaybillAccount, ReferenceNumber, Amount, TransactionID, PaymentDate } = req.body;
        if (!CustomerNumber || !PaybillAccount || !ReferenceNumber || !Amount || !TransactionID || !PaymentDate) {
            res.status(400).json({ Error: 'Missing required parameters' });
            return;
        }
        const result = await loanService.processSplitPayment(CustomerNumber, PaybillAccount, ReferenceNumber, Amount, TransactionID, PaymentDate);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ Error: 'Internal Server Error' });
    }
};
import { fetchLoanBalance } from "../services/loanService.js";
import { AddLoanProcessingJob } from "../workers/worker.js";
import express from 'express';
const router = express.Router();

/**
 * Handles POST requests to fetch loan balances.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
router.post('/balances', async (req, res) => {
  try {
    const { customerNumber, paybillAccount, referenceNumber } = req.body;

    // Validate request body
    if (!customerNumber || !paybillAccount || !referenceNumber) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Fetch balance synchronously via SOAP service
    const result = await fetchLoanBalance( customerNumber, paybillAccount, referenceNumber);

    // Optionally add background task to the queue

    // Instantiate the class
    await AddLoanProcessingJob(customerNumber, paybillAccount, referenceNumber);

    if (!result) {
      return res.status(404).json({ message: 'Loan balance not found' });
    }

    res.status(200).json({
      message: 'Loan balance fetched successfully',
      balance: result
    });
  } catch (error) {
    console.error('Error fetching loan balance:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

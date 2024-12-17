import Queue from "bull";
import { fetchLoanBalance } from "../data/loanDataAccess.js";

const loanQueue = new Queue('loanProcessing', {
  settings: {
    // Set the number of jobs to process concurrently
    maxStalledCount: 0,
    stalledCheckInterval: 30000,
    // Set the number of jobs to process in parallel
    concurrency: 5,
  },
});

// Worker to process jobs
/**
 * Processes loan balance jobs from the loanProcessing queue.
 *
 * @param {Object} job - The job object containing the loan data.
 * @param {string} job.data.customerNumber - The customer's unique identifier.
 * @param {string} job.data.paybillAccount - The customer's paybill account number.
 * @param {string} job.data.referenceNumber - The reference number for the loan.
 * @returns {Object} - An object containing the loan balance.
 * @returns {number} returns.balance - The current loan balance.
 */
loanQueue.process(async (job, done) => {
  try {
    const { customerNumber, paybillAccount, referenceNumber } = job.data;
    console.log(`Processing loan balance for ${customerNumber}`);

    // Perform SOAP call or business logic
    // For example: Call fetchLoanBalance()
    const [balance] = await Promise.all([fetchLoanBalance({
      customerNumber: customerNumber,
      paybillAccount: paybillAccount,
      referenceNumber: referenceNumber
    })]);
    done(null, { balance });
  } catch (error) {
    console.error(`Error processing loan balance for ${customerNumber}: ${error.message}`);
    done(error);
  }
});

export async  function AddLoanProcessingJob(customerNumber, paybillAccount, referenceNumber) {

    try {
      await loanQueue.add({
        customerNumber,
        paybillAccount,
        referenceNumber,
      });
      console.log(`Job added to queue for customer ${customerNumber}`);
    } catch (error) {
      console.error(`Error adding job to queue for customer ${customerNumber}: ${error.message}`);
      throw error;
    }

}
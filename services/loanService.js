import { Worker } from "worker_threads";


/**
 * Fetches loan balances for a list of reference numbers.
 *
 * @param {string} CustomerNumber - The customer number.
 * @param {string} PaybillAccount - The paybill account number.
 * @param {Array<string>} ReferenceNumbers - The list of reference numbers for which to fetch loan balances.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the loan balances.
 * @throws {Error} - Throws an error if an error occurs while fetching the loan balances.
 */
export async function getLoanBalances(CustomerNumber, PaybillAccount, ReferenceNumbers) {
  return createWorker("../gateway/workers/fetchLoanWorker.js", {
    CustomerNumber,
    PaybillAccount,
    ReferenceNumbers
  });
}

/**
 * Fetches loan balances for a specific customer and paybill account.
 *
 * @param {string} CustomerNumber - The customer number for which to fetch loan balances.
 * @param {string} PaybillAccount - The paybill account number for which to fetch loan balances.
 * @param {Array<string>} ReferenceNumbers - The list of reference numbers for which to fetch loan balances.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the loan balances.
 * @throws {Error} - Throws an error if an error occurs while fetching the loan balances.
 */
export async function fetchLoanBalance(CustomerNumber, PaybillAccount, ReferenceNumbers) {
  return getLoanBalances(CustomerNumber, PaybillAccount, ReferenceNumbers);
}

/**
 * Processes a split payment for a specific loan.
 *
 * @param {string} CustomerNumber - The customer number.
 * @param {string} PaybillAccount - The paybill account number.
 * @param {string} ReferenceNumber - The reference number of the loan for which the payment is being processed.
 * @param {number} Amount - The amount of the payment.
 * @param {string} TransactionID - The unique identifier for the payment transaction.
 * @param {string} PaymentDate - The date of the payment.
 *
 * @returns {Promise<Object>} - A promise that resolves to an object containing the result of the payment processing.
 * @throws {Error} - Throws an error if an error occurs while processing the payment.
 */
export async function processSplitPayment(CustomerNumber, PaybillAccount, ReferenceNumber, Amount, TransactionID, PaymentDate) {
  return createWorker('../gateway/workers/postPaymentWorker.js', {
    CustomerNumber,
    PaybillAccount,
    ReferenceNumber,
    Amount,
    TransactionID,
    PaymentDate
  });
}

/**
 * Creates a new worker thread and returns a promise that resolves to the worker's message event data.
 *
 * @param {string} workerPath - The path to the JavaScript file to be run in the worker thread.
 * @param {Object} workerData - The data to be passed to the worker thread.
 *
 * @returns {Promise<Object>} - A promise that resolves to the worker's message event data.
 * @throws {Error} - Throws an error if an error occurs in the worker thread.
 */
function createWorker(workerPath, workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}
import { parentPort, workerData } from "worker_threads";
import {fetchLoanBalance} from "../data/loanDataAccess.js";

/**
 * This worker function is responsible for fetching loan balances based on the provided customer number,
 * paybill account, and reference numbers. It communicates with the main thread using the `parentPort`
 * and `workerData`.
 *
 * @param {Object} workerData - The data passed to the worker thread. It should contain the following properties:
 * @param {string} workerData.CustomerNumber - The customer number for which to fetch loan balances.
 * @param {string} workerData.PaybillAccount - The paybill account for which to fetch loan balances.
 * @param {Array<string>} workerData.ReferenceNumbers - The reference numbers for which to fetch loan balances.
 *
 * @returns {Promise<void>} - The function does not return a value. Instead, it communicates with the main thread
 * using the `parentPort` to send a message containing the status and data (or error message) of the operation.
 */
(async () => {
  try {
    const { CustomerNumber, PaybillAccount, ReferenceNumbers } = workerData;
    if (!CustomerNumber || !PaybillAccount || !ReferenceNumbers) {
      throw new Error("Invalid worker data. CustomerNumber, PaybillAccount, and ReferenceNumbers are required.");
    }
    const [result] = await Promise.all([fetchLoanBalance(
        CustomerNumber,
        PaybillAccount,
        ReferenceNumbers
    )]);
    parentPort.postMessage({ status: "success", data: result });
  } catch (error) {
    parentPort.postMessage({ status: "error", message: error.message });
  } finally {
    parentPort.postMessage({ status: "complete" });
  }
})();
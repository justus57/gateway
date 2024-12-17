import { callSOAPMethod, connectToSOAPService } from "./soapClient.js";




/**
 * Fetches the loan balance for a specific customer using SOAP service.
 *
 * @param {Object} params - The parameters for fetching the loan balance.
 * @param {string} params.customerNumber - The unique identifier for the customer.
 * @param {string} params.paybillAccount - The paybill account number associated with the customer.
 * @param {string} params.referenceNumber - The reference number for the loan.
 * @returns {Promise<Object>} - A promise that resolves to the loan balance result.
 * @throws {Error} - Throws an error if the SOAP service call fails.
 */

export  async function fetchLoanBalance  ({customerNumber, paybillAccount, referenceNumber}){
  try {
    // Get credentials from environment variables
    const wsdlUrl = process.env.BUSINESS_CENTRAL_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    // Validate required parameters
    if (!customerNumber || !paybillAccount || !referenceNumber) {
      throw new Error("Missing required parameters");
    }

    // Connect to the SOAP service with authentication
    await connectToSOAPService(wsdlUrl, username, password);

    // Prepare SOAP method arguments
    const args = {
      CustomerNumber: customerNumber,
      PaybillAccount: paybillAccount,
      ReferenceNumber: referenceNumber,
    };

    // Call the SOAP method and return the result
    const [result] = await Promise.all([callSOAPMethod("GetLoanBalance", args)]);
    return result;
  } catch (error) {
    // Log and rethrow the error
    console.error("Error fetching loan balance:", error);
    throw error;
  }
}



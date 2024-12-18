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
export async function fetchLoanBalance({
  customerNumber,
  paybillAccount,
  referenceNumber,
}) {
  if (!customerNumber || !paybillAccount || !referenceNumber) {
    throw new Error("Missing required parameters");
  }

  try {
    const wsdlUrl = process.env.BUSINESS_CENTRAL_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const soapClient = await connectToSOAPService(wsdlUrl, username, password);

    const args = {
      CustomerNumber: customerNumber,
      PaybillAccount: paybillAccount,
      ReferenceNumber: referenceNumber,
    };

    const result = await callSOAPMethod(soapClient, "GetLoanBalance", args);
    return result;
  } catch (error) {
    console.error("Error fetching loan balance:", error);
    throw error;
  }
}


import soap from "soap";

let soapClient;

/**
 * Establishes a connection to a SOAP service.
 *
 * @param {string} wsdlUrl - The WSDL URL of the SOAP service.
 * @param {string} username - The username for basic authentication.
 * @param {string} password - The password for basic authentication.
 * @returns {Promise<Object>} - A promise that resolves to the SOAP client object.
 * @throws {Error} - Throws an error if the connection to the SOAP service fails.
 */

export const connectToSOAPService = async (wsdlUrl, username, password) => {
  if (!soapClient) {
    try {
      soapClient = await soap.createClientAsync(wsdlUrl);
      soapClient.setSecurity(new soap.BasicAuthSecurity(username, password));
    } catch (error) {
      console.error(`Error connecting to SOAP service:`, error);
      throw error;
    }
  }
  return soapClient;
};

/**
 * Calls a method on the connected SOAP service.
 *
 * @param {string} method - The name of the SOAP method to call.
 * @param {Object} args - The arguments to pass to the SOAP method.
 * @returns {Promise<Object>} - A promise that resolves to the SOAP method response.
 * @throws {Error} - Throws an error if the SOAP client is not initialized or if the SOAP method call fails.
 */
export const callSOAPMethod = async (method, args) => {
  if (!soapClient) {
    throw new Error('SOAP client not initialized');
  }
  try {
    const [response] = await soapClient[method + 'Async'](args);
    return response;
  } catch (error) {
    console.error(`Error calling SOAP method "${method}":`, error);
    throw error;
  }
};

/**
 * Disconnects from the connected SOAP service.
 *
 * @returns {Promise<void>} - A promise that resolves when the SOAP client is disconnected.
 * @throws {Error} - Throws an error if an error occurs while disconnecting from the SOAP service.
 */
const disconnectFromSOAPService = async () => {
  if (soapClient) {
    try {
      soapClient.destroy();
      soapClient = null;
    } catch (error) {
      console.error(`Error disconnecting from SOAP service:`, error);
    }
  }
};

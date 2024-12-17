import loanDataAccess from "../data/loanDataAccess";
import {parentPort, workerData} from "worker_threads";

(async () => {
    try {
        const result = await loanDataAccess.postPayment(workerData);
        parentPort.postMessage(result);
    } catch (error) {
        parentPort.postMessage({ Error: error.message });
    }
})();

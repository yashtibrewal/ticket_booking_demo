import { backendUrl } from "../../environemnt";
import log from 'loglevel';

export const ping = async () => {

    const serviceResponseMessage = { isSuccess: false }

    const url = new URL('health/database', backendUrl);

    try {
        log.info('[API-CALL]: Health Check');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Indicates the request body format
                'Accept': 'application/json' // Specifies that the server should respond with JSON
            }
        });

        if (!response.ok) {
            log.error('[API-CALL]: Response OK: ', response.ok)
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // or response.text() depending on your expected response

        if (response.status == 400 || response.status == 500) {
            log.error('[API-CALL]: Response Status ', response.status)
            serviceResponseMessage.error = new Error(responseData.message);
            serviceResponseMessage.isSuccess = false;
        }
        else {
            log.info('[API-CALL]: Health Check Success');
            serviceResponseMessage.responseData = responseData;
            serviceResponseMessage.isSuccess = true;
        }

    } catch (error) {
        log.error('[API-CALL]: ', error.message);
        serviceResponseMessage.error = error;
        serviceResponseMessage.isSuccess = false;
    }
    return serviceResponseMessage;
};
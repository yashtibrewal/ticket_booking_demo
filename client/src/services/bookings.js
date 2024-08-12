// bookings.js
// This fill will be responsible for the api calls

import { backendUrl } from "../../environemnt";

export const bookMovie = async (data) => {

    const serviceResponseMessage = { isSuccess: false }

    const url = new URL('api/booking', backendUrl);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicates the request body format
                'Accept': 'application/json' // Specifies that the server should respond with JSON
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // or response.text() depending on your expected response

        if (response.status == 400 || response.status == 500) {
            serviceResponseMessage.error = new Error(responseData.message);
            serviceResponseMessage.isSuccess = false;
        }
        else {
            serviceResponseMessage.responseData = responseData;
            serviceResponseMessage.isSuccess = true;
        }

    } catch (error) {
        serviceResponseMessage.error = error;
        serviceResponseMessage.isSuccess = false;
    }
    return serviceResponseMessage;
};

export const getPastBooking = async (data) => {

    const serviceResponseMessage = { isSuccess: false }

    const url = new URL('api/booking', backendUrl);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Indicates the request body format
                'Accept': 'application/json' // Specifies that the server should respond with JSON
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json(); // or response.text() depending on your expected response

        if (response.status == 400 || response.status == 500) {
            serviceResponseMessage.error = new Error(responseData.message);
            serviceResponseMessage.isSuccess = false;
        }
        else {
            serviceResponseMessage.responseData = responseData;
            serviceResponseMessage.isSuccess = true;
        }

    } catch (error) {
        serviceResponseMessage.error = error;
        serviceResponseMessage.isSuccess = false;
    }
    return serviceResponseMessage;
};
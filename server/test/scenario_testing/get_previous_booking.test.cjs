let bookingResponse;
let getBookingResponse;
let statusCode;
let bookingId; // Store booking ID from POST response
const time_to_wait_between_two_api_calls = 100; // 100 ms;

// Function to make the booking (POST request)
async function makeBooking() {
    const url = `${process.env.API_URL}/api/booking`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "movie": "incubate bricks-and-clicks content",
        "seats": {
            "A1": 1,
            "A2": 2,
            "A3": 3,
            "A4": 4,
            "D1": 5,
            "D2": 6
        },
        "slot": "Tue Aug 13 2024 19:00:28 GMT+0530 (India Standard Time)"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    const fetch = (await import('node-fetch')).default;

    const response = await fetch(url, requestOptions);
    statusCode = response.status;
    bookingResponse = await response.json();
    bookingId = bookingResponse._id; // Assume booking ID is returned in the response
}

// Function to get the booking details (GET request)
async function getBooking() {
    const url = `${process.env.API_URL}/api/booking`;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    const fetch = (await import('node-fetch')).default;

    const response = await fetch(url, requestOptions);
    getBookingResponse = await response.json();
}

// Run the booking and verification scenario
describe('Booking Scenario Test', function () {
    before(async function () {
        await import('dotenv/config');
        await makeBooking();
        await new Promise(resolve => setTimeout(resolve, time_to_wait_between_two_api_calls));
        await getBooking();
    });

    it('Booking should be successfully made', async function () {
        const { expect } = await import('chai');
        expect(statusCode).to.equal(201); // Assuming booking response status is 201
    });

    it('GET request should return the correct booking details', async function () {
        const { expect } = await import('chai');
        expect(getBookingResponse).to.be.an('object');
        expect(getBookingResponse).to.have.property('_id', bookingResponse._id);
        expect(getBookingResponse).to.have.property('movie', bookingResponse.movie);
        expect(getBookingResponse).to.have.property('seats').that.deep.equals(bookingResponse.seats);
        expect(getBookingResponse).to.have.property('slot', bookingResponse.slot);
        expect(getBookingResponse).to.have.property('__v', bookingResponse.__v);
    });
});

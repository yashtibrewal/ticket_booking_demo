let responseData;
let statusCode;

// Function to make the HTTP request once
async function makeApiCall() {
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
    statusCode = response.status;
    responseData = await response.json();
}

// Run the API call once before running any test
before(async function () {
    await import('dotenv/config');
    await makeApiCall();
});

// Test 1: Response status code is 200 (common for GET requests)
describe('Status Code Test', function () {
    it('Response status code is 200', async function () {
        const { expect } = await import('chai');
        expect(statusCode).to.equal(200);
    });
});

// Test 2: Response has the required fields
describe('Required Fields Test', function () {
    it('Response has the required fields', async function () {
        const { expect } = await import('chai');
        expect(responseData).to.be.an('object');
        expect(responseData).to.have.property('_id');
        expect(responseData).to.have.property('movie');
        expect(responseData).to.have.property('seats');
        expect(responseData).to.have.property('slot');
        expect(responseData).to.have.property('__v');
    });
});

// Test 3: Seats are in a valid format
describe('Seats Format Test', function () {
    it('Seats are in a valid format', async function () {
        const { expect } = await import('chai');
        expect(responseData.seats).to.be.an('object');
        expect(responseData.seats).to.have.property('A1').that.is.a('number');
        expect(responseData.seats).to.have.property('A2').that.is.a('number');
        expect(responseData.seats).to.have.property('A3').that.is.a('number');
        expect(responseData.seats).to.have.property('A4').that.is.a('number');
        expect(responseData.seats).to.have.property('D1').that.is.a('number');
        expect(responseData.seats).to.have.property('D2').that.is.a('number');
    });
});

// Test 4: Slot is in a valid format
describe('Slot Format Test', function () {
    it('Slot is in a valid format', async function () {
        const { expect } = await import('chai');
        expect(responseData).to.have.property('slot').that.is.a('string');
    });
});

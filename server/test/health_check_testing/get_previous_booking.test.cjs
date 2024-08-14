let responseData;
let statusCode;

// Function to make the HTTP request once
async function makeApiCall() {
    const url = `${process.env.API_URL}/health`;
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
        expect(responseData).to.have.property('status');
        expect(responseData).to.have.property('message');
    });
});

// Test 3: Response fields are in required formats
describe('Health Check Format Test', function () {
    it('Status and message are valid format', async function () {
        const { expect } = await import('chai');
        expect(responseData).to.have.property('message').that.is.a('string');
        expect(responseData).to.have.property('status').that.is.a('string');
    });
});

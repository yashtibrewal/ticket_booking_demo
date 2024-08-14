let responseData;
let statusCode;

// Function to make the HTTP request once
async function makeApiCall() {
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
    responseData = await response.json();
}

// Run the API call once before running any test
before(async function () {
    await import('dotenv/config');
    await makeApiCall();
});

// Test 1: Response status code is 201
describe('Status Code Test', function () {
    it('Response status code is 201', async function () {
        const { expect } = await import('chai');
        expect(statusCode).to.equal(201);
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

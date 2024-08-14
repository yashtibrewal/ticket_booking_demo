
# Documentation

## Frontend

### Local Setup Guide

> Note: The mongodb server should be running locally

#### Method 1: Using web-pack-server
For the frontend server 

1. `cd` into the `/client` repository
2. `npm install`
3. `npm run dev`

Done. The local server is now running, and the link would be in cmd.

#### Method 2: Using nginx

To run it explicity at particular port.

1. Install ngnix.
2. Compule the server files using `npm run build`
3. Update the nginx.conf file. Refer sampel file in the repository.
4. Run nginx.
5. The frontend static files will be served at http://localhost:3000

Done.

## User Stories Covered

1. Display all the movies name, slots and seats Types.

2. For slots display the time, for example, 10:00 AM

3. Option for customer to choose number of seats

4. User should be able to Select items.

5. Seats is set by typing into respective seat's input tag.

6. User should be able to book.

7. User should be able to see the last booking.

8.  If it's first booking then display "no previous booking 
found".

## UI/UX

1. Closure for selection of item

2. After the successful booking clear all selection.

3. While booking you should only make a single POST request and if response has status 200 then update the last booking without making a new GET request. This will save resources :)
Reason for not implementing -> What if the movie has not been booked, what about booking id?

4. If a page reload takes place, selections are restored using localStorage.


> Note: User Session has not been handled, so if 2 different users load the webpage, previous booking will be seen if there is even 1 booking in database.

## Backend

> *Reminder*: The mongodb server should be running locally

For the backend server

1. `cd` into the `/server` repository
2. `npm install`
3. `npm run dev`

Done. The server is now servering at the http://localhost:8080/api-docs

### Testing

#### Local Testing

1. `cd` into the `/server` repository
2. `npm install`
3. `npm run test_server`

Next is to run the test command

1. `npm run test` form a different cmd.

### Endpoints are as follows:

#### POST `/api/booking`

This post API is used for creating a booking based on the userd data.

#### GET `/api/booking`

Returns the latest booking or returns empty message.


#### GET `/api-docs`

Swagger documentation for the API endpoints.

#### GET `/health`

Ping test to check if server is running.

#### GET `/health/database`

Ping test to check if server and database is running.

## Features:

1. Logging http request response relevant properties. The logs will be stored in serve/app.log file
2. Logging information and errors.
3. System health check routes to check if server and db is connected ok.
4. Seperate local and production environment
5. Documentation added using swagger at <url>/api-docs endpoint

---

> Note: I have used the latest nodemodules and upgraded the project to remove server security vulnerabilities.

## Check it out live:

1. Backend Deployed: https://ticket-booking-demo.onrender.com/api-docs/#/ 
2. Frontend Deployed: https://ticket-booking-demo-1.onrender.com/

> *Warning*: Since I have used render.com server, it takes upto 60 seconds for the server to be live once the request has been sent initially. Free service on render.com turns down the server on inactivity.




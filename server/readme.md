Requirements

An express server should listen on port 8080
=> This has been handled by using .env logic.

it should expose two endpoints.
=> has been handled by using router 

Any other endpoint other than mention below is considered invalid.
=> has been handeled by using catching any other route to a default function

endpoints are as follows:

1.

http://localhost:8080/api/booking
method: POST
body: {movie:[movie-name],seats: {A1: [no of A1 seats],A2:[no of A2 seats],...D2:[no of D2 seats]},slot: [time-slot]}
Should return 200 status code on successful booking

2.

http://localhost:8080/api/booking
Should return the last booking if no last booking then return {message: "no previous booking found"}
method: GET
response body: {movie:[last-movie-name],seats: {A1: [last number of A1 seats],A2:[last number of A2 seats],...D2:[last number of D2 seats]},slot: [last-time-slot]}

Other features added:

1. Logging http request response relevant properties
2. Logging information and errors.
3. System health check routes to check if server and db is connected ok.
4. Seperate local and production environment
5. Documentation added using swagger at <url>/api-docs endpoint

Note:
I have used the latest nodemodules and upgraded the project to remove server security vulnerabilities.
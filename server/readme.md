Requirements

An express server should listen on port 8080

it should expose two endpoints.

Any other endpoint other than mention below is considered invalid.

endpoints are as follows:

http://localhost:8080/api/booking
method: POST
body: {movie:[movie-name],seats: {A1: [no of A1 seats],A2:[no of A2 seats],...D2:[no of D2 seats]},slot: [time-slot]}
Should return 200 status code on successful booking

http://localhost:8080/api/booking
Should return the last booking if no last booking then return {message: "no previous booking found"}
method: GET
response body: {movie:[last-movie-name],seats: {A1: [last number of A1 seats],A2:[last number of A2 seats],...D2:[last number of D2 seats]},slot: [last-time-slot]}
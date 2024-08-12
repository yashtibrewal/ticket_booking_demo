import React, { useEffect, useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { getPastBooking } from "../services/bookings";

const PastBooking = ({ newBooking, setNewBooking }) => {
  const [movie, setMovie] = useState('');
  const [slot, setSlot] = useState('');
  const [seats, setSeats] = useState({});
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const { isSuccess, responseData, error } = await getPastBooking();
        if (isSuccess) {

          // To handle no previous bookings
          if (responseData.message) {
            setAlertMessage(responseData.message);
          }
          else {
            setAlertMessage('');
            setMovie(responseData.movie);
            setSeats(responseData.seats);
            setSlot(responseData.slot);
          }
        } else {
          throw error;
        }
      } catch (err) {
        console.log(err);
      } finally {
        setNewBooking(false);
      }
    };
    newBooking && fetchData();

  }, [newBooking, setNewBooking]);

  return (
    <div className="border p-2">
      <h5 className="border-bottom p-2">Previous Booking</h5>
      <div hidden={alertMessage == ''} className="alert alert-info">{alertMessage}</div>
      <div hidden={alertMessage != ''}>
        <div className="border-bottom p-2"><b>Movie:</b> {movie}</div>
        <div className="border-bottom p-2"><b>Time Slot:</b> {slot}</div>
        <div className="p-2">
          <h6><b>Seats:</b></h6>
          <ul>
            {Object.entries(seats).map(([seat, count]) => (
              <li key={seat}>
                {seat}: {count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PastBooking;

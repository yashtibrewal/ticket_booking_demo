import React, { useEffect, useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { getPastBooking } from "../services/bookings";
import log from 'loglevel';

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

        log.error(err.message);

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
        <div className="p-2 d-flex flex-wrap ">
          <div className="p-1"><b>Seats:</b></div>
          {Object.entries(seats).map(([seat, count]) => (
            count > 0 ? (
              <div className="border p-1 m-1" key={seat}>
                {seat}({count})
              </div>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastBooking;

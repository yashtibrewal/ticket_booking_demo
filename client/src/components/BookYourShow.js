import React, { useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css';
import { movies, seats, slots } from "./data";
import { bookMovie } from '../services/bookings';

const BookYourShow = ({onBooking}) => {

    const buttonSpamProtectionTimer = 3000; // 3000 ms

    const [selectableMovies, setSelectableMovie] = useState(movies);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieAlertMesasge, setMovieAlertMessage] = useState('');

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const [selectableSlots, setSeletableSlots] = useState(slots);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [slotAlertMesasge, setSlotAlertMessage] = useState('');

    const handleSlotClick = (slot) => {
        setSelectedSlot(slot);
    };

    const noSelectedSeats = () => {
        return new Array(seats.length).fill(0);
    }

    const initialSeatCounts = noSelectedSeats();
    const [seatCounts, setSeatCounts] = useState(initialSeatCounts)
    const [totalSelectedSeats, setTotalSelectedSeats] = useState(0);
    const [seatAlertMesasge, setSeatAlertMessage] = useState('');

    /**
     * 
     * @param {Number} index 
     * @param {SyntheticEvent} event 
     */
    const handleSeatCount = (index, event) => {

        const value = event.target.value;
        let num = 0;
        try {
            num = parseInt(value, 10);
            const updatedCounts = [...seatCounts];
            updatedCounts[index] = num;
            setSeatCounts(updatedCounts);
            setTotalSelectedSeats(updatedCounts.reduce((value, prev) => prev + value, 0));
        } catch (err) {
            console.log(err);
        }
    }

    const [apiCallAlertMessage, setApiCallAlertMessage] = useState('');
    const [apiCallInfoAlertMessage, setApiCallInfoAlertMessage] = useState('');
    const [apiCallErrorAlertMessage, setApiCallErrorAlertMessage] = useState('');
    const [apiCalled, setApiCalled] = useState(false);

    /**
     * This function collects the data and calls the booking service
     */
    const handleBooking = async () => {

        const seatsToSend = {};

        for (let i = 0; i < seats.length; i++) {
            seatsToSend[seats[i]] = seatCounts[i];
        }
        try {
            setMovieAlertMessage('');
            setSeatAlertMessage('');
            setSlotAlertMessage('');
            setApiCalled(true);
            setApiCallInfoAlertMessage('Booking in progress');

            const serviceResponseMessage = await bookMovie({
                'movie': selectedMovie,
                'slot': selectedSlot,
                'seats': seatsToSend
            });

            if (serviceResponseMessage.isSuccess) {
                console.log('success');
                onBooking();
                setApiCallInfoAlertMessage('');
                setApiCallAlertMessage('Booking Successful!');
            } else {
                throw serviceResponseMessage.error;
            }


        } catch (err) {
            console.log(err);
            setApiCallInfoAlertMessage('');
            setApiCallErrorAlertMessage(err.message);
        } finally {
            setTimeout(() => {
                setApiCalled(false);
            }, buttonSpamProtectionTimer);
        }

        // console.log(selectedMovie, selectedSlot, seatCounts)



        setSelectedMovie(null);
        setSelectedSlot(null);
        setSeatCounts(noSelectedSeats());
        setTotalSelectedSeats(0);
        setMovieAlertMessage("");
        setSlotAlertMessage("");
        setSeatAlertMessage("");
    }

    /**
     * Checks if all the parameters are selected to book a movie.
     * @return {boolean}
     */
    const areParametersSelected = () => {

        if (!selectedMovie) return false;
        if (!selectedSlot) return false;
        if (totalSelectedSeats < 1) return false;

        return true;
    }

    return (
        <div className="bg-light p-3">
            <div className="p-3"> <h5>Book Your Show!! </h5></div>
            <div hidden={apiCallErrorAlertMessage == ''} className="alert alert-danger">{apiCallErrorAlertMessage}</div>
            <div hidden={apiCallAlertMessage == ''} className="alert alert-success">
                <div className="d-flex align-items-center justify-content-between ">
                    <span hidden={apiCallAlertMessage == ''}>{apiCallAlertMessage}</span>
                    <button hidden={apiCallAlertMessage == ''} type="button" className="btn btn-close" onClick={() => { setApiCallAlertMessage('') }}>X</button>

                </div>
            </div>
            <div hidden={apiCallInfoAlertMessage == ''} className="alert alert-info">{apiCallInfoAlertMessage}</div>

            <div className="border-top p-2">
                <h6>Select the movie</h6>
                <div hidden={movieAlertMesasge == ''} className="alert alert-danger">{movieAlertMesasge}</div>
                <div className="d-flex flex-wrap justify-content-start p-2">
                    {selectableMovies.map((movie, index) => (
                        <span
                            key={index}
                            onClick={() => handleMovieClick(movie)}
                            className={`pointer border p-2 m-2 ${selectedMovie === movie ? 'bg-primary text-white' : ''}`}
                        >
                            {movie}
                        </span>
                    ))}
                </div>
            </div>
            <div className="border-top p-2 mt-2">
                <h6>Select the Timing</h6>
                <div hidden={slotAlertMesasge == ''} className="alert alert-danger">{slotAlertMesasge}</div>

                <div className="d-flex flex-wrap justify-content-start p-2">
                    {selectableSlots.map((slot, index) => (
                        <div
                            key={index}
                            onClick={() => handleSlotClick(slot)}
                            className={`pointer border p-2 m-2 ${selectedSlot === slot ? 'bg-primary text-white' : ''}`}
                        >
                            {slot}
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-top p-2 mt-2">
                <h6>Select the seats (Total Selected : {totalSelectedSeats})</h6>
                <div hidden={seatAlertMesasge == ''} className="alert alert-danger">{seatAlertMesasge}</div>
                <div className="d-flex just-content-center flex-wrap">
                    {seats.map((seat, index) => (
                        <div
                            key={index}
                            className="pointer col-sm-12 col-md-6"
                        >
                            <div className="border p-1 mt-2 ">
                                <div className="d-flex justify-space-around">

                                    <div className="ml-5">{`Seat Type ${seat}`}</div>
                                    <div className="ml-5">{`Count ${seatCounts[index]}`}</div>
                                </div>
                                <input
                                    type="range"
                                    value={seatCounts[index]}
                                    onChange={(event) => handleSeatCount(index, event)}
                                    className="form-range mt-1 col"
                                    min="0"
                                    max="20"
                                    step="1"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-top mt-2 pt-2 d-flex justify-content-end">
                <button
                    onClick={() => {
                        if (areParametersSelected()) {
                            handleBooking();
                        } else {
                            // Handle the case when the parameters are not selected
                            if (!selectedMovie) {
                                setMovieAlertMessage('Select a movie')
                            } else {
                                setMovieAlertMessage('');
                            }

                            if (!selectedSlot) {
                                setSlotAlertMessage('Select a time slot')
                            } else {
                                setSlotAlertMessage('');
                            }

                            if (totalSelectedSeats == 0) {
                                setSeatAlertMessage('Select atleast 1 seat')
                            } else {
                                setSeatAlertMessage('');
                            }
                            // console.log("Parameters are not selected.");
                        }
                    }}
                    disabled={apiCalled}
                    className="btn btn-primary"
                >Book Now</button>
            </div>
        </div >
    );
};

export default BookYourShow;

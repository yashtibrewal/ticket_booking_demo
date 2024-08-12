import React, { useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css'
import BookYourShow from "./BookYourShow";
import PastBooking from "./PastBooking";
const App = () => {

  const [newBooking, setNewBooking] = useState(true);

  const bookedMovie = ()=>{
    console.log('Movie booked');
    setNewBooking(true);
  }

  // write your code here
  return (
    <div className="d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-9 my-5">
            <BookYourShow onBooking={bookedMovie}>
            </BookYourShow>
          </div>
          <div className="col-sm-6 col-lg-3 my-5">
            <PastBooking newBooking={newBooking} setNewBooking={setNewBooking}>
            </PastBooking></div>
        </div>
      </div>
    </div>
  );
}


export default App;

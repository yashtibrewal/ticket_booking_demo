import React, { useState } from "react";
import '../styles/App.css';
import '../styles/bootstrap.min.css'
import BookYourShow from "./BookYourShow";
import PastBooking from "./PastBooking";
import ServerConnectionStatus from "./ServerConnection";
const App = () => {

  // This variable is a watcher to call the get booking api
  // set it to true to make the call, it will automatically become false after the api call.
  const [newBooking, setNewBooking] = useState(false);

  const getPreviousBooking = () => {
    setNewBooking(true);
  }

  // write your code here
  return (
    <div className="d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-lg-9 my-5">
            <BookYourShow getPreviousBooking={getPreviousBooking}>
            </BookYourShow>
          </div>
          <div className="col-sm-6 col-lg-3 my-5">
            <div>
              <PastBooking newBooking={newBooking} setNewBooking={setNewBooking}>
              </PastBooking></div>
            <ServerConnectionStatus getPreviousBooking={getPreviousBooking}></ServerConnectionStatus>

          </div>
        </div>
      </div>
    </div>
  );
}


export default App;

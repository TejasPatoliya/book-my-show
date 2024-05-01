import React, { useEffect, useState } from "react";
import { eventData } from "../EventData";

const Admin = () => {
  const [bookedTicketData, setBookedTicketData] = useState([]);

  // get booked ticket data from localstorage
  useEffect(() => {
    let getBookTicketData = JSON.parse(
      localStorage.getItem("bookTicketData") || "[]"
    );
    setBookedTicketData(getBookTicketData);
  }, []);

  // for reseting event data
  const resetEventData = () => {
    localStorage.setItem("eventData", JSON.stringify(eventData));
  };

  return (
    <div className="container border my-2">
      <button
        className="btn btn-danger mt-2"
        onClick={() => {
          resetEventData();
        }}
      >
        Reset Event Data
      </button>
      {bookedTicketData.length !== 0 ? (
        bookedTicketData.map((item, i) => {
          return (
            <div className="border rounded my-2 p-2" key={i}>
              <h5>Event id: {item.eventId}</h5>
              <h5>Event Name: {item.eventName}</h5>
              <h5>User Name: {item.userName}</h5>
              <h5>User Phone: {item.userPhone}</h5>
              <h5>Ticket Booked: {item.userTickets}</h5>
            </div>
          );
        })
      ) : (
        <div className="fs-3 text-center">No Ticket Booked</div>
      )}
    </div>
  );
};

export default Admin;

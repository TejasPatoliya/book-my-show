import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  let navigate = useNavigate();
  const [eventData, setEventData] = useState([]);

  // for getting event data from localstorage
  useEffect(() => {
    let getEventData = JSON.parse(localStorage.getItem("eventData") || "[]");
    setEventData(getEventData);
  }, []);

  return (
    <>
      <div className="container border rounded mt-2">
        <div className="row">
          {eventData.length > 0 ? (
            eventData.map((item, i) => {
              return (
                <div className="col-sm-12 col-md-6 col-lg-4 my-1" key={i}>
                  <div className="card h-100">
                    <img
                      src={item.image}
                      className="card-img-top mx-auto my-3"
                      alt="..."
                      style={{ maxWidth: 250, width: "95%", height: "auto" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">Name: {item.title}</h5>
                      <h6 className="card-title">Price: {item.price} Rs.</h6>
                      <h6 className="card-title">Date: {item.date}</h6>
                      <h6 className="card-title">Time: {item.time}</h6>
                      <h6 className="card-title">Venue: {item.venue}</h6>
                      <h6 className="card-title">
                        Tickets Available: {item.totalTickets}
                      </h6>

                      <button
                        className="btn btn-sm btn-primary mx-1"
                        onClick={() => {
                          navigate(`/event-details/${item.id}`);
                        }}
                      >
                        View Details
                      </button>
                      <button
                        className="btn btn-sm btn-success mx-1"
                        onClick={() => {
                          navigate(`/event-details/${item.id}`);
                        }}
                      >
                        Book Ticket
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No Event Found!</div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;

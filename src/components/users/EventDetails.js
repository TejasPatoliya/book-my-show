import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { errorToastMessage, successToastMessage } from "../../utils";

import soldImage from "../../assets/sold-out.png";

const EventDetails = () => {
  let { eventId } = useParams();
  let navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    tickets: 0,
  });
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  // for getting selected event data
  useEffect(() => {
    let eventData = JSON.parse(localStorage.getItem("eventData" || "[]"));
    let selectedData = eventData.filter((item) => {
      if (item.id == eventId) {
        return item;
      }
    });
    setSelectedEvent(selectedData[0]);
  }, []);

  // for handling change event in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  // for ticekt increase and decrease
  const handleTicketQuantity = (type) => {
    if (type === "inc") {
      if (userData.tickets === selectedEvent?.totalTickets) {
        if (selectedEvent?.totalTickets === 0) {
          errorToastMessage(
            "All tickets are sold-out, please try out other events!!!"
          );
        } else {
          errorToastMessage("No more tickets are available!!!");
        }
      } else {
        setUserData({ ...userData, tickets: Number(userData.tickets) + 1 });
      }
    } else {
      if (userData.tickets !== 0) {
        setUserData({ ...userData, tickets: userData.tickets - 1 });
      }
    }
  };

  // for handling booking ticket process
  const handleTicketBooking = (e) => {
    e.preventDefault();
    if (userData.name === "") {
      errorToastMessage("Please enter your name");
      return;
    } else if (userData.phoneNumber === "") {
      errorToastMessage("Please enter your phone number");
      return;
    } else if (userData.phoneNumber.length !== 10) {
      errorToastMessage("Invalid phone number");
      return;
    } else if (userData.tickets === 0) {
      errorToastMessage("Please select at least one ticket!!");
    } else {
      setLoading(true);
      setTimeout(() => {
        let currentEventData = JSON.parse(
          localStorage.getItem("eventData") || "[]"
        );
        let newEventData = currentEventData?.map((item) => {
          if (item.id === selectedEvent?.id) {
            return {
              ...item,
              totalTickets: item.totalTickets - userData.tickets,
            };
          }
          return item;
        });
        localStorage.setItem("eventData", JSON.stringify(newEventData));

        let currentBookedTicketData = JSON.parse(
          localStorage.getItem("bookTicketData") || "[]"
        );
        successToastMessage("Ticket Booked successfully");
        let newBookedTicket = {
          id: new Date().getTime(),
          eventId: selectedEvent.id,
          eventName: selectedEvent.title,
          userName: userData.name,
          userPhone: userData.phoneNumber,
          userTickets: userData.tickets,
        };
        let newTicketData = [...currentBookedTicketData, newBookedTicket];
        localStorage.setItem("bookTicketData", JSON.stringify(newTicketData));
        setUserData({ name: "", phoneNumber: "", tickets: 0 });
        setLoading(false);
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="container border rounded my-1 position-relative">
      {selectedEvent?.totalTickets === 0 && (
        <img
          src={soldImage}
          alt="sold-image"
          style={{ width: 100, position: "absolute", right: 10, top: 10 }}
        />
      )}
      <div className="row">
        <div className="col-md-4">
          <img src={selectedEvent?.image} alt="image" style={{ width: 200 }} />
        </div>
        <div className="col-md-8">
          <h5>Name: {selectedEvent.title}</h5>
          <h5>Date: {selectedEvent.date}</h5>
          <h5>Time: {selectedEvent.time}</h5>
          <h5>Venue: {selectedEvent.venue}</h5>
          <h5>Availability: {selectedEvent.totalTickets}</h5>
        </div>
      </div>
      <hr />
      {/* ----Booking Form------------------ */}
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Phone Number
          </label>
          <input
            type="number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={(e) => {
              handleChange(e);
            }}
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-flex align-items-center my-2">
          <div>Tickets: </div>
          <button
            type="button"
            className="btn btn-sm btn-dark mx-2"
            style={{ width: "30px" }}
            onClick={() => {
              handleTicketQuantity("dec");
            }}
          >
            -
          </button>
          <div>{userData.tickets}</div>
          <button
            type="button"
            className="btn btn-sm btn-dark mx-2"
            style={{ width: "30px" }}
            onClick={() => {
              handleTicketQuantity("inc");
            }}
          >
            +
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-primary mb-2"
          onClick={(e) => {
            handleTicketBooking(e);
          }}
        >
          {loading && (
            <div
              className="spinner-border"
              role="status"
              style={{ width: 15, height: 15, marginRight: 10 }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Book Ticket
        </button>
      </form>
    </div>
  );
};

export default EventDetails;

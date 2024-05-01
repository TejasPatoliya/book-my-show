const dateData = new Date();
const image = require("../assets/banner.avif");
export const eventData = [
  {
    id: 1,
    title: "Event 1",
    price: 109.95,
    image,
    totalTickets: 5,
    venue: "Venue 88",
    date: dateData.toDateString(),
    time: `${dateData.getHours()}:${dateData.getMinutes()}:${dateData.getSeconds()}`,
  },
  {
    id: 2,
    title: "Event 2",
    price: 22.3,
    image,
    totalTickets: 5,
    venue: "Venue 4",
    date: dateData.toDateString(),
    time: `${dateData.getHours()}:${dateData.getMinutes()}:${dateData.getSeconds()}`,
  },
  {
    id: 3,
    title: "Event 3",
    price: 55.99,
    image,
    totalTickets: 5,
    venue: "Venue 1",
    date: dateData.toDateString(),
    time: `${dateData.getHours()}:${dateData.getMinutes()}:${dateData.getSeconds()}`,
  },
];

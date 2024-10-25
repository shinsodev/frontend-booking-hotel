// src/pages/DiscountEvents.jsx
import React, { useState } from 'react';

const DiscountEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: '30% Off for Weekend Bookings',
      description: 'Book from Friday to Sunday to receive this offer.',
      date: 'From 01/11 to 03/11',
    },
    {
      id: 2,
      title: '20% Discount for New Customers',
      description: 'New customers receive a 20% discount on their first booking.',
      date: 'Ongoing until the end of November',
    },
    {
      id: 3,
      title: 'Winter Promotion',
      description: '25% off for all bookings in December.',
      date: 'From 01/12 to 31/12',
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleAddEvent = () => {
    const id = events.length ? events[events.length - 1].id + 1 : 1;
    setEvents([...events, { id, ...newEvent }]);
    setNewEvent({ title: '', description: '', date: '' });
  };

  const handleEditEvent = (id) => {
    const eventToEdit = events.find(event => event.id === id);
    setNewEvent(eventToEdit);
    setEvents(events.filter(event => event.id !== id));
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="p-8">
      <h2 className="font-medium text-3xl">Discount Events</h2>
      <hr className="my-5" />

      {/* Form to add a new event */}
      <div className="my-5">
        <h3 className="text-xl">Add New Event</h3>
        <input
          type="text"
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <button onClick={handleAddEvent} className="bg-blue-500 text-white p-2 rounded">
          Add Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 shadow-md flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-xl">{event.title}</h3>
              <p>{event.description}</p>
              <p className="text-gray-500">{event.date}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleEditEvent(event.id)} className="bg-yellow-500 text-white p-1 rounded">
                Edit
              </button>
              <button onClick={() => handleDeleteEvent(event.id)} className="bg-red-500 text-white p-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountEvents;

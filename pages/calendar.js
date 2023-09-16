import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const locales = {
  // eslint-disable-next-line global-require
  'en-US': require('date-fns/locale/en-US'),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: 'Big Meeting',
    start: new Date(2021, 6, 1, 10, 0), // July 1, 2021, 10:00 AM
    end: new Date(2021, 6, 1, 12, 0), // July 1, 2021, 12:00 PM
  },
  {
    title: 'Vacation',
    start: new Date(2021, 6, 7, 14, 0), // July 7, 2021, 2:00 PM
    end: new Date(2021, 6, 10, 12, 0), // July 10, 2021, 12:00 PM
  },
  {
    title: 'Conference',
    start: new Date(2021, 6, 20, 9, 0), // July 20, 2021, 9:00 AM
    end: new Date(2021, 6, 23, 17, 0), // July 23, 2021, 5:00 PM
  },
];

function App() {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
          console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4);
          console.log(d4 <= d3);
            */

      if (
        ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4)
                && (d4 <= d3))
      ) {
        alert('CLASH');
        break;
      }
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h3 style={{ marginTop: '20px' }}>Calendar</h3>
      <h5>Add New Event</h5>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: '20%', marginRight: '10px' }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />

        <DatePicker
          placeholderText="Start Date and Time"
          style={{ marginRight: '10px' }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <DatePicker
          placeholderText="End Date and Time"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />

        <button type="button" style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </button>

      </div>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: '50px' }} />
    </div>
  );
}

export default App;

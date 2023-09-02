import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getMyEvents } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';

function Events() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getMyEvents(user.id).then((data) => setEvents(data));
  }, [user]);
  const displayEvents = () => {
    getMyEvents(user.id).then((data) => setEvents(data));
  };

  return (
    <article className="events">
      <h1 style={{ marginTop: '40px' }}>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
        style={{ margin: '40px', backgroundColor: 'orange', borderColor: 'orange' }}
      >
        Create Event
      </Button>
      {events.map((event) => (
        <section
          key={`event--${event.id}`}
          className="event"
          style={{ margin: '40px' }}
        >
          <EventCard
            id={event.id}
            title={event.title}
            image_url={event.image_url}
            organizer={event.organizer.name}
            description={event.description}
            date={event.date}
            time={event.time}
            onUpdate={displayEvents}
            joined={event.joined}
          />
        </section>
      ))}
    </article>

  );
}

export default Events;

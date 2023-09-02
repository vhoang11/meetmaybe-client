import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';
import { getMyEvents } from '../utils/data/eventData';

function Home() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);

  const displayEvents = () => {
    getMyEvents(user.uid).then((data) => setEvents(data));
  };

  useEffect(() => {
    displayEvents();
  }, [user]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.fbUser.displayName}! </h1>
      <div>
        <h2 style={{ marginTop: '20px' }}>Your Events</h2>
      </div>

      <div className="text-center my-4" id="events-section">
        {events.map((event) => (
          <section key={`event--${event.id}`} className="event">
            <EventCard
              id={event.id}
              title={event.title}
              description={event.description}
              location={event.location}
              image_url={event.image_url}
              date={event.date}
              time={event.time}
              onUpdate={displayEvents}
            />
          </section>
        ))}
      </div>
    </div>
  );
}

export default Home;

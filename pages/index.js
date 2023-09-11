import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import EventCard from '../components/events/EventCard';
import { getMyEvents, getPublicEvents } from '../utils/data/eventData';

function Home() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);

  const displayEvents = () => {
    getMyEvents(user.uid).then((data) => setEvents(data));
  };

  // Function to filter public events
  useEffect(() => {
    displayEvents();
    getPublicEvents().then((data) => {
      // Filter only public events
      const publicEvent = data.filter((event) => event.is_public);
      setPublicEvents(publicEvent);
    });
  }, [user]);

  // Function to filter user-specific events
  const getUserEvents = () => events.filter((event) => {
    // Check if the user is an attendee, organizer, or invitee
    const attendees = event.attendees || []; // Ensure attendees is an array or an empty array
    return (
      attendees.some((attendee) => attendee.uid === user.uid)
      || event.organizer.uid === user.uid
      || event.invitee.uid === user.uid
    );
  });

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >

        <div>
          <h2 style={{ marginTop: '20px' }}>Your Events</h2>
        </div>

        <div className="text-center my-4" id="events-section">
          {getUserEvents().length === 0 ? (
            <p
              style={{
                textAlign: 'center',
                marginTop: '50px',
                backgroundColor: 'rgba(255,255,255, 0.5)',
                padding: '50px',
              }}
            >
              No Events
            </p>
          ) : (
            <div>
              {getUserEvents().map((event) => (
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
          )}
        </div>

        <div>
          <h2 style={{ marginTop: '20px' }}>Public Events</h2>
          <div>
            {/* Display only public events */}
            {publicEvents.length === 0 ? (
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '50px',
                  backgroundColor: 'rgba(255,255,255, 0.5)',
                  padding: '50px',
                }}
              >
                No Public Events
              </p>
            ) : (
              <div>
                {publicEvents.map((event) => (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

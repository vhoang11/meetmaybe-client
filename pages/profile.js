/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getMyEvents } from '../utils/data/eventData';
import EventCard from '../components/events/EventCard';

const Profile = () => {
  const { user } = useAuth(); // retrieves user object from the useAuth hook
  const router = useRouter();
  const [events, setEvents] = useState([]);

  const displayEvents = () => {
    getMyEvents(user.uid).then((data) => {
      // Filter events where the user is an attendee, organizer, or invitee
      const userEvents = data.filter((event) => {
        const attendees = event.attendees || []; // Ensure attendees is an array or an empty array
        return (
          attendees.some((attendee) => attendee.uid === user.uid)
          || event.organizer.uid === user.uid
          || event.invitee.uid === user.uid
        );
      });
      setEvents(userEvents);
    });
  };

  useEffect(() => {
    displayEvents();
  }, [user]);

  return (
    <div
      className="text-center d-flex flex-column align-content-center"
      id="creator-page"
      style={{
        height: '90vh',
        padding: '20px',
        maxWidth: '350px',
        margin: '0 auto',
      }}
    >
      <div>
        <img
          src={user.profile_image_url}
          alt={user.name}
          style={{
            width: '300px', borderRadius: '50%', marginBottom: '20px', marginTop: '20px',
          }}
        />
      </div>

      <div style={{ marginTop: '5px' }}>
        <h1>{user.name}</h1>
        <h4>@{user.username}</h4>
        <h4>{user.email}</h4>
        <p>Bio: {user.bio}</p>
        {/* <Button
          onClick={() => {
            router.push(`/profile/${user.id}`);
          }}
          style={{
            marginRight: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          Edit Profile
        </Button> */}
        <Button
          onClick={() => {
            router.push('/events/new');
          }}
          style={{
            backgroundColor: '#6699CC', fontSize: '10px', width: '100px',
          }}
        >
          Create Event
        </Button>
      </div>
      <div>
        <Button variant="danger" onClick={signOut} style={{ fontSize: '10px', marginTop: '20px' }}>
          Sign Out
        </Button>
      </div>

      <div>
        <h2 style={{ marginTop: '20px' }}>Your Events</h2>
      </div>

      <div className="text-center my-4" id="events-section">
        {events.length === 0 ? (
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
        )}
      </div>

    </div>
  );
};

export default Profile;

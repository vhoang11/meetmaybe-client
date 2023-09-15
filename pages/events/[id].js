/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import {
  deleteEvent, getSingleEvent, joinEvent, leaveEvent,
} from '../../utils/data/eventData';
import { getSingleUser } from '../../utils/data/userData';
import getEventAttendees from '../../utils/data/eventAttendeeData';

function EventDetails() {
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState('');
  const [invitee, setInvited] = useState('');
  const [eventAttendees, setEventAttendees] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const updateEventAttendees = () => {
    getEventAttendees(event.id).then((attendeesData) => {
      setEventAttendees(attendeesData);
    });
  };

  useEffect(() => {
    getSingleEvent(id).then((eventData) => {
      setEvent(eventData);
      setOrganizer(eventData.organizer.id);
      // setInvited(eventData.invitee.id);
      getSingleUser(eventData.invitee.id).then(setInvited);
      getEventAttendees(id).then(setEventAttendees);
    });

    // Fetch event attendees for public events
    if (event.is_public) {
      updateEventAttendees();
    }
  }, [id]);

  const leave = () => {
    leaveEvent(id, user.uid).then(() => {
      updateEventAttendees();
    });
  };

  const join = () => {
    joinEvent(id, user.uid).then(() => {
      updateEventAttendees();
    });
  };
  console.warn(event);

  const deleteThisevent = () => {
    if (window.confirm('Delete your Event?')) {
      deleteEvent(id).then(() => router.push('/'));
    }
  };

  return (
    <div id="event-page">

      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <img src={event.image_url} alt={event.title} style={{ width: '265px', margin: '50px' }} />
      </div>
      <div className="text-grey ms-5 details">
        <h2>
          Title: {event.title}
        </h2>
        <hr style={{ width: '270px' }} />
        <h5 style={{
          marginTop: '20px', marginBottom: '20px', color: 'red', fontStyle: 'bold',
        }}
        >{event.organizer_canceled === true && event.invitee_canceled === true ? 'Canceled' : ''}
        </h5>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>Organizer: {event?.organizer?.name}</p>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>Date: {event.date}</p>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>Time: {event.time}</p>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>Invitee: {event?.invitee?.name}</p>
        <p style={{ marginTop: '10px', marginBottom: '10px' }}>{event.description}</p>
        <p style={{ marginTop: '20px', marginBottom: '20px' }}>{event.is_public === true ? 'Public' : '' }</p>

        {organizer.uid !== user.uid
          ? (
            <>
              <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '70px',
                }}
                onClick={deleteThisevent}
              >
                Delete
              </Button>
            </>
          ) : ''}

        {user.uid !== organizer.uid || user.uid !== invitee.uid
          ? (
            <>
              <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '100px',
                }}
                onClick={() => {
                  router.push(`/events/edit/${id}`);
                }}
              >
                Edit or Cancel
              </Button>
            </>
          ) : ''}

        {event.is_public && (
        <>
          {eventAttendees.some((attendee) => attendee.attendee.uid === user.uid) ? (
            <Button
              className="btn-danger"
              onClick={leave}
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '70px',
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              className="btn-success"
              onClick={join}
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '70px',
              }}
            >
              {eventAttendees.some((attendee) => attendee.uid === user.uid) ? 'Leave' : 'Join'}
            </Button>
          )}
          {/* Display event attendees */}
          <div>
            <h4>Event Attendees:</h4>
            <ul>
              {eventAttendees.map((attendee) => (
                <li key={attendee.id}>{attendee.attendee.name}</li>
              ))}
            </ul>
          </div>
        </>
        )}
      </div>
    </div>
  );
}

// EventDetails.propTypes = {
//   onUpdate: PropTypes.func.isRequired,
// };

export default EventDetails;

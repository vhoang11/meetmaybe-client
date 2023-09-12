/* eslint-disable react/destructuring-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../../utils/context/authContext';
import {
  deleteEvent, getSingleEvent, joinEvent, leaveEvent,
} from '../../utils/data/eventData';
import { getSingleUser } from '../../utils/data/userData';
import getEventAttendees from '../../utils/data/eventAttendeeData';

function EventDetails({ onUpdate }) {
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState('');
  const [invitee, setInvited] = useState('');
  const [eventAttendees, setEventAttendees] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  const join = () => {
    joinEvent(id, user.uid)
      .then((updatedEventData) => {
        setEvent(updatedEventData);
        onUpdate();
      });
  };

  useEffect(() => {
    getSingleEvent(id).then((eventData) => {
      setEvent(eventData);
      setOrganizer(user.id);
      getSingleUser(eventData.invitee.id).then(setInvited);
    });

    // Fetch event attendees for public events
    if (event.is_public) {
      getEventAttendees(id).then((attendeesData) => {
        setEventAttendees(attendeesData);
      });
    }
  }, [id]);
  console.warn(event);

  const displayAttendees = () => {
    getEventAttendees().then(setEventAttendees);
  };

  useEffect(() => {
    displayAttendees();
  });
  console.warn(eventAttendees);

  const deleteThisevent = () => {
    if (window.confirm('Delete your Event?')) {
      deleteEvent(id).then(() => router.push('/'));
    }
  };

  return (
    <div className="mt-5" id="event-page">

      <div className="d-flex flex-column">
        <img src={event.image_url} alt={event.title} style={{ width: '30rem', margin: '75px' }} />
      </div>
      <div className="text-grey ms-5 details" style={{ marginTop: '80px', width: '600px' }}>
        <h2>
          Title: {event.title}
        </h2>
        <hr style={{ width: '525px' }} />
        <h5 style={{
          marginTop: '20px', marginBottom: '20px', color: 'red', fontStyle: 'bold',
        }}
        >{event.organizer === user.id && event.invitee === user.id && event.canceled === true ? 'Canceled' : ''}
          {/* { (event.organizer === user.id || event.invitee === user.id) && event.canceled === true ? 'Cancel Pending' : '' } */}
        </h5>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Organizer: {event?.organizer?.name}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Date: {event.date}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Time: {event.time}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Invitee: {event?.invitee?.name}</h4>
        <h5 style={{ marginTop: '20px', marginBottom: '20px' }}>{event.is_public === true ? 'Public' : '' }</h5>
        <p style={{ marginTop: '10px', marginBottom: '10px' }}>{event.description}</p>

        {organizer === user.id
          ? (
            <>
              <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
                }}
                onClick={deleteThisevent}
              >
                Delete
              </Button>
            </>
          ) : ''}

        {organizer === user.id || invitee === user.id // Change to logical OR
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
          {eventAttendees.some((attendee) => attendee.uid === user.uid) ? (
            <Button
              className="btn-danger"
              onClick={leave}
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
            >
              Leave
            </Button>
          ) : (
            <Button
              className="btn-success"
              onClick={join}
              style={{
                margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
              }}
            >
              Join
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

EventDetails.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default EventDetails;

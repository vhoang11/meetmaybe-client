/* eslint-disable react/destructuring-assignment */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteEvent, getSingleEvent } from '../../utils/data/eventData';
import { getSingleUser } from '../../utils/data/userData';

function EventDetails() {
  const [event, setEvent] = useState({});
  const [organizer, setOrganizer] = useState('');
  const [invitee, setInvited] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    getSingleEvent(id).then(setEvent);
    setOrganizer(user.id);
    getSingleUser(id).then(setInvited);
  }, [id]);
  console.warn(event);
  const deleteThisevent = () => {
    if (window.confirm('Delete your Event?')) {
      deleteEvent(id).then(() => router.push('/'));
    }
  };
  return (
    <div className="mt-5 d-flex flex-wrap" id="event-page">

      <div className="d-flex flex-column">
        <img src={event.image_url} alt={event.title} style={{ width: '30rem', margin: '60px' }} />
      </div>
      <div className="text-grey ms-5 details" style={{ marginTop: '80px', width: '600px' }}>
        <h2>
          Title: {event.title}
        </h2>
        <hr />
        <h5 style={{
          marginTop: '20px', marginBottom: '20px', color: 'red', fontStyle: 'bold',
        }}
        >{event.organizer === user.id && event.invitee === user.id && event.canceled === true ? 'Canceled' : ''}
        </h5>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Organizer: {event.organizer.name}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Date: {event.date}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Time: {event.time}</h4>
        <h4 style={{ marginTop: '20px', marginBottom: '20px' }}>Invitee: {event.invitee.name}</h4>
        <h5 style={{ marginTop: '20px', marginBottom: '20px' }}>{event.public === true ? 'Public' : '' }</h5>
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
              {/* <Button
                style={{
                  margin: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
                }}
                onClick={() => {
                  router.push(`/events/${id}`);
                }}
              >
                Cancel
              </Button> */}
            </>
          ) : ''}
      </div>
    </div>
  );
}

// EventDetails.propTypes = {
//   onAdd: PropTypes.func.isRequired,
// };

export default EventDetails;

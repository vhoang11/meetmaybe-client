/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
// import { joinEvent, leaveEvent } from '../../utils/data/eventData';
// import { useAuth } from '../../utils/context/authContext';
// import { useAuth } from '../../utils/context/authContext';
// import { joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  title,
  image_url,
  date,
  time,
  organizer_canceled,
  invitee_canceled,
  // onUpdate,
}) => {
  // const { user } = useAuth();

  // const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  // const join = () => joinEvent(id, user.uid).then(() => onUpdate());
  // const deleteThisEvent = () => {
  //   if (window.confirm('Delete Event?')) {
  //     deleteEvent(id).then(() => onUpdate());
  //   }
  // };
  const router = useRouter();
  return (
    <Card className="text-center" style={{ width: '300px', marginBottom: '20px', height: '340px' }}>
      <Card.Header>Event: {title}</Card.Header>
      <Card.Body>
        <div>
          <img
            src={image_url}
            alt={title}
            style={{
              width: '250px',
            }}
          />
        </div>
        <h5 style={{
          marginTop: '5px', marginBottom: '5px', color: 'red', fontStyle: 'bold', fontSize: '12',
        }}
        >{organizer_canceled === true && invitee_canceled === true ? 'Canceled' : ''}
        </h5>
        <Card.Text style={{ margin: '5px', fontSize: '12px' }}>Date: {date}</Card.Text>
        <Card.Text style={{ marginTop: '5px', fontSize: '12px' }}>Time: {time}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/${id}`);
        }}
        style={{
          marginLeft: '10px', marginRight: '10px', marginBottom: '10px', backgroundColor: '#6699CC', fontSize: '10px',
        }}
      >
        View Event
      </Button>
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  // organizer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  // onUpdate: PropTypes.func.isRequired,
  // joined: PropTypes.bool.isRequired,
  // is_public: PropTypes.bool.isRequired,
  organizer_canceled: PropTypes.bool.isRequired,
  invitee_canceled: PropTypes.bool.isRequired,
};

export default EventCard;

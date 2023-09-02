/* eslint-disable @next/next/no-img-element */
/* eslint-disable camelcase */
/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { Button, Card } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { deleteEvent, joinEvent, leaveEvent } from '../../utils/data/eventData';

const EventCard = ({
  id,
  title,
  image_url,
  description,
  location,
  date,
  time,
  organizer,
  //   public,
  //   canceled,
//   onUpdate,
}) => {
//   const { user } = useAuth();

  //   const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  //   const join = () => joinEvent(id, user.uid).then(() => onUpdate());
  //   const deleteThisEvent = () => {
  //     if (window.confirm('Delete Event?')) {
  //       deleteEvent(id).then(() => onUpdate());
  //     }
  //   };
  const router = useRouter();
  return (
    <Card className="text-center" style={{ width: '300px' }}>
      <Card.Header>Event: {title}</Card.Header>
      <Card.Body>
        <div>
          <img
            src={image_url}
            alt={title}
            style={{
              width: '200px', borderRadius: '50%', marginBottom: '20px', marginTop: '20px',
            }}
          />
        </div>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Organizer: {organizer}</Card.Text>
        <Card.Text>Location: {location}</Card.Text>
        <Card.Text>Date: {date}</Card.Text>
        <Card.Text>Time: {time}</Card.Text>
      </Card.Body>
      <Button
        onClick={() => {
          router.push(`/events/${id}`);
        }}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        View Event
      </Button>
      {/* <Button
        onClick={deleteThisEvent}
        style={{ margin: '10px', backgroundColor: '#6699CC' }}
      >
        Delete
      </Button>
      {
        joined
          ? (
            <Button
              className="btn-danger"
              onClick={leave}
              style={{ margin: '10px', backgroundColor: '#006400' }}
            >Leave
            </Button>
          )
          : (
            <Button
              className="btn-success"
              onClick={join}
              style={{ margin: '10px', backgroundColor: '#006400' }}
            >Join
            </Button>
          )
      } */}
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  organizer: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
//   onUpdate: PropTypes.func.isRequired,
//   joined: PropTypes.bool.isRequired,
};

export default EventCard;

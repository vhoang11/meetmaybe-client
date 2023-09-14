/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
/* eslint-disable react/forbid-prop-types */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useAuth } from '../../utils/context/authContext';
import { createEvent, updateEvent } from '../../utils/data/eventData';
import { getUsers } from '../../utils/data/userData';
// import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  invitee: '',
  location: '',
  date: '',
  time: '',
  is_public: false,
  canceled: false,
};

const EventForm = ({ obj }) => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const [invited, setInvited] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentEvent({
        id: obj.id,
        title: obj.title,
        image_url: obj.image_url,
        description: obj.description,
        invitee: obj.invitee,
        location: obj.location,
        date: obj.date,
        time: obj.time,
        is_public: obj.is_public,
        canceled: obj.canceled,
      });
    }
  }, [obj, user]);

  useEffect(() => {
    getUsers().then(setInvited);
  }, []);

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;

    const newValue = type === 'checkbox' ? checked : value;

    setCurrentEvent((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (obj.id) {
      const eventUpdate = {
        id: currentEvent.id,
        title: currentEvent.title,
        image_url: currentEvent.image_url,
        description: currentEvent.description,
        invitee: currentEvent.invitee,
        location: currentEvent.location,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: obj.id,
        is_public: currentEvent.is_public,
        canceled: currentEvent.canceled,
      };
      updateEvent(eventUpdate)
        .then(() => router.push(`/events/${obj.id}`));
    } else {
      const event = {
        title: currentEvent.title,
        image_url: currentEvent.image_url,
        description: currentEvent.description,
        location: currentEvent.location,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: user.id,
        invitee: currentEvent.invitee,
        is_public: currentEvent.is_public,
        canceled: currentEvent.canceled,
      };
      createEvent(event)
        .then((newEvent) => router.push(`/events/${newEvent.id}`));
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          paddingTop: '100px',
          margin: '0 auto',
        }}
      >
        <Form.Group className="mb-3">

          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            required
            value={currentEvent.title}
            onChange={handleChange}
            style={{ marginBottom: '30px' }}
          />

          <Form.Label>Image Url</Form.Label>
          <Form.Control
            type="text"
            name="image_url"
            value={currentEvent.image_url}
            onChange={handleChange}
            required
            style={{ marginBottom: '30px' }}
          />

          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            style={{ height: '100px', marginBottom: '30px' }}
            name="description"
            value={currentEvent.description}
            onChange={handleChange}
            required
          />

          <Form.Group className="mb-3">
            <Form.Select aria-label="invitee" name="invitee" onChange={handleChange} required value={currentEvent.invitee}>
              <option value="">Invitee</option>
              {
              invited.map((invitee) => (
                <option
                  key={invitee.id}
                  value={invitee.id}
                >
                  {invitee.name}
                </option>
              ))
            }
            </Form.Select>
          </Form.Group>

          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={currentEvent.location}
            onChange={handleChange}
            required
            style={{ marginBottom: '30px' }}
          />

          <Form.Label>Date</Form.Label>
          <Form.Control
            type="text"
            name="date"
            value={currentEvent.date}
            onChange={handleChange}
            required
            style={{ marginBottom: '30px' }}
          />

          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            name="time"
            value={currentEvent.time}
            onChange={handleChange}
            required
            style={{ marginBottom: '30px' }}
          />

        </Form.Group>

        <div className="mb-4">
          <Form.Check
            className="text-grey mb-3"
            type="switch"
            id="is_public"
            name="is_public"
            label="Public Event"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <Form.Check
            className="text-grey mb-3"
            type="switch"
            id="canceled"
            name="canceled"
            label="Cancel"
            onChange={handleChange}
          />
        </div>

        <Button type="submit" style={{ backgroundColor: '#6699CC', marginBottom: '20px' }}>
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string,
    invitee: PropTypes.object,
    location: PropTypes.string,
    date: PropTypes.number,
    time: PropTypes.number,
    is_public: PropTypes.bool,
    canceled: PropTypes.bool,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

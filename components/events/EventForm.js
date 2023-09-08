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
// import 'react-datepicker/dist/react-datepicker.css';

const initialState = {
  title: '',
  image_url: '',
  description: '',
  location: '',
  date: '',
  time: '',
  public: '',
  canceled: '',
};

const EventForm = ({ obj }) => {
  const [currentEvent, setCurrentEvent] = useState(initialState);
  //   const [selectedDate, setSelectedDate] = useState(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) {
      setCurrentEvent({
        id: obj.id,
        title: obj.title,
        image_url: obj.image_url,
        description: obj.description,
        location: obj.location,
        date: obj.date,
        time: obj.time,
        public: obj.public,
        canceled: obj.canceled,
      });
    }
  }, [obj, user]);

  //   useEffect(() => {
  //     getCategories().then(setCategories);
  //   }, []);

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
        location: currentEvent.location,
        date: currentEvent.date,
        time: currentEvent.time,
        organizer: user.id,
        public: currentEvent.public,
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
        public: currentEvent.public,
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
          maxWidth: '700px',
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
            id="public"
            name="public"
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

        <Button type="submit" style={{ backgroundColor: '#6699CC' }}>
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
    location: PropTypes.string,
    date: PropTypes.number,
    time: PropTypes.number,
    public: PropTypes.bool,
    canceled: PropTypes.bool,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

export default EventForm;

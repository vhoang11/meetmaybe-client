/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import EventForm from '../../components/events/EventForm';

const NewEvent = () => (
  <div
    className="text-center d-flex flex-column justify-content-center align-content-center"
    style={{
      height: '90vh',
      padding: '30px',
      maxWidth: '350px',
      margin: '0 auto',
    }}
  >

    <h2 style={{ marginTop: '75px' }}>Create Event</h2>
    <EventForm />
  </div>
);

export default NewEvent;

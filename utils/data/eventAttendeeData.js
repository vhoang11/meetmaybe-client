/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
import { clientCredentials } from '../client';

const getEventAttendees = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/eventattendees?event_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
		  if (!response.ok) {
        throw new Error('Network response was not ok');
		  }
		  return response.json();
    })
    .then((data) => {
		  resolve(data);
    })
    .catch((error) => {
		  reject(error);
    });
});

export default getEventAttendees;

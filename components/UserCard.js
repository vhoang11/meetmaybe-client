/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function UserCard({
  id,
  name,
  image_url,
}) {
//   const deleteThisUser = () => {
//     if (window.confirm(`Delete ${userObj.name}?`)) {
//       deleteThisUser(userObj.id).then(() => onUpdate());
//     }

  return (
    <Card
      className="text-center"
      style={{ width: '300px', marginBottom: '20px', height: '340px' }}
    >
      <Card.Img variant="top" src={image_url} alt={name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link href={`/users/${id}`} passHref>
          <Button variant="primary" className="m-2" style={{ backgroundColor: '#7192be', margin: '20px', fontSize: '10px' }}>VIEW</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  image_url: PropTypes.string,
}.isRequired;

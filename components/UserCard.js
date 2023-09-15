import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

export default function UserCard({ userObj }) {
//   const deleteThisUser = () => {
//     if (window.confirm(`Delete ${userObj.name}?`)) {
//       deleteThisUser(userObj.id).then(() => onUpdate());
//     }

  return (
    <Card style={{
      width: '16rem', margin: '10px', height: '30rem', border: 'transparent',
    }}
    >
      <Card.Img variant="top" src={userObj.image_url} alt={userObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{userObj.name}</Card.Title>
        <Link href={`/users/${userObj.id}`} passHref>
          <Button variant="primary" className="m-2" style={{ backgroundColor: '#7192be', margin: '20px', fontSize: '10px' }}>VIEW</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
  }).isRequired,
};

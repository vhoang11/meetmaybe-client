/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';
import { getSingleUser } from '../utils/data/userData';

export default function UserProfile() {
  const { user } = useAuth();
  const router = useRouter();

  const [userDetails, setUserDetails] = useState({});

  //   const deleteProfile = () => {
  //     if (window.confirm('Are you sure you would like to delete your profile? You cannot undo this action.')) {
  //       deleteUser(user.id).then(() => signOut());
  //     }
  //   };

  const getTheSingleUser = () => {
    getSingleUser(user.id).then(setUserDetails);
  };
  console.warn(userDetails);

  useEffect(() => {
    getTheSingleUser(user.id);
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div
        className="text-center d-flex flex-column align-content-center"
        id="creator-page"
        style={{
          height: '90vh',
          padding: '20px',
          maxWidth: '350px',
          margin: '0 auto',
        }}
      >
        <div className="user-profile-page">
          <img
            className="plant-image"
            src={userDetails.profile_image_url}
            alt={userDetails.name}
            style={{ width: '300px', borderRadius: '50%' }}
          />
        </div>
        <div className="profile-font" style={{ marginTop: '35px' }}>
          <h1 className="post-details-title">{userDetails.first_name} {userDetails.name}</h1>
          <h4 className="post-details-text">Username: <em>{userDetails.username}</em> </h4>
          <h4 className="post-details-title">{userDetails.bio}</h4>
          <Button
            className="profile-btn"
            variant="outline-dark"
            onClick={() => {
              router.push(`/users/edit/${userDetails.id}`);
            }}
          >
            Edit Profile
          </Button>
          <Button
            className="profile-btn"
            variant="outline-dark"
            onClick={() => {
              router.push('/events/new');
            }}
          >
            Create Event
          </Button>
          {/* <Button variant="outline-dark" className="profile-btn" style={{ marginLeft: 5 }} onClick={deleteProfile}> Delete Profile
          </Button> */}

          <div>
            <Button style={{ marginTop: '20px' }} variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </div>

          <div>
            <h2 style={{ marginTop: '20px' }}>Your Events</h2>
          </div>
        </div>
      </div>

    </>
  );
}

/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getUsers } from '../../../utils/data/userData';
import UserCard from '../../../components/UserCard';

export default function SearchBar() {
  const [searchUsers, setSearchUsers] = useState([]);

  const router = useRouter();
  const { searchBar } = router.query;

  const searchAllUsers = () => {
    getUsers().then((users) => {
      const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchBar) || user.username.toLowerCase().includes(searchBar) || user.bio.includes(searchBar));

      setSearchUsers(filteredUsers);
    });
  };

  useEffect(() => {
    searchAllUsers();
    return () => {
      setSearchUsers([]);
    };
  }, [searchBar]);
  console.warn(setSearchUsers);

  return (
    <>
      <div id="search-title">
        <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Search Results</h2>
      </div>
      {searchUsers.length === 0 ? (
        <p style={{
          textAlign: 'center', marginTop: '50px', backgroundColor: 'rgba(255,255,255, 0.5)', padding: '50px',
        }}
        >No Search Results Found
        </p>
      ) : (
        <div className="d-flex flex-wrap text-center" id="search-results" style={{ marginTop: '50px', padding: '30px', backgroundColor: 'rgba(255,255,255, 0.5)' }}>
          {searchUsers.map((user) => <UserCard key={user.id} userObj={user} onUpdate={searchAllUsers} />)}

        </div>
      )}
    </>
  );
}

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';

export default function SearchBar() {
  const [searchBar, setSearchBar] = useState('');

  const router = useRouter();

  const handleChange = (e) => {
    setSearchBar(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setSearchBar !== '') router.push(`/attendees/search/${searchBar}`);
    setSearchBar('');
  };

  return (
    <Form className="text-center d-flex flex-column justify-content-center align-content-center" onSubmit={handleSubmit}>
      <FormControl type="text" placeholder="Search" onChange={handleChange} value={searchBar} style={{ width: '350px', marginTop: '100px', marginLeft: '5px' }} />
    </Form>
  );
}

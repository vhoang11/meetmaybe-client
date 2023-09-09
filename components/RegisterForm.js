import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser

function RegisterForm({ user, updateUser }) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    profile_image_url: '',
    bio: '',
    uid: user.uid,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date
    const updatedFormData = { ...formData, created_on: currentDate };
    registerUser(updatedFormData)
      .then(() => updateUser(user.uid));
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '350px',
        margin: '0 auto',
      }}
    >

      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          required
          value={formData.username}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBio">
        <Form.Label>User Bio</Form.Label>
        <Form.Control
          as="textarea"
          name="bio"
          required
          placeholder="Enter your Bio"
          value={formData.bio}
          onChange={handleInputChange}
        />
        <Form.Text className="text-muted">Let other users know a little bit about you...</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Profile Image Url</Form.Label>
        <Form.Control
          name="profile_image_url"
          required
          value={formData.profile_image_url}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" style={{ backgroundColor: '#003049', marginTop: '20px' }}>
        Register
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;

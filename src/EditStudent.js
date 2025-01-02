import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditStudent = () => {
  const { studentid } = useParams(); // Use useParams to get the id from the URL
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((err) => console.log(err.message));
  }, [studentid]); // Add studentid as a dependency

  const validateForm = () => {
    const errors = {};
    if (!name) errors.name = 'Name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid';
    }
    if (!phone) errors.phone = 'Phone is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const updatedStudent = { id: studentid, name, email, phone };
      try {
        const response = await fetch(`http://localhost:8000/students/${studentid}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedStudent),
        });
        if (response.ok) {
          navigate('/'); 
        } else {
          console.error('Failed to update student data');
        }
      } catch (error) {
        console.error('Error updating student data:', error);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="title">Edit Student</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID (Read-Only):</label>
        <input type="text" id="id" name="id" value={studentid} readOnly />
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="errorMsg">{errors.name}</span>}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="errorMsg">{errors.email}</span>}
        <label htmlFor="phone">Phone:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <span className="errorMsg">{errors.phone}</span>}
        <div className="btns">
          <button type="submit" className="btn btn-save">
            Update
          </button>
          &nbsp;
          <Link to="/" className="btn btn-back">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';

class CreateStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      email: '',
      phone: '',
      errors: {},
    };
  }

  validateForm = () => {
    const { id, name, email, phone } = this.state;
    const errors = {};
    if (!id.trim()) errors.id = 'Please enter your ID.';
    if (!name.trim()) errors.name = 'Please enter your name.';
    if (!email.trim()) {
      errors.email = 'Please enter your email.';
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!phone.trim()) {
      errors.phone = 'Please enter your phone.';
    } else if (!/^\d+$/.test(phone)) {
      errors.phone = 'Phone number must contain only digits.';
    }
    this.setState({ errors });
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateForm();
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.validateForm()) return;

    fetch('http://localhost:8000/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        if (res.ok) {
          alert('Student Data Saved Successfully');
          this.props.navigate('/');
        } else {
          throw new Error('Failed to save data');
        }
      })
      .catch((err) => {
        console.error('Error:', err.message);
      });
  };

  render() {
    const { id, name, email, phone, errors } = this.state;

    return (
      <div className="container">
        <h2 className="title">Add New Student</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="id">ID:</label>
          <input
            type="text"
            id="id"
            name="id"
            value={id}
            onChange={this.handleChange}
          />
          {errors.id && <span className="errorMsg">{errors.id}</span>}

          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          {errors.name && <span className="errorMsg">{errors.name}</span>}

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          {errors.email && <span className="errorMsg">{errors.email}</span>}

          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={this.handleChange}
          />
          {errors.phone && <span className="errorMsg">{errors.phone}</span>}

          <div className="btns">
            <button type="submit" className="btn btn-save">
              Save
            </button>
            &nbsp;
            <Link to="/" className="btn btn-back">
              Back
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default function CreateStudentWithNavigate(props) {
  const navigate = useNavigate();
  return <CreateStudent {...props} navigate={navigate} />;
}

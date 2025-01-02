import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ViewStudent = () => {
  const { studentid } = useParams(); // Get student ID from URL params
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8000/students/${studentid}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setStudentData(data))
      .catch((err) => console.log(err.message));
  }, [studentid]); // Dependency ensures this runs when studentid changes

  return (
    <div className="container">
      <h2>Student Details</h2>
      {studentData ? (
        <div className="details">
          <p><strong>ID:</strong> {studentData.id}</p>
          <p><strong>Name:</strong> {studentData.name}</p>
          <p><strong>Email:</strong> {studentData.email}</p>
          <p><strong>Phone:</strong> {studentData.phone}</p>
        </div>
      ) : (
        <p>Loading student details...</p>
      )}
      <Link to="/" className="btn btn-back">Back</Link>
    </div>
  );
};

export default ViewStudent;

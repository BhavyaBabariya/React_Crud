import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate(); // Correctly use useNavigate hook

    const DisplayDetails = (id) => {
        navigate('/student/view/' + id);
    };

    const EditDetails = (id)=>{
        navigate('/student/edit/' + id);
    }
    const removeDetails = (id) => {
        if (window.confirm("Are you sure you want to Delete?")) {
          fetch(`http://localhost:8000/students/${id}`, {
            method: 'DELETE',
          })
            .then((res) => {
              if (res.ok) {
                alert('Student deleted successfully');
                window.location.reload();
                // Perform any necessary actions, such as refreshing the list
              } else {
                throw new Error('Failed to delete student');
              }
            })
            .catch((err) => console.error('Error deleting student:', err));
        }
      };
      
    
    // Fetch data from API (using fetch ap
    useEffect(() => {
        fetch('http://localhost:8000/students')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setStudents(data);
            })
            .catch((err) => console.error('Fetch error:', err.message));
    }, []);

    return (
        <div className='container'>
            <h2 className='title'>Student Records</h2>
            <div className='table-container'>
                <Link to="/student/create" className='btn btn-add'>Add new student</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students && students.map((student,index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.phone}</td>
                                <td>
                                    <button onClick={() => DisplayDetails(student.id)} className='btn btn-info'>View</button>
                                    <button onClick={()=> EditDetails(student.id)} to={`/student/edit/${student.id}`} className='btn btn-primary'>Edit</button>
                                    <button onClick={()=>removeDetails(student.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTable;

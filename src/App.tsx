import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [car, setCar] = useState('');
  const [purchasedate, setPurchasedate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        setFirstname(user.name.first);
        setLastname(user.name.last);
        setEmail(user.email);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://acc-test-vjn7.onrender.com/form', {
        firstname,
        lastname,
        email,
        car,
        purchasedate
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'letmein'
        }
      });
      if (response.status === 200) {
        setSuccessMessage('Form submitted successfully!');
        setFirstname('');
        setLastname('');
        setEmail('');
        setCar('');
        setPurchasedate('');
      } else {
        setError('Failed to submit form, please fill out all fields');
      }
    }   catch (error) {
      setError('An error occurred while submitting the form. Please try again later.');
    }
  };

  return (
  <div className="container-fluid d-flex justify-content-center mt-3">
     <div className="card"style={{ maxWidth: "600px" }}>
    <div className="card-body">
    <h1 className="text-center mb-4">Please fill out the client form</h1>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="firstname" className="form-label">First Name</label>
    <input type="text" className="form-control" id="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="lastname" className="form-label">Last Name</label>
    <input type="text" className="form-control" id="lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
  </div>
  <div className="mb-3">
    <label htmlFor="car" className="form-label">Car</label>
    <select className="form-select" id="car" value={car} onChange={(event) => setCar(event.target.value)}>
      <option value="">--Select--</option>
      <option value="Golf">Golf</option>
      <option value="Arteon">Arteon</option>
      <option value="Tiguan">Tiguan</option>
    </select>
  </div>
  <div className="mb-3">
    <label htmlFor="purchasedate" className="form-label">Purchase Date</label>
    <input type="date" className="form-control" id="purchasedate" min="2018-01-01" value={purchasedate} onChange={(event) => setPurchasedate(event.target.value)} />
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    {successMessage && <div className="alert alert-success my-3">{successMessage}</div>}
    {errorMessage && <div className="alert alert-danger my-3">{errorMessage}</div>}
  </div>
  </div>
  </div>
);
}

export default App;
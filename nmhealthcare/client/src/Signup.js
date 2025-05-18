import React, { useState } from 'react';
import axios from 'axios';

function Signup({ onSignup }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [adminId, setAdminId] = useState('');
  const [doctorId, setDoctorId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      // Include doctorId only if role is doctor
      const payload = {
        name,
        email,
        password,
        role,
      };
      if (role === 'doctor') {
        payload.doctorId = doctorId;
      }
      if (role === 'admin') {
        payload.adminId = adminId;
      }
      await axios.post('http://localhost:5000/api/auth/register', payload);
      setSuccess('Registration successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
      setRole('patient');
      setDoctorId('');
      setAdminId('');
      if (onSignup) onSignup();
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /><br />
        <label>
          <input
            type="radio"
            value="patient"
            checked={role === 'patient'}
            onChange={() => setRole('patient')}
          />
          Patient
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="doctor"
            checked={role === 'doctor'}
            onChange={() => setRole('doctor')}
          />
          Doctor
        </label>
        <label style={{ marginLeft: '10px' }}>
          <input
            type="radio"
            value="admin"
            checked={role === 'admin'}
            onChange={() => setRole('admin')}
          />
          Admin
        </label>
        <br />
        {role === 'doctor' && (
          <>
            <input
              type="text"
              placeholder="Doctor ID"
              value={doctorId}
              onChange={e => setDoctorId(e.target.value)}
              required
            /><br />
          </>
        )}
        {role === 'admin' && (
          <>
            <input
              type="text"
              placeholder="Admin ID"
              value={adminId}
              onChange={e => setAdminId(e.target.value)}
              required
            /><br />
          </>
        )}
        <button type="submit">Register</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      {success && <p style={{color:'green'}}>{success}</p>}
    </div>
  );
}

export default Signup;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import AdminDashboard from './AdminDashboard';

function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setMessage(res.data))
      .catch(err => setMessage('API not reachable'));
  }, []);

  if (!user) {
    return (
      <div>
        <h1>Smart Healthcare</h1>
        <p>{message}</p>
        {showSignup ? (
          <>
            <Signup onSignup={() => setShowSignup(false)} />
            <p>
              Already have an account?{' '}
              <button onClick={() => setShowSignup(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setUser} />
            <p>
              Don't have an account?{' '}
              <button onClick={() => setShowSignup(true)}>Sign Up</button>
            </p>
          </>
        )}
      </div>
    );
  }

  // Show different dashboards/messages based on user role
  let dashboardMessage = '';
  let dashboardComponent = null;
  if (user.user.role === 'admin') {
    dashboardMessage = 'Welcome, Admin! You have full access.';
    dashboardComponent = <AdminDashboard />;
  } else if (user.user.role === 'doctor') {
    dashboardMessage = 'Welcome, Doctor! You can manage your patients and appointments.';
    // dashboardComponent = <DoctorDashboard />; // Add your DoctorDashboard if you have one
  } else {
    dashboardMessage = 'Welcome, Patient! You can view your health records and appointments.';
    // dashboardComponent = <PatientDashboard />; // Add your PatientDashboard if you have one
  }

  return (
    <div>
      <h1>Smart Healthcare</h1>
      <p>{message}</p>
      <p>{dashboardMessage}</p>
      {dashboardComponent}
    </div>
  );
}

export default App;
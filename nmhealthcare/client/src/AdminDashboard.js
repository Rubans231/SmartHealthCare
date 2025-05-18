import React, { useState } from 'react';

const features = [
  { key: 'doctorMgmt', label: 'Doctor Management' },
  { key: 'patientMgmt', label: 'Patient Management' },
  { key: 'userRoles', label: 'User Role & Access Control' },
  { key: 'appointments', label: 'Appointment Oversight' },
  { key: 'monitoring', label: 'System Monitoring' },
  { key: 'messaging', label: 'Messaging/Broadcast' },
  { key: 'idMgmt', label: 'ID Management' },
  { key: 'reports', label: 'Reports & Analytics' },
  { key: 'settings', label: 'Settings' },
  { key: 'support', label: 'Support Tools' },
];

function AdminDashboard() {
  const [selected, setSelected] = useState(features[0].key);

  return (
    <div style={{ display: 'flex', minHeight: '80vh' }}>
      <nav style={{ minWidth: 220, borderRight: '1px solid #ccc', padding: 20 }}>
        <h3>Admin Features</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {features.map(f => (
            <li key={f.key}>
              <button
                style={{
                  background: selected === f.key ? '#007bff' : 'transparent',
                  color: selected === f.key ? '#fff' : '#333',
                  border: 'none',
                  padding: '10px 15px',
                  width: '100%',
                  textAlign: 'left',
                  cursor: 'pointer',
                  marginBottom: 4,
                  borderRadius: 4
                }}
                onClick={() => setSelected(f.key)}
              >
                {f.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ flex: 1, padding: 30 }}>
        {selected === 'doctorMgmt' && (
          <section>
            <h2>Doctor Management</h2>
            <ul>
              <li>Add, edit, or remove doctor accounts</li>
              <li>Approve or reject doctor registrations</li>
              <li>Assign or revoke doctor IDs</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'patientMgmt' && (
          <section>
            <h2>Patient Management</h2>
            <ul>
              <li>View all patients</li>
              <li>Edit or remove patient records</li>
              <li>Assign patients to doctors</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'userRoles' && (
          <section>
            <h2>User Role & Access Control</h2>
            <ul>
              <li>Promote or demote users (e.g., make a user a doctor or admin)</li>
              <li>Manage user access privileges</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'appointments' && (
          <section>
            <h2>Appointment Oversight</h2>
            <ul>
              <li>View all appointments</li>
              <li>Assign, reschedule, or cancel appointments</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'monitoring' && (
          <section>
            <h2>System Monitoring</h2>
            <ul>
              <li>View system usage statistics (number of users, doctors, patients, appointments)</li>
              <li>Audit logs for user actions</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'messaging' && (
          <section>
            <h2>Messaging/Broadcast</h2>
            <ul>
              <li>Send announcements or notifications to all users, doctors, or patients</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'idMgmt' && (
          <section>
            <h2>ID Management</h2>
            <ul>
              <li>Manage (add/remove) valid doctor IDs for signup verification</li>
              <li>Manage (add/remove) valid admin IDs for admin signup</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'reports' && (
          <section>
            <h2>Reports & Analytics</h2>
            <ul>
              <li>Generate reports (e.g., patient demographics, doctor activity, appointment trends)</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'settings' && (
          <section>
            <h2>Settings</h2>
            <ul>
              <li>Update system-wide settings (e.g., working hours, notification preferences)</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
        {selected === 'support' && (
          <section>
            <h2>Support Tools</h2>
            <ul>
              <li>View and respond to support tickets or user feedback</li>
            </ul>
            <p>(Feature implementation coming soon)</p>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
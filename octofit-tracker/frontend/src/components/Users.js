import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users endpoint:', endpoint);
        console.log('Fetched users:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <i className="bi bi-people-fill"></i>
        Users
      </div>
      <div className="card-body p-0">
        {users.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No users found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <i className="bi bi-person-circle me-2 text-primary"></i>
                      {user.username || 'N/A'}
                    </td>
                    <td>{user.email || 'N/A'}</td>
                    <td>
                      {user.team ? (
                        <span className="badge bg-primary">{user.team}</span>
                      ) : (
                        <span className="text-muted">No team</span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success">Active</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-secondary">
                        <i className="bi bi-pencil"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;

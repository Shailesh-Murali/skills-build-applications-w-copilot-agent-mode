import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Activities endpoint:', endpoint);
        console.log('Fetched activities:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError('Failed to load activities');
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
        <i className="bi bi-activity"></i>
        Activities
      </div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No activities found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Activity Name</th>
                  <th scope="col">User</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <i className="bi bi-lightning-fill me-2 text-warning"></i>
                      {activity.name || activity.activity_type || 'N/A'}
                    </td>
                    <td>{activity.user || activity.username || 'N/A'}</td>
                    <td>
                      <span className="badge bg-info">{activity.duration || 0} min</span>
                    </td>
                    <td>{activity.distance ? `${activity.distance} km` : 'N/A'}</td>
                    <td>
                      <span className="badge bg-danger">{activity.calories || 0} cal</span>
                    </td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'N/A'}</td>
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

export default Activities;

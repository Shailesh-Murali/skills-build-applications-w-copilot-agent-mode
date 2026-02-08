import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Workouts endpoint:', endpoint);
        console.log('Fetched workouts:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError('Failed to load workouts');
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
        <i className="bi bi-heart-pulse-fill"></i>
        Personalized Workouts
      </div>
      <div className="card-body p-0">
        {workouts.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No workouts found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Difficulty</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Target Calories</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <i className="bi bi-heart-pulse me-2 text-danger"></i>
                      <strong>{workout.name || workout.workout_type || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-primary">{workout.type || workout.category || 'General'}</span>
                    </td>
                    <td>
                      {workout.difficulty === 'easy' && <span className="badge bg-success">Easy</span>}
                      {workout.difficulty === 'medium' && <span className="badge bg-warning">Medium</span>}
                      {workout.difficulty === 'hard' && <span className="badge bg-danger">Hard</span>}
                      {!workout.difficulty && <span className="badge bg-secondary">N/A</span>}
                    </td>
                    <td>
                      <span className="badge bg-info">{workout.duration || workout.estimated_duration || 0} min</span>
                    </td>
                    <td>{workout.target_calories || workout.calories || 0} cal</td>
                    <td>
                      <button className="btn btn-sm btn-success me-2">
                        <i className="bi bi-play-fill"></i> Start
                      </button>
                      <button className="btn btn-sm btn-primary">
                        <i className="bi bi-eye"></i>
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

export default Workouts;

import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched teams:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError('Failed to load teams');
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
        <i className="bi bi-people"></i>
        Teams
      </div>
      <div className="card-body p-0">
        {teams.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No teams found</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Members</th>
                  <th scope="col">Total Points</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <i className="bi bi-shield-fill me-2 text-primary"></i>
                      <strong>{team.name || 'N/A'}</strong>
                    </td>
                    <td>{team.description || 'No description'}</td>
                    <td>
                      <span className="badge bg-info">{team.member_count || team.members?.length || 0} members</span>
                    </td>
                    <td>
                      <span className="badge bg-success">{team.total_points || 0} pts</span>
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary me-2">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-success">
                        <i className="bi bi-person-plus"></i>
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

export default Teams;

import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;

  useEffect(() => {
    setLoading(true);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setLeaders(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched leaderboard:', results);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
        setLoading(false);
      });
  }, [endpoint]);

  const getRankIcon = (rank) => {
    if (rank === 1) return <i className="bi bi-trophy-fill text-warning" style={{fontSize: '1.5rem'}}></i>;
    if (rank === 2) return <i className="bi bi-trophy-fill text-secondary" style={{fontSize: '1.3rem'}}></i>;
    if (rank === 3) return <i className="bi bi-trophy-fill text-danger" style={{fontSize: '1.2rem'}}></i>;
    return rank;
  };

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
        <i className="bi bi-award-fill"></i>
        Leaderboard Rankings
      </div>
      <div className="card-body p-0">
        {leaders.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No rankings available</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Team</th>
                  <th scope="col">Total Points</th>
                  <th scope="col">Activities</th>
                  <th scope="col">Streak</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader, idx) => (
                  <tr key={leader.id || idx} className={idx < 3 ? 'table-warning' : ''}>
                    <th scope="row" className="text-center">
                      {getRankIcon(idx + 1)}
                    </th>
                    <td>
                      <i className="bi bi-person-circle me-2 text-primary"></i>
                      <strong>{leader.user || leader.username || leader.name || 'N/A'}</strong>
                    </td>
                    <td>
                      {leader.team ? (
                        <span className="badge bg-primary">{leader.team}</span>
                      ) : (
                        <span className="text-muted">No team</span>
                      )}
                    </td>
                    <td>
                      <span className="badge bg-success" style={{fontSize: '1rem'}}>
                        {leader.total_points || leader.points || 0} pts
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info">{leader.activity_count || leader.activities || 0}</span>
                    </td>
                    <td>
                      {leader.streak ? (
                        <span className="badge bg-warning">
                          <i className="bi bi-fire"></i> {leader.streak} days
                        </span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <button className="btn btn-sm btn-primary">
                        <i className="bi bi-eye"></i> View
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

export default Leaderboard;

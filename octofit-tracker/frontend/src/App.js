
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-trophy-fill"></i>
            Octofit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-people-fill me-1"></i>
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people me-1"></i>
                  Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-activity me-1"></i>
                  Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-heart-pulse-fill me-1"></i>
                  Workouts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-award-fill me-1"></i>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div>
              <div className="welcome-hero">
                <h1>
                  <i className="bi bi-trophy-fill me-3"></i>
                  Welcome to Octofit Tracker
                </h1>
                <p className="lead">Track your fitness journey, compete with teams, and achieve your goals!</p>
              </div>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <i className="bi bi-people-fill text-primary" style={{fontSize: '3rem'}}></i>
                      <h5 className="card-title mt-3">Users & Teams</h5>
                      <p className="card-text">Manage your profile and join teams to compete together.</p>
                      <Link to="/users" className="btn btn-primary">View Users</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <i className="bi bi-activity text-success" style={{fontSize: '3rem'}}></i>
                      <h5 className="card-title mt-3">Track Activities</h5>
                      <p className="card-text">Log your workouts and monitor your fitness activities.</p>
                      <Link to="/activities" className="btn btn-success">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card text-center h-100">
                    <div className="card-body">
                      <i className="bi bi-award-fill text-warning" style={{fontSize: '3rem'}}></i>
                      <h5 className="card-title mt-3">Leaderboard</h5>
                      <p className="card-text">Compete and see how you rank against others.</p>
                      <Link to="/leaderboard" className="btn btn-warning">View Rankings</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

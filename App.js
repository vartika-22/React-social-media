
import './App.css';
import Login from './component/login';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard';
import Signup from './component/Signup';


function App() {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <div className="App">
       
        <Router>
          <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />}
          />
          </Routes>
        </Router>
    
    </div>
  );
}

export default App;

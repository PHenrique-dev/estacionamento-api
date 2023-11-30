import React from 'react';
import Login from './LoginPage';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

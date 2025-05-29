import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          }
        />
        <Route
          path="/"
          element={
            <AuthGuard>
              <MainPage />
            </AuthGuard>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FeedPage from './pages/FeedPage';
import ProfilePage from './pages/ProfilePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import NetworkPage from './pages/NetworkPage';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

export default function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />} />
      <Route
        path="/"
        element={<PrivateRoute><Layout /></PrivateRoute>}
      >
        <Route index element={<FeedPage />} />
        <Route path="profile/:id" element={<ProfilePage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="jobs/:id" element={<JobDetailPage />} />
        <Route path="network" element={<NetworkPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

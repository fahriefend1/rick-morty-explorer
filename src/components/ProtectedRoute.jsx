import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PortalLoader from './PortalLoader';

// "Middleware" sederhana: membungkus halaman yang butuh sesi login.
// Jika belum login, pengguna diarahkan ke /login dan lokasi asal disimpan
// supaya bisa dikembalikan setelah berhasil masuk.
export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <PortalLoader label="Memeriksa sesi…" />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

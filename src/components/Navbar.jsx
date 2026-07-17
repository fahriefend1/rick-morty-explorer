import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-ring" aria-hidden="true" />
          <span className="brand-text">
            C-137 <span className="brand-accent">Archive</span>
          </span>
        </NavLink>

        <nav className="nav-links" aria-label="Navigasi utama">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Daftar
          </NavLink>
          <NavLink to="/kategori" className={({ isActive }) => (isActive ? 'active' : '')}>
            Kategori
          </NavLink>
          <NavLink to="/favorit" className={({ isActive }) => (isActive ? 'active' : '')}>
            Favorit
          </NavLink>
        </nav>

        <div className="nav-user">
          {user ? (
            <>
              <span className="nav-user-name">{user.displayName}</span>
              <button className="btn" onClick={handleLogout}>Keluar</button>
            </>
          ) : (
            <NavLink to="/login" className="btn btn-primary">Masuk</NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

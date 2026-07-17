import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function validate(values) {
    const next = {};
    if (!values.username.trim()) {
      next.username = 'Username wajib diisi.';
    } else if (values.username.trim().length < 3) {
      next.username = 'Username minimal 3 karakter.';
    }
    if (!values.password) {
      next.password = 'Password wajib diisi.';
    } else if (values.password.length < 6) {
      next.password = 'Password minimal 6 karakter.';
    }
    return next;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setServerError('');
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    // Simulasi delay autentikasi
    setTimeout(() => {
      const result = login(form.username, form.password);
      setSubmitting(false);
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setServerError(result.message);
      }
    }, 400);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <span className="eyebrow">Akses Terbatas</span>
        <h1 className="page-title">Masuk ke Archive</h1>
        <p className="page-sub">
          Butuh kredensial dimensi untuk menyimpan karakter favorit ke database antar-realitas kamu.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="rick"
              autoComplete="username"
              aria-invalid={!!errors.username}
              aria-describedby={errors.username ? 'username-error' : undefined}
            />
            {errors.username && <em id="username-error" className="field-error">{errors.username}</em>}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && <em id="password-error" className="field-error">{errors.password}</em>}
          </label>

          {serverError && <p className="form-error" role="alert">{serverError}</p>}

          <button type="submit" className="btn btn-primary login-submit" disabled={submitting}>
            {submitting ? 'Membuka portal…' : 'Masuk'}
          </button>
        </form>

        <div className="demo-hint">
          <span className="eyebrow">Akun demo</span>
          <ul>
            {demoUsers.map((u) => (
              <li key={u.username}>
                <code>{u.username}</code> / <code>{u.password}</code>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/" className="back-link">← Kembali tanpa masuk</Link>
      </div>
    </div>
  );
}

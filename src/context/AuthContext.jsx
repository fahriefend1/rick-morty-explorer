import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEY = 'rm_explorer_auth';

// Akun demo dengan hash sederhana disimulasikan (bukan produksi nyata,
// cukup untuk memenuhi kebutuhan autentikasi sederhana pada tugas ini).
const DEMO_USERS = [
  { username: 'rick', password: 'wubbalubba', displayName: 'Rick Sanchez' },
  { username: 'morty', password: 'aw-geez', displayName: 'Morty Smith' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lifecycle: pulihkan sesi dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  function login(username, password) {
    const found = DEMO_USERS.find(
      (u) => u.username === username.trim().toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, message: 'Username atau password salah.' };
    }
    const session = { username: found.username, displayName: found.displayName };
    setUser(session);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, demoUsers: DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth harus dipakai di dalam AuthProvider');
  return ctx;
}

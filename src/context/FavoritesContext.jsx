import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'rm_explorer_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Lifecycle: muat data favorit tersimpan saat komponen pertama kali mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  // Lifecycle: setiap kali favorites berubah, sinkronkan ke localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // CREATE
  function addFavorite(character, note = '') {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === character.id)) return prev;
      return [...prev, { id: character.id, name: character.name, image: character.image, species: character.species, status: character.status, note }];
    });
  }

  // UPDATE (mengedit catatan pribadi pada karakter favorit)
  function updateFavoriteNote(id, note) {
    setFavorites((prev) => prev.map((f) => (f.id === id ? { ...f, note } : f)));
  }

  // DELETE
  function removeFavorite(id) {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }

  function isFavorite(id) {
    return favorites.some((f) => f.id === id);
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, updateFavoriteNote, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites harus dipakai di dalam FavoritesProvider');
  return ctx;
}

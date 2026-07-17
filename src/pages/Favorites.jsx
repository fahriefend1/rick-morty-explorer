import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import './Favorites.css';

export default function Favorites() {
  const { favorites, updateFavoriteNote, removeFavorite } = useFavorites();
  const { user } = useAuth();
  const [editingId, setEditingId] = useState(null);
  const [draftNote, setDraftNote] = useState('');

  function startEdit(fav) {
    setEditingId(fav.id);
    setDraftNote(fav.note || '');
  }

  function saveEdit(id) {
    updateFavoriteNote(id, draftNote.trim());
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraftNote('');
  }

  return (
    <div className="container page-block">
      <span className="eyebrow">Favorit</span>
      <h1 className="page-title">Database Pribadi {user ? `— ${user.displayName}` : ''}</h1>
      <p className="page-sub">
        Karakter yang kamu simpan dari seluruh multiverse. Tambahkan catatan pribadi, ubah kapan
        saja, atau hapus dari daftar.
      </p>

      {favorites.length === 0 ? (
        <div className="state-box">
          <p>Belum ada karakter favorit. Kunjungi <Link to="/">Daftar</Link> lalu tambahkan beberapa.</p>
        </div>
      ) : (
        <ul className="fav-list">
          {favorites.map((fav) => (
            <li key={fav.id} className="fav-item">
              <img src={fav.image} alt={fav.name} className="fav-thumb" />
              <div className="fav-body">
                <Link to={`/karakter/${fav.id}`} className="fav-name">{fav.name}</Link>
                <p className="fav-meta">{fav.status} · {fav.species}</p>

                {editingId === fav.id ? (
                  <div className="fav-edit">
                    <input
                      type="text"
                      value={draftNote}
                      onChange={(e) => setDraftNote(e.target.value)}
                      placeholder="Tulis catatan pribadi…"
                      maxLength={140}
                      autoFocus
                    />
                    <div className="fav-edit-actions">
                      <button className="btn btn-primary" onClick={() => saveEdit(fav.id)}>Simpan</button>
                      <button className="btn" onClick={cancelEdit}>Batal</button>
                    </div>
                  </div>
                ) : (
                  <p className="fav-note">
                    {fav.note ? fav.note : <em>Belum ada catatan.</em>}
                  </p>
                )}
              </div>

              {editingId !== fav.id && (
                <div className="fav-actions">
                  <button className="btn" onClick={() => startEdit(fav)}>Edit catatan</button>
                  <button className="btn btn-danger" onClick={() => removeFavorite(fav.id)}>Hapus</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

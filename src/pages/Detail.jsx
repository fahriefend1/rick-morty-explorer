import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCharacterById, fetchEpisodesByUrls } from '../api/rickAndMorty';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import PortalLoader from '../components/PortalLoader';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [status, setStatus] = useState('loading');

  // Lifecycle: setiap kali id di URL berubah, ambil ulang detail karakter + episode
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setCharacter(null);

    fetchCharacterById(id)
      .then(async (data) => {
        if (cancelled) return;
        setCharacter(data);
        setStatus('success');
        const eps = await fetchEpisodesByUrls(data.episode.slice(0, 6));
        if (!cancelled) setEpisodes(eps);
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => { cancelled = true; };
  }, [id]);

  if (status === 'loading') return <PortalLoader label="Menarik data dari arsip…" />;
  if (status === 'error' || !character) {
    return (
      <div className="container page-block">
        <div className="state-box"><p>Karakter tidak ditemukan di dimensi manapun.</p></div>
        <Link to="/" className="btn" style={{ marginTop: 20, display: 'inline-flex' }}>← Kembali ke daftar</Link>
      </div>
    );
  }

  const favored = isFavorite(character.id);

  function handleToggleFavorite() {
    if (favored) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  }

  return (
    <div className="container page-block detail-page">
      <Link to="/" className="back-link">← Kembali ke daftar</Link>

      <div className="detail-grid">
        <div className="detail-portal">
          <img src={character.image} alt={character.name} />
        </div>

        <div className="detail-info">
          <span className="eyebrow">Detail Karakter</span>
          <h1 className="page-title">{character.name}</h1>

          <div className="detail-tags">
            <span className={`tag tag-${character.status.toLowerCase()}`}>{character.status}</span>
            <span className="tag">{character.species}</span>
            {character.type && <span className="tag">{character.type}</span>}
          </div>

          <dl className="detail-facts">
            <div><dt>Gender</dt><dd>{character.gender}</dd></div>
            <div><dt>Asal</dt><dd>{character.origin?.name || 'Tidak diketahui'}</dd></div>
            <div><dt>Lokasi terakhir</dt><dd>{character.location?.name || 'Tidak diketahui'}</dd></div>
            <div><dt>Jumlah episode tayang</dt><dd>{character.episode.length}</dd></div>
          </dl>

          {user ? (
            <button
              className={`btn ${favored ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleToggleFavorite}
            >
              {favored ? 'Hapus dari Favorit' : '+ Tambah ke Favorit'}
            </button>
          ) : (
            <p className="login-nudge">
              <Link to="/login">Masuk</Link> untuk menyimpan karakter ini ke daftar favorit.
            </p>
          )}
        </div>
      </div>

      {episodes.length > 0 && (
        <div className="episode-block">
          <h2 className="section-title">Muncul di Episode</h2>
          <ul className="episode-list">
            {episodes.map((ep) => (
              <li key={ep.id}>
                <span className="ep-code">{ep.episode}</span> — {ep.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

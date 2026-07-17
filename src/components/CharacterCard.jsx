import { Link } from 'react-router-dom';
import './CharacterCard.css';

const STATUS_COLOR = {
  Alive: 'var(--portal-green)',
  Dead: 'var(--danger)',
  unknown: 'var(--text-dim)',
};

// Komponen reusable: menerima data karakter dan sebuah slot `actions` (props)
// sehingga bisa dipakai ulang di halaman List, Kategori, maupun Favorit.
export default function CharacterCard({ character, actions }) {
  const dotColor = STATUS_COLOR[character.status] || STATUS_COLOR.unknown;

  return (
    <div className="char-card">
      <Link to={`/karakter/${character.id}`} className="char-card-link">
        <div className="char-portal">
          <img src={character.image} alt={character.name} loading="lazy" />
        </div>
        <h3 className="char-name">{character.name}</h3>
        <p className="char-meta">
          <span className="status-dot" style={{ background: dotColor }} />
          {character.status} · {character.species}
        </p>
      </Link>
      {actions && <div className="char-actions">{actions}</div>}
    </div>
  );
}

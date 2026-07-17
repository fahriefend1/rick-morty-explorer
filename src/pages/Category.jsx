import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/rickAndMorty';
import CharacterCard from '../components/CharacterCard';
import PortalLoader from '../components/PortalLoader';
import './Home.css';

const STATUS_OPTIONS = ['', 'Alive', 'Dead', 'unknown'];
const SPECIES_OPTIONS = ['', 'Human', 'Alien', 'Robot', 'Humanoid', 'Mythological Creature'];

export default function Category() {
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], info: null });
  const [status, setStatus] = useState('loading');

  // Lifecycle: reset ke halaman 1 setiap kali filter kategori berubah
  useEffect(() => {
    setPage(1);
  }, [statusFilter, speciesFilter]);

  // Lifecycle: panggil API setiap kali filter atau halaman berubah
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetchCharacters({ page, status: statusFilter, species: speciesFilter })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setStatus(res.results.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });

    return () => { cancelled = true; };
  }, [page, statusFilter, speciesFilter]);

  return (
    <div className="container page-block">
      <span className="eyebrow">Kategori</span>
      <h1 className="page-title">Saring Berdasarkan Topik</h1>
      <p className="page-sub">
        Persempit pencarian berdasarkan status kehidupan atau spesies warga multiverse.
      </p>

      <div className="filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter status">
          {STATUS_OPTIONS.map((s) => (
            <option key={s || 'all'} value={s}>{s ? s : 'Semua status'}</option>
          ))}
        </select>

        <select value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)} aria-label="Filter spesies">
          {SPECIES_OPTIONS.map((s) => (
            <option key={s || 'all'} value={s}>{s ? s : 'Semua spesies'}</option>
          ))}
        </select>
      </div>

      {status === 'loading' && <PortalLoader label="Menyaring dimensi…" />}

      {status === 'error' && (
        <div className="state-box"><p>Portal gagal terhubung. Coba lagi sesaat lagi.</p></div>
      )}

      {status === 'empty' && (
        <div className="state-box"><p>Tidak ada warga yang cocok dengan kombinasi filter ini.</p></div>
      )}

      {status === 'success' && (
        <>
          <div className="card-grid">
            {data.results.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
          <div className="pagination">
            <button className="btn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={!data.info?.prev}>
              ← Sebelumnya
            </button>
            <span className="page-indicator">Halaman {page} dari {data.info?.pages ?? 1}</span>
            <button className="btn" onClick={() => setPage((p) => p + 1)} disabled={!data.info?.next}>
              Berikutnya →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

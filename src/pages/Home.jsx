import { useEffect, useState } from 'react';
import { fetchCharacters } from '../api/rickAndMorty';
import CharacterCard from '../components/CharacterCard';
import PortalLoader from '../components/PortalLoader';
import './Home.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ results: [], info: null });
  const [status, setStatus] = useState('loading'); // loading | success | error | empty

  // Lifecycle: debounce input pencarian supaya tidak memanggil API di setiap ketikan
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      setPage(1);
    }, 450);
    return () => clearTimeout(t);
  }, [query]);

  // Lifecycle: panggil API setiap kali halaman atau kata kunci pencarian berubah
  useEffect(() => {
    let cancelled = false;
    setStatus('loading');

    fetchCharacters({ page, name: debouncedQuery })
      .then((res) => {
        if (cancelled) return;
        setData(res);
        setStatus(res.results.length === 0 ? 'empty' : 'success');
      })
      .catch(() => {
        if (cancelled) return;
        setData({ results: [], info: null });
        setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, [page, debouncedQuery]);

  return (
    <div className="container page-block">
      <span className="eyebrow">Home · Daftar Data</span>
      <h1 className="page-title">Jelajahi Warga Multiverse</h1>
      <p className="page-sub">
        Menampilkan seluruh karakter dari Rick and Morty API. Cari nama tertentu atau jelajahi
        halaman demi halaman lintas dimensi.
      </p>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Cari karakter, misalnya: Rick, Morty, Summer…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Cari karakter"
        />
      </div>

      {status === 'loading' && <PortalLoader label="Menghubungi dimensi C-137…" />}

      {status === 'error' && (
        <div className="state-box">
          <p>Portal gagal terhubung. Periksa koneksi lalu coba lagi.</p>
        </div>
      )}

      {status === 'empty' && (
        <div className="state-box">
          <p>Tidak ada warga dimensi dengan nama itu. Coba kata kunci lain.</p>
        </div>
      )}

      {status === 'success' && (
        <>
          <div className="card-grid">
            {data.results.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>

          <div className="pagination">
            <button
              className="btn"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={!data.info?.prev}
            >
              ← Sebelumnya
            </button>
            <span className="page-indicator">Halaman {page} dari {data.info?.pages ?? 1}</span>
            <button
              className="btn"
              onClick={() => setPage((p) => p + 1)}
              disabled={!data.info?.next}
            >
              Berikutnya →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container page-block" style={{ textAlign: 'center' }}>
      <span className="eyebrow">Error 404</span>
      <h1 className="page-title">Dimensi Tidak Ditemukan</h1>
      <p className="page-sub" style={{ margin: '0 auto 28px' }}>
        Sepertinya portal ini menuju realitas yang tidak eksis.
      </p>
      <Link to="/" className="btn btn-primary">← Kembali ke Home</Link>
    </div>
  );
}

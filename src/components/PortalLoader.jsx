import './PortalLoader.css';

export default function PortalLoader({ label = 'Membuka portal…' }) {
  return (
    <div className="portal-loader" role="status" aria-live="polite">
      <div className="portal-ring" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

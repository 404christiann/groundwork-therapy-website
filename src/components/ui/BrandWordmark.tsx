export default function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`} aria-hidden="true">
      <span className="brand-wordmark-name">Tiffany Venegas</span>
      <span className="brand-wordmark-descriptor">
        <span className="brand-wordmark-descriptor-text">LCSW</span>
      </span>
    </span>
  );
}

export default function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-wordmark ${className}`} aria-hidden="true">
      <span className="brand-wordmark-name">Ground Work</span>
      <span className="brand-wordmark-descriptor">Therapy</span>
    </span>
  );
}

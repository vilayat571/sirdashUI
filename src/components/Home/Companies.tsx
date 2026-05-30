import logoPush from '../../assets/push30.webp'
import logoYazaki from '../../assets/yazaki_logo.jpeg'
import logoBozbec from '../../assets/bozbecLogo.webp'
import logoArter from '../../assets/arter-logo.webp'

const PARTNERS = [
  { name: "Push 30",       src: logoPush },
  { name: "Bozbec",       src: logoBozbec },
  { name: "Arter",         src: logoArter },
  { name: "Yazaki",      src: logoYazaki },
];

const Companies = () => {
  return (
    <section style={{ background: '#fff', padding: '80px 24px', borderTop: '1px solid #f3f4f6' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <p style={{
          textAlign: 'center',
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
          color: '#000000',
          marginBottom: 48,
        }}>
          Trusted by Teams
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}>
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                padding: '28px 20px',
                borderRadius: 16,
                border: '1px solid #f3f4f6',
                background: '#fafafa',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(99,102,241,0.25)';
                el.style.boxShadow = '0 8px 24px rgba(99,102,241,0.08)';
                el.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = '#f3f4f6';
                el.style.boxShadow = 'none';
                el.style.transform = 'translateY(0)';
              }}
            >
              {/* Logo area — 64x64 */}
              <div style={{
                width: 150, height: 150,
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 10 }}
                  />
                ) : (
                  <span style={{
                    fontSize: 11, fontWeight: 800,
                    color: '#9ca3af', letterSpacing: '0.04em',
                  }}>
                    LOGO
                  </span>
                )}
              </div>

              {/* Company name */}
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#374151',
                letterSpacing: '-0.01em',
                textAlign: 'center',
              }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Companies;
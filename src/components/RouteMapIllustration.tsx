export default function RouteMapIllustration() {
  return (
    <svg
      viewBox="0 0 480 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="route-bg" x1="0" y1="0" x2="480" y2="340">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#ecfdf5" />
        </linearGradient>
        <linearGradient id="route-line" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="480" height="340" fill="url(#route-bg)" />

      {/* City grid */}
      {[0, 1, 2, 3, 4, 5].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={24 + col * 62}
            y={24 + row * 52}
            width="46"
            height="36"
            rx="8"
            fill="#ffffff"
            opacity={0.55 + ((row + col) % 3) * 0.12}
          />
        )),
      )}

      {/* Inefficient route (faded) */}
      <path
        d="M72 248 C 120 210, 170 280, 220 220 S 320 120, 390 90"
        stroke="#cbd5e1"
        strokeWidth="3"
        strokeDasharray="8 10"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Optimized route */}
      <path
        d="M72 248 C 130 190, 180 170, 240 190 S 340 150, 390 90"
        stroke="url(#route-line)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#route-glow)"
      />

      {/* Stops — bairros de São Paulo */}
      {[
        { cx: 72, cy: 248, label: 'CD' },
        { cx: 180, cy: 176, label: 'Consolação' },
        { cx: 280, cy: 182, label: 'Paulista' },
        { cx: 390, cy: 90, label: 'Jardins' },
      ].map((stop) => (
        <g key={stop.label}>
          <circle cx={stop.cx} cy={stop.cy} r="18" fill="#ffffff" stroke="#2563eb" strokeWidth="3" />
          <text
            x={stop.cx}
            y={stop.cy + (stop.label.length > 3 ? 4 : 5)}
            textAnchor="middle"
            fill="#1d4ed8"
            fontSize={stop.label.length > 3 ? '8' : '11'}
            fontWeight="700"
            fontFamily="system-ui, sans-serif"
          >
            {stop.label}
          </text>
        </g>
      ))}

      {/* Depot */}
      <rect x="48" y="228" width="48" height="40" rx="10" fill="#2563eb" opacity="0.12" />
      <path
        d="M62 252 L74 252 L74 258 L86 258 L86 246 L80 246 L80 240 L68 240 L68 246 L62 246 Z"
        fill="#2563eb"
      />

      {/* Stats badge */}
      <g transform="translate(300, 248)">
        <rect width="132" height="56" rx="14" fill="#ffffff" opacity="0.95" />
        <rect x="1" y="1" width="130" height="54" rx="13" stroke="#dbeafe" strokeWidth="1" fill="none" />
        <text x="16" y="24" fill="#64748b" fontSize="10" fontWeight="600" fontFamily="system-ui, sans-serif">
          São Paulo, SP
        </text>
        <text x="16" y="44" fill="#059669" fontSize="16" fontWeight="800" fontFamily="system-ui, sans-serif">
          -30% km
        </text>
      </g>
    </svg>
  );
}

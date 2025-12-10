export function ReferLabsLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="frame-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00b7d4" />
          <stop offset="70%" stopColor="#0088a6" />
          <stop offset="100%" stopColor="#003647" />
        </linearGradient>
        <linearGradient id="block-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0cb3d1" />
          <stop offset="100%" stopColor="#008f9d" />
        </linearGradient>
      </defs>

      <rect
        x="9"
        y="9"
        width="342"
        height="242"
        rx="18"
        stroke="url(#frame-gradient)"
        strokeWidth="18"
        fill="white"
      />

      <text
        x="180"
        y="110"
        textAnchor="middle"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontWeight="700"
        fontSize="64"
        letterSpacing="2"
        fill="#003d4b"
      >
        REFER
      </text>

      <rect
        x="60"
        y="128"
        width="240"
        height="72"
        rx="10"
        fill="url(#block-gradient)"
      />

      <text
        x="180"
        y="179"
        textAnchor="middle"
        fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
        fontWeight="800"
        fontSize="52"
        letterSpacing="3"
        fill="white"
      >
        LABS
      </text>
    </svg>
  );
}

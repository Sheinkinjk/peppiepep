export function PepformLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon - Stylized P with growth arrow */}
      <g>
        {/* Background circle with gradient */}
        <circle cx="20" cy="20" r="18" fill="url(#logo-gradient)" />

        {/* Stylized P with arrow integration */}
        <path
          d="M13 12h7c3.3 0 6 2.7 6 6s-2.7 6-6 6h-4v6h-3V12z M16 15v6h4c1.7 0 3-1.3 3-3s-1.3-3-3-3h-4z"
          fill="white"
          fillOpacity="0.95"
        />

        {/* Growth arrow overlay */}
        <path
          d="M24 8l4 4-4 4M28 12h-8"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </g>

      {/* Text: Pepform */}
      <g transform="translate(44, 26)">
        <text
          x="0"
          y="0"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="800"
          fill="currentColor"
          letterSpacing="-0.5"
        >
          Pepform
        </text>
      </g>

      {/* Gradient definition */}
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333ea" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

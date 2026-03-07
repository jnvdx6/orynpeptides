export function PenIllustration({
 type = "peptide-pen",
 className = "",
}: {
 type?: "peptide-pen" | "medit-pen" | "novadose";
 className?: string;
}) {
 if (type === "medit-pen") {
 return (
 <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
 {/* MediT Pen - White prefilled pen */}
 <defs>
 <linearGradient id="medit-body" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#F5F5F5" />
 <stop offset="50%" stopColor="#FFFFFF" />
 <stop offset="100%" stopColor="#E8E8E8" />
 </linearGradient>
 <linearGradient id="medit-cap" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#D0D0D0" />
 <stop offset="100%" stopColor="#A0A0A0" />
 </linearGradient>
 </defs>
 {/* Body */}
 <rect x="60" y="80" width="180" height="28" rx="14" fill="url(#medit-body)" stroke="#D9D9D9" strokeWidth="1" />
 {/* Cap */}
 <rect x="40" y="84" width="30" height="20" rx="4" fill="url(#medit-cap)" />
 {/* Button */}
 <circle cx="255" cy="94" r="10" fill="#E0E0E0" stroke="#C0C0C0" strokeWidth="1" />
 {/* Label area */}
 <rect x="100" y="86" width="80" height="16" rx="2" fill="#FAFAFA" stroke="#E0E0E0" strokeWidth="0.5" />
 <text x="115" y="97" fill="#121212" fontSize="7" fontFamily="var(--font-grotesk)" fontWeight="600">ORYN</text>
 {/* Orange accent line */}
 <rect x="100" y="104" width="80" height="1.5" rx="0.75" fill="#FF6A1A" />
 {/* Dose window */}
 <rect x="200" y="86" width="24" height="16" rx="3" fill="#F0F0F0" stroke="#D0D0D0" strokeWidth="0.5" />
 <text x="205" y="97" fill="#121212" fontSize="6" fontFamily="var(--font-mono)">40mg</text>
 </svg>
 );
 }

 if (type === "novadose") {
 return (
 <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
 {/* NovaDose - Sleek pen with cartridges */}
 <defs>
 <linearGradient id="nova-body" x1="0" y1="0" x2="1" y2="0">
 <stop offset="0%" stopColor="#1A1A1A" />
 <stop offset="40%" stopColor="#2A2A2A" />
 <stop offset="60%" stopColor="#333333" />
 <stop offset="100%" stopColor="#1A1A1A" />
 </linearGradient>
 <linearGradient id="nova-accent" x1="0" y1="0" x2="1" y2="0">
 <stop offset="0%" stopColor="#FF6A1A" />
 <stop offset="100%" stopColor="#FF8A4C" />
 </linearGradient>
 </defs>
 {/* Pen body */}
 <rect x="50" y="78" width="200" height="24" rx="12" fill="url(#nova-body)" />
 {/* Orange accent ring */}
 <rect x="140" y="78" width="3" height="24" fill="url(#nova-accent)" />
 {/* Cap */}
 <rect x="240" y="82" width="25" height="16" rx="8" fill="#2A2A2A" stroke="#404040" strokeWidth="0.5" />
 {/* Needle end */}
 <rect x="35" y="87" width="20" height="6" rx="3" fill="#C0C0C0" />
 <rect x="25" y="89" width="15" height="2" rx="1" fill="#D0D0D0" />
 {/* Display */}
 <rect x="165" y="84" width="30" height="12" rx="3" fill="#0A0A0A" stroke="#FF6A1A" strokeWidth="0.5" />
 <text x="172" y="93" fill="#FF6A1A" fontSize="6" fontFamily="var(--font-mono)">02</text>
 {/* ORYN label */}
 <text x="100" y="94" fill="#FAFAFA" fontSize="7" fontFamily="var(--font-grotesk)" fontWeight="600" letterSpacing="2">ORYN</text>
 {/* Cartridges below */}
 <rect x="90" y="120" width="35" height="12" rx="6" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
 <rect x="130" y="120" width="35" height="12" rx="6" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
 <rect x="170" y="120" width="35" height="12" rx="6" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
 {/* Cartridge liquid */}
 <rect x="93" y="123" width="20" height="6" rx="3" fill="#FF6A1A" opacity="0.6" />
 <rect x="133" y="123" width="20" height="6" rx="3" fill="#FF6A1A" opacity="0.6" />
 <rect x="173" y="123" width="20" height="6" rx="3" fill="#FF6A1A" opacity="0.6" />
 </svg>
 );
 }

 // Default: Peptide Pen - Black multi-dose
 return (
 <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
 <defs>
 <linearGradient id="pen-body" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="#2A2A2A" />
 <stop offset="30%" stopColor="#333333" />
 <stop offset="70%" stopColor="#1A1A1A" />
 <stop offset="100%" stopColor="#121212" />
 </linearGradient>
 <linearGradient id="pen-shine" x1="0" y1="0" x2="0" y2="1">
 <stop offset="0%" stopColor="white" stopOpacity="0.15" />
 <stop offset="100%" stopColor="white" stopOpacity="0" />
 </linearGradient>
 </defs>
 {/* Main pen body */}
 <rect x="45" y="78" width="210" height="28" rx="14" fill="url(#pen-body)" />
 {/* Shine */}
 <rect x="45" y="78" width="210" height="14" rx="7" fill="url(#pen-shine)" />
 {/* Cap */}
 <rect x="245" y="82" width="20" height="20" rx="10" fill="#1A1A1A" stroke="#333" strokeWidth="0.5" />
 {/* Needle end */}
 <rect x="30" y="88" width="20" height="8" rx="4" fill="#404040" />
 <rect x="20" y="90" width="15" height="4" rx="2" fill="#555" />
 {/* ORYN logo area */}
 <circle cx="85" cy="92" r="10" stroke="#555" strokeWidth="0.5" fill="none" />
 <text x="80" y="95" fill="#888" fontSize="5" fontFamily="var(--font-grotesk)" fontWeight="600">O</text>
 {/* Label */}
 <rect x="110" y="84" width="70" height="16" rx="2" fill="#222" stroke="#444" strokeWidth="0.3" />
 <text x="118" y="94" fill="#FAFAFA" fontSize="7" fontFamily="var(--font-grotesk)" fontWeight="700" letterSpacing="1">ORYN</text>
 {/* Orange accent */}
 <rect x="110" y="102" width="70" height="1.5" rx="0.75" fill="#FF6A1A" />
 {/* Dose display */}
 <rect x="200" y="84" width="28" height="16" rx="3" fill="#0A0A0A" stroke="#FF6A1A" strokeWidth="0.5" />
 <text x="206" y="95" fill="#FF6A1A" fontSize="7" fontFamily="var(--font-mono)" fontWeight="500">0.1</text>
 </svg>
 );
}

export function MolecularRing({ className = "" }: { className?: string }) {
 return (
 <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
 <circle cx="100" cy="100" r="80" stroke="#FF6A1A" strokeWidth="1" opacity="0.2" />
 <circle cx="100" cy="100" r="60" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.15" />
 <circle cx="100" cy="100" r="40" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.1" />
 {/* Molecular nodes */}
 <circle cx="100" cy="20" r="4" fill="#FF6A1A" opacity="0.6" />
 <circle cx="180" cy="100" r="4" fill="#FF6A1A" opacity="0.4" />
 <circle cx="100" cy="180" r="4" fill="#FF6A1A" opacity="0.6" />
 <circle cx="20" cy="100" r="4" fill="#FF6A1A" opacity="0.4" />
 {/* Cross connections */}
 <line x1="100" y1="24" x2="176" y2="100" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.1" />
 <line x1="176" y1="100" x2="100" y2="176" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.1" />
 <line x1="100" y1="176" x2="24" y2="100" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.1" />
 <line x1="24" y1="100" x2="100" y2="24" stroke="#FF6A1A" strokeWidth="0.5" opacity="0.1" />
 {/* Inner hexagon */}
 <polygon
 points="100,55 139,77.5 139,122.5 100,145 61,122.5 61,77.5"
 stroke="#FF6A1A"
 strokeWidth="0.5"
 fill="none"
 opacity="0.15"
 />
 </svg>
 );
}

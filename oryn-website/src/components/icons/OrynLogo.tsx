export function OrynLogo({
 className = "",
 color = "currentColor",
 size = 120,
}: {
 className?: string;
 color?: string;
 size?: number;
}) {
 return (
 <svg
 width={size}
 height={size * 0.35}
 viewBox="0 0 240 84"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 >
 {/* O - Molecular Ring */}
 <circle cx="28" cy="42" r="24" stroke={color} strokeWidth="4" fill="none" />
 <circle cx="28" cy="18" r="3" fill="#FF6A1A" />
 <circle cx="28" cy="66" r="3" fill="#FF6A1A" />
 <circle cx="4" cy="42" r="2" fill={color} opacity="0.4" />
 <circle cx="52" cy="42" r="2" fill={color} opacity="0.4" />

 {/* R */}
 <path
 d="M72 18v48M72 18h20c8.837 0 16 7.163 16 16s-7.163 16-16 16H72M92 50l18 16"
 stroke={color}
 strokeWidth="4"
 strokeLinecap="round"
 strokeLinejoin="round"
 fill="none"
 />

 {/* Y */}
 <path
 d="M124 18l16 24v24M156 18l-16 24"
 stroke={color}
 strokeWidth="4"
 strokeLinecap="round"
 strokeLinejoin="round"
 fill="none"
 />

 {/* N */}
 <path
 d="M172 66V18l36 48V18"
 stroke={color}
 strokeWidth="4"
 strokeLinecap="round"
 strokeLinejoin="round"
 fill="none"
 />

 {/* Accent dots */}
 <circle cx="232" cy="66" r="3" fill="#FF6A1A" />
 </svg>
 );
}

export function OrynIcon({
 className = "",
 size = 40,
}: {
 className?: string;
 size?: number;
}) {
 return (
 <svg
 width={size}
 height={size}
 viewBox="0 0 64 64"
 fill="none"
 xmlns="http://www.w3.org/2000/svg"
 className={className}
 >
 {/* Outer square */}
 <rect x="2" y="2" width="60" height="60" rx="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
 {/* Inner molecular ring */}
 <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2.5" fill="none" />
 {/* Accent nodes */}
 <circle cx="32" cy="16" r="3" fill="#FF6A1A" />
 <circle cx="32" cy="48" r="3" fill="#FF6A1A" />
 <circle cx="16" cy="32" r="2" fill="currentColor" opacity="0.3" />
 <circle cx="48" cy="32" r="2" fill="currentColor" opacity="0.3" />
 </svg>
 );
}

export function OrynWordmark({
 className = "",
 dark = false,
}: {
 className?: string;
 dark?: boolean;
}) {
 const color = dark ? "#FAFAFA" : "#121212";
 return (
 <div className={`flex items-center gap-3 ${className}`}>
 <OrynIcon size={36} />
 <span
 className="text-xl font-bold tracking-brand"
 style={{ color, fontFamily: "var(--font-grotesk)" }}
 >
 ORYN
 </span>
 </div>
 );
}

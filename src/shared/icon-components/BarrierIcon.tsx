import { IconsProps } from "./types";

export const BarrierIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M165 378L357 378" stroke="white" strokeWidth="32" />
                <circle cx="355" cy="51" r="35" fill="white" />
                <circle cx="162" cy="51" r="35" fill="white" />
                <line x1="356" y1="78" x2="356" y2="123" stroke="white" strokeWidth="32" />
                <line x1="163" y1="78" x2="163" y2="123" stroke="white" strokeWidth="32" />
                <path d="M307 480H407" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M112 483H212" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <line x1="356" y1="286" x2="356" y2="469" stroke="white" strokeWidth="32" />
                <line x1="163" y1="286" x2="163" y2="469" stroke="white" strokeWidth="32" />
                <line x1="295.686" y1="271.965" x2="422.966" y2="144.686" stroke="white" strokeWidth="32" />
                <path d="M192 268.279L319.913 141.634" stroke="white" strokeWidth="32" />
                <line x1="86.6863" y1="271.965" x2="213.966" y2="144.686" stroke="white" strokeWidth="32" />
                <mask id="path-13-inside-1_4_5" fill="white">
                    <rect x="56" y="123" width="400" height="163" rx="30" />
                </mask>
                <rect fill="transparent" x="56" y="123" width="400" height="163" rx="30" stroke="white" strokeWidth="64" mask="url(#path-13-inside-1_4_5)" />
            </svg>
        </div>
    )
}
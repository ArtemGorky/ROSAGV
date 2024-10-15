import { IconsProps } from "./types"

export const ConnectIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <circle cx="256" cy="460" r="35" fill="white" />
                <path d="M479.048 118.343C417.521 63.4557 337.951 33.1221 255.5 33.1221C173.049 33.1221 93.4787 63.4557 31.9514 118.343" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M416.561 251.263C373.089 210.613 315.796 188 256.28 188C196.765 188 139.472 210.613 96 251.263" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M345.167 354.868C320.622 333.051 288.924 321 256.084 321C223.244 321 191.545 333.051 167 354.868" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}
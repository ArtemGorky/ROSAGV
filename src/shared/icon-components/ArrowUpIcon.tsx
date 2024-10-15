import { IconsProps } from "./types"

export const ArrowUpIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M256 481L256 32" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M127 256.693L256.149 33" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M256 33L385.149 256.693" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M206 481H306" stroke="white" strokeWidth="32" strokeLinecap="round" />
            </svg>
        </div>
    )
}
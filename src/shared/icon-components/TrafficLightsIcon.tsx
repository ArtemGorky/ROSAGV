import { IconsProps } from "./types"

export const TrafficLightsIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M385 69H426.823C455.087 69 467.67 104.515 445.709 122.309L385 171.5" stroke="white" strokeWidth="32" />
                <path d="M385 206H426.823C455.087 206 467.67 241.515 445.709 259.309L385 308.5" stroke="white" strokeWidth="32" />
                <path d="M385 343H426.823C455.087 343 467.67 378.515 445.709 396.309L385 445.5" stroke="white" strokeWidth="32" />
                <path d="M126.5 343H84.6774C56.4126 343 43.8303 378.515 65.7908 396.309L126.5 445.5" stroke="white" strokeWidth="32" />
                <path d="M126.5 206H84.6774C56.4126 206 43.8303 241.515 65.7908 259.309L126.5 308.5" stroke="white" strokeWidth="32" />
                <path d="M126.5 69H84.6774C56.4126 69 43.8303 104.515 65.7908 122.309L126.5 171.5" stroke="white" strokeWidth="32" />
                <mask id="path-7-inside-1_11_107" fill="white">
                    <rect x="116" y="16" width="280" height="480" rx="30" />
                </mask>
                <rect x="116" y="16" width="280" height="480" rx="30" stroke="white" strokeWidth="64" mask="url(#path-7-inside-1_11_107)" />
                <circle cx="256" cy="398" r="39" stroke="white" strokeWidth="32" />
                <circle cx="256" cy="258" r="39" stroke="white" strokeWidth="32" />
                <circle cx="256" cy="117" r="39" stroke="white" strokeWidth="32" />
            </svg>
        </div>
    )
}
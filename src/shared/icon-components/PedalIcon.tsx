import { IconsProps } from "./types"

export const PedalIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M105 444.971L127.5 406" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M385 406L407.5 444.971" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M262 480V435" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <rect x="116" y="344" width="328" height="280" rx="30" transform="rotate(-90 116 344)" stroke="white" strokeWidth="32" mask="url(#path-9-inside-1_11_78)" />
                <circle cx="186.5" cy="83.5" r="17.5" fill="white" />
                <circle cx="261.5" cy="83.5" r="17.5" fill="white" />
                <circle cx="328.5" cy="83.5" r="17.5" fill="white" />
                <circle cx="328.5" cy="273.5" r="17.5" fill="white" />
                <circle cx="186.5" cy="273.5" r="17.5" fill="white" />
                <path d="M227 145L297.711 215.711" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M227 215.711L297.711 145" stroke="white" strokeWidth="32" strokeLinecap="round" />
            </svg>


        </div>
    )
}
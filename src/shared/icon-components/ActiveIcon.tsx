import { IconsProps } from "./types"

export const ActiveIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M95.9971 479.985H415.997" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <mask id="path-2-inside-1_11_56" fill="white">
                    <path d="M132 194C132 177.431 145.431 164 162 164H349C365.569 164 379 177.431 379 194V464H132V194Z" />
                </mask>
                <path d="M132 194C132 177.431 145.431 164 162 164H349C365.569 164 379 177.431 379 194V464H132V194Z" stroke="white" strokeWidth="64" mask="url(#path-2-inside-1_11_56)" />
                <path d="M164 421L354 421" stroke="white" strokeWidth="32" />
                <path d="M164 212L354 212" stroke="white" strokeWidth="32" />
                <path d="M256 54V99" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M241 317C241 308.163 233.837 301 225 301C216.163 301 209 308.163 209 317H241ZM209 317V407H241V317H209Z" fill="white" />
                <path d="M405 118.971L427.5 80" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <path d="M73 80L95.5 118.971" stroke="white" strokeWidth="32" strokeLinecap="round" />
            </svg>
        </div>
    )
}
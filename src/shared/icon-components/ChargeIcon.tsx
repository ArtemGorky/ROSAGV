import { IconsProps } from "./types"

export const ChargeIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 480L350.994 481.969" stroke="white" strokeWidth="32" strokeLinecap="round" />
                <mask id="path-2-inside-1_11_27" fill="white">
                    <rect x="48" y="16" width="280" height="480" rx="30" />
                </mask>
                <rect x="48" y="16" width="280" height="480" rx="30" stroke="white" strokeWidth="64" mask="url(#path-2-inside-1_11_27)" />
                <mask id="path-3-inside-2_11_27" fill="white">
                    <rect x="98" y="68" width="180" height="147" rx="30" />
                </mask>
                <rect x="98" y="68" width="180" height="147" rx="30" stroke="white" strokeWidth="64" mask="url(#path-3-inside-2_11_27)" />
                <path d="M328 266H345C361.569 266 375 279.431 375 296V387.5C375 404.069 388.431 417.5 405 417.5H407C423.569 417.5 437 404.069 437 387.5V316.25V215" stroke="white" strokeWidth="16" />
                <path d="M489 61C489 52.1634 481.837 45 473 45C464.163 45 457 52.1634 457 61H489ZM457 61V131H489V61H457Z" fill="white" />
                <path d="M417 61C417 52.1634 409.837 45 401 45C392.163 45 385 52.1634 385 61H417ZM385 61V131H417V61H385Z" fill="white" />
                <mask id="path-7-inside-3_11_27" fill="white">
                    <path d="M385 131H489V185C489 201.569 475.569 215 459 215H415C398.431 215 385 201.569 385 185V131Z" />
                </mask>
                <path d="M385 131H489V185C489 201.569 475.569 215 459 215H415C398.431 215 385 201.569 385 185V131Z" fill="white" stroke="white" strokeWidth="64" mask="url(#path-7-inside-3_11_27)" />
                <path d="M210 256L190 346H130L210 256Z" fill="white" />
                <path d="M210 256L190 346H130L210 256Z" fill="white" />
                <path d="M170 418L190 328H250L170 418Z" fill="white" />
                <path d="M170 418L190 328H250L170 418Z" fill="white" />
            </svg>
        </div>
    )
}
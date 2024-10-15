import { IconsProps } from "./types"

export const DisconnectIcon = ({ title, iconClass, size }: IconsProps) => {
    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <circle cx="256.049" cy="461" r="35" fill="white" />
                <path d="M479.097 119.343C466.75 108.329 453.677 98.3034 440 89.3133M32 119.343C44.3466 108.329 57.4198 98.3034 71.097 89.3133M137.5 55.5549C161.929 46.3817 187.431 40.054 213.5 36.7642M373.597 55.5549C349.168 46.3817 323.666 40.054 297.597 36.7642" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M416.61 252.263C404.698 241.124 391.748 231.34 378 223.004M96.0486 252.263C107.96 241.124 120.91 231.34 134.658 223.004M216.5 192.404C229.574 190.152 242.895 189 256.329 189C269.763 189 283.084 190.152 296.158 192.404" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M345.216 355.868C333.754 345.681 320.733 337.623 306.764 331.927M167.049 355.868C178.51 345.681 191.531 337.623 205.5 331.927" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    )
}
import { IconsProps } from "./types";

export const HandIcon = ({ title, iconClass, size }: IconsProps) => {

    return (
        <div title={title} className={iconClass} style={{ width: size, height: size }}>
            <svg width={size} height={size} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1_5)">
                    <path d="M404.156 299.375V134.719C404.156 126.779 401.002 119.164 395.388 113.55C389.773 107.935 382.159 104.781 374.219 104.781C366.279 104.781 358.664 107.935 353.05 113.55C347.435 119.164 344.281 126.779 344.281 134.719V239.5" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M344.281 239.5V74.8438C344.281 66.9038 341.127 59.2891 335.513 53.6747C329.898 48.0604 322.284 44.9063 314.344 44.9062C306.404 44.9063 298.789 48.0604 293.175 53.6747C287.56 59.2891 284.406 66.9038 284.406 74.8438V224.531" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M224.531 225.467V89.8125C224.531 81.8726 221.377 74.2579 215.763 68.6435C210.148 63.0291 202.534 59.875 194.594 59.875C186.654 59.875 179.039 63.0291 173.425 68.6435C167.81 74.2579 164.656 81.8726 164.656 89.8125V299.375" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M284.406 224.531V44.9062C284.406 36.9663 281.252 29.3516 275.638 23.7372C270.023 18.1229 262.409 14.9688 254.469 14.9688C246.529 14.9688 238.914 18.1229 233.3 23.7372C227.685 29.3516 224.531 36.9663 224.531 44.9062V224.531" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M404.156 299.375C404.156 409.208 344.281 464.031 261.953 464.031C179.625 464.031 146.217 426.984 127.234 381.703L77.9591 246.984C71.7284 230.098 74.5537 214.437 89.064 206.195C103.584 197.943 122.66 202.19 130.518 217.122L164.656 299.375" stroke="white" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_1_5">
                        <rect width="479" height="479" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        </div>
    )
}
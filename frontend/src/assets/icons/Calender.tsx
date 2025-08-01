import { IconVariantColor, IconVariantSize, type IconProps } from "./IconInterface"

export default function Calender (props: IconProps) {

    const {size, color} = props
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            strokeWidth="0.5"
            stroke="currentColor"
            className={`${IconVariantSize[size]} ${IconVariantColor[color]}`}>
            <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"/>
        </svg>
    )
}
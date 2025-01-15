import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement; // Optional start icon
    endIcon?: ReactElement;   // Optional end icon
    onClick?: () => void;
    loading?: boolean;        // Loading state
}

export const Button = (props: ButtonProps) => {
    const { variant, size, text, startIcon, endIcon, onClick, loading } = props;

    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded focus:outline-none mx-2 transition-all duration-200";

    const variantClasses = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-600",
        secondary: "bg-white text-blue-600 hover:bg-blue-400 hover:text-white focus:ring-2 focus:ring-blue-600",
    };

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
                loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={onClick}
            disabled={loading}
        >
            {startIcon && <span className="mr-2 flex items-center">{startIcon}</span>}
            <span className="whitespace-nowrap">{text}</span>
            {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </button>
    );
};

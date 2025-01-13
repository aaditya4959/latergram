import { ReactElement } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" |"lg";
    text: string;
    startIcon?: ReactElement;  // We need to handle this type
    endIcon?: ReactElement; // THis also
    onClick?: () => void;
}

export const Button = (props: ButtonProps) => {

    const {variant, size, text, startIcon, endIcon, onClick} = props;

    const baseClasses = "flex items-center justify-center font-medium rounded focus:outline-none mx-2";


    const variantClasses = {
        primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-1 focus:ring-blue-600",
        secondary:"bg-white text-blue-600 hover:bg-blue-400 hover:text-white focus:ring-1 focus:ring-blue-600"
    }

    const sizeClasses = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-0.5 text-sm",
        lg: "px-5 py-3 text-base",
      };

    return (
        // Now we will try to code this generic button according to the different types of the interface.
        
        <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
        onClick={onClick}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            <span>{text}</span>
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    )
}




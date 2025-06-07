export interface IconProps {
    size: "sm" | "md" | "lg",
    color: "primary" | "secondary" | "tertiary" | "default" | "success" | "danger" | "white" | "youtube" | "twitter"
}


export const IconVariantSize = {
    "sm":"size-3",
    "md":"size-5",
    "lg":"size-6"
}


export const IconVariantColor = {
  default:"fill-current",
  primary: "fill-blue-500",
  secondary: "fill-gray-500",
  tertiary: "fill-yellow-500",
  twitter: "fill-black",
  youtube: "fill-red-600",
  success: "fill-green-500",
  danger: "fill-red-500",
  white: "fill-white",
};

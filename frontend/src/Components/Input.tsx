import React, { forwardRef } from "react";

const Input = forwardRef<HTMLInputElement, { onChange?: (e: any) => void; placeHolder: string }>(
    ({ onChange, placeHolder }, ref) => {
        return (
            <input
                ref={ref}
                type="text"
                onChange={onChange}
                placeholder={placeHolder}
                className="rounded p-2 w-[300px] border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 mt-2"
            />
        );
    }
);

export default Input;

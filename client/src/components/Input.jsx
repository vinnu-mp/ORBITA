import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", error, ...props }, ref) => {
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-medium text-cyan-100 tracking-wide">
            {label}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={`
            w-full
            px-4 py-3
            rounded-2xl
            bg-white/5
            border border-cyan-400/20
            text-white
            placeholder:text-gray-400
            backdrop-blur-md
            outline-none
            transition-all duration-300
            focus:border-cyan-400
            focus:shadow-[0_0_20px_rgba(34,211,238,0.25)]
            hover:border-cyan-300/40
            ${className}
          `}
          {...props}
        />

        {error && <p className="text-sm text-red-400 tracking-wide">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

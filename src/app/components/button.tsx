import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  color?: "purple" | "darkPurple";
  children: ReactNode;
}

const colorClasses = {
  filled: {
    darkPurple: "bg-purple-900 text-white hover:bg-purple-800",
    purple: "bg-purple-600 text-white hover:bg-purple-500",
  },
  outlined: {
    purple: "border border-purple-600 text-purple-600 hover:bg-purple-100",
    darkPurple: "border border-purple-900 text-purple-900 hover:bg-purple-200",
  },
};

const Button = ({
  variant = "filled",
  color = "purple",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "rounded-lg px-6 py-3 font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClass = colorClasses[variant][color];

  return (
    <button
      className={`${baseClasses} ${variantClass}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

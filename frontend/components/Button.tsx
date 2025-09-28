import React from "react";

interface ButtonProps {
	children: React.ReactNode;
	variant?: "primary" | "secondary" | "icon";
	size?: "small" | "default" | "icon";
	className?: string;
	onClick?: () => void;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = "primary",
	size = "default",
	className = "",
	onClick,
	disabled = false,
	type = "button",
}) => {
	const baseClasses =
		"font-sans font-bold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	const variantClasses = {
		primary:
			"bg-primary text-white hover:bg-primary/90 focus:ring-primary border-primary",
		secondary:
			"bg-secondary text-dark hover:bg-secondary/90 focus:ring-secondary border-secondary",
		icon: "bg-transparent text-dark hover:bg-gray-100 focus:ring-gray-200 border-transparent",
	};

	const sizeClasses = {
		small: "h-8 px-3 py-1 text-sm rounded-lg",
		default: "h-12 px-6 py-3 text-base rounded-lg",
		icon: "h-8 w-8 p-2 rounded-lg flex items-center justify-center",
	};

	// Special sizing for buttons to meet 48px min touch target on mobile
	const touchTargetClasses =
		size === "icon"
			? "min-h-[48px] min-w-[48px] md:h-8 md:w-8"
			: "min-h-[48px]";
	return (
		<button
			type={type}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${touchTargetClasses} ${className}`}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;

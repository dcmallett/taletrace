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
		"btn font-sans disabled:opacity-50 disabled:cursor-not-allowed";

	const variantClasses = {
		primary: "btn-primary",
		secondary:
			"bg-secondary text-dark hover:bg-secondary/90 focus:ring-2 focus:ring-secondary",
		icon: "bg-transparent text-dark hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 border-transparent min-h-[48px]",
	};

	const sizeClasses = {
		small: "h-8 px-3 py-1 text-sm",
		default: "h-12 px-6 py-3 text-base",
		icon: "h-8 w-8 p-2 flex items-center justify-center",
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

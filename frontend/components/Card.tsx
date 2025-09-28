import React from "react";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
	const baseClasses =
		"bg-light shadow-md transition-all duration-200 ease-in-out border border-neutral";
	const interactiveClasses = onClick
		? "shadow-lg cursor-pointer hover:shadow-lg"
		: "";
	const radiusClasses = "rounded-[var(--radius-md)]";

	return (
		<div
			className={`${baseClasses} ${radiusClasses} ${interactiveClasses} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Card;

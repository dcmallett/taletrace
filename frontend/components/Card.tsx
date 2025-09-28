import React from "react";

interface CardProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
	const baseClasses =
		"rounded-xl shadow-md bg-white transition-all duration 200 ease-in-out";
	const interactiveClasses = onClick ? "hover:shadow-lg cursor-pointer" : "";
	return (
		<div
			className={`${baseClasses} ${interactiveClasses} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default Card;

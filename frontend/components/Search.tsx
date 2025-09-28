"use client";

import React, { useState } from "react";
import { MdSearch, MdClear } from "react-icons/md";

interface SearchProps {
	placeholder?: string;
	onSearch?: (query: string) => void;
	className?: string;
	value?: string;
	onChange?: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
	placeholder = "Search locations, tours, or stories...",
	onSearch,
	className = "",
	value,
	onChange,
}) => {
	const [internalValue, setInternalValue] = useState("");
	const currentValue = value !== undefined ? value : internalValue;
	const handleValueChange = onChange || setInternalValue;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(currentValue);
		}
	};

	const handleClear = () => {
		handleValueChange("");
		if (onSearch) {
			onSearch("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className={`relative ${className}`}>
			<div className="relative">
				<MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
				<input
					type="text"
					value={currentValue}
					onChange={(e) => handleValueChange(e.target.value)}
					placeholder={placeholder}
					className="font-sans w-full pl-10 pr-10 py-3 border border-neutral bg-light text-dark rounded-[var(--radius-sm)] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
				/>
				{currentValue && (
					<button
						type="button"
						onClick={handleClear}
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<MdClear className="text-xl" />
					</button>
				)}
			</div>
		</form>
	);
};

export default Search;

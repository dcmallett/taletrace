"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 bg-light shadow-md border-b border-neutral">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16 md:h-20">
					{/* Logo */}
					<Link href="/" className="flex items-center">
						<h1 className="font-display text-xl md:text-2xl text-primary font-bold">
							TaleTrace
						</h1>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="/explore"
							className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
						>
							Explore
						</Link>
						<Link
							href="/location/tours"
							className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
						>
							Tours
						</Link>
						<Link
							href="/assistant"
							className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
						>
							Assistant
						</Link>
						<Link
							href="/account"
							className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
						>
							Account
						</Link>
						<Link href="/login" className="btn btn-primary ml-4">
							Login
						</Link>
					</nav>

					{/* Mobile menu button */}
					<button
						className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
						onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
					>
						<span className="sr-only">Open main menu</span>
						{isMobileMenuOpen ? (
							<IoCloseSharp className="h-6 w-6" />
						) : (
							<GiHamburgerMenu className="h-6 w-6" />
						)}
					</button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-light border-t border-neutral shadow-lg">
						<Link
							href="/explore"
							className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Explore
						</Link>
						<Link
							href="/location/tours"
							className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Tours
						</Link>
						<Link
							href="/assistant"
							className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Assistant
						</Link>
						<Link
							href="/account"
							className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
							onClick={() => setMobileMenuOpen(false)}
						>
							Account
						</Link>
						<Link
							href="/login"
							className="btn btn-primary w-full mt-4 sm:mx-3"
							onClick={() => setMobileMenuOpen(false)}
						>
							Login
						</Link>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;

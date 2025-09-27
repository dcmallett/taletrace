"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 bg-light shadow-md border-b border-neutral">
			<div className="container mx-auto flex items-center justify-between h-header-mobile md:h-header-desktop px-4 md:px-8 lg:px-16">
				<Link href="/" className="flex items-center">
					<h1 className="font-display text-xl md:text-2xl text-primary font-bold">
						TaleTrace
					</h1>
				</Link>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-12">
					<Link
						href="/"
						className="font-sans text-sm font-medium text-dark hover:text-primary transition-colors duration-200"
					>
						Explore
					</Link>
					<Link
						href="/tours"
						className="font-sans text-sm font-medium text-dark hover:text-primary transition-colors duration-200"
					>
						Tours
					</Link>
					<Link
						href="/assistant"
						className="font-sans text-sm font-medium text-dark hover:text-primary transition-colors duration-200"
					>
						Assistant
					</Link>
					<Link
						href="/account"
						className="font-sans text-sm font-medium text-dark hover:text-primary transition-colors duration-200"
					>
						Account
					</Link>
					<Link
						href="/login"
						className="btn btn-primary text-sm px-4 py-2 min-h-10"
					>
						Login
					</Link>
				</nav>

				<button
					className="md:hidden p-2 text-dark hover:text-primary transition-colors duration-200 min-h-touch-target min-w-touch-target flex items-center justify-center border-0 bg-transparent cursor-pointer"
					onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? (
						<IoCloseSharp size={24} />
					) : (
						<GiHamburgerMenu size={24} />
					)}
				</button>
			</div>

			{/* Mobile Menu */}
			{isMobileMenuOpen && (
				<div className="md:hidden bg-light border-t border-neutral shadow-lg">
					<nav className="container mx-auto px-4 md:px-8 lg:px-16 py-6 flex flex-col gap-4">
						<Link
							href="/"
							className="font-sans text-base font-medium text-dark hover:text-primary transition-colors duration-200 py-2 block"
							onClick={() => setMobileMenuOpen(false)}
						>
							Explore
						</Link>
						<Link
							href="/tours"
							className="font-sans text-base font-medium text-dark hover:text-primary transition-colors duration-200 py-2 block"
							onClick={() => setMobileMenuOpen(false)}
						>
							Tours
						</Link>
						<Link
							href="/assistant"
							className="font-sans text-base font-medium text-dark hover:text-primary transition-colors duration-200 py-2 block"
							onClick={() => setMobileMenuOpen(false)}
						>
							Assistant
						</Link>
						<Link
							href="/account"
							className="font-sans text-base font-medium text-dark hover:text-primary transition-colors duration-200 py-2 block"
							onClick={() => setMobileMenuOpen(false)}
						>
							Account
						</Link>
						<Link
							href="/login"
							className="btn btn-primary text-base mt-2 text-center"
							onClick={() => setMobileMenuOpen(false)}
						>
							Login
						</Link>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;

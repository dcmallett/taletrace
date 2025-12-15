"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "./AuthModal";
import Button from "./Button";

const Header = () => {
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
	const [authMode, setAuthMode] = useState<"login" | "signup">("login");
	const { user, logout } = useAuth();

	const handleAuthClick = (mode: "login" | "signup") => {
		setAuthMode(mode);
		setIsAuthModalOpen(true);
	};

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
						{user ? (
							<div className="relative ml-4">
								<div
									className="flex items-center space-x-2 px-3 py-2 bg-neutral/30 rounded-lg cursor-pointer hover:bg-neutral/40 transition-colors"
									onMouseEnter={() => setIsUserDropdownOpen(true)}
									onMouseLeave={() => setIsUserDropdownOpen(false)}
								>
									{user.avatar ? (
										<img
											src={user.avatar}
											alt={user.name}
											className="w-6 h-6 rounded-full object-cover"
										/>
									) : (
										<FiUser size={16} className="text-primary" />
									)}
									<span className="text-sm font-medium text-dark">
										{user.name}
									</span>
									<svg
										className="w-4 h-4 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</div>

								{/* Dropdown Menu */}
								{isUserDropdownOpen && (
									<div
										className="absolute right-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
										onMouseEnter={() => setIsUserDropdownOpen(true)}
										onMouseLeave={() => setIsUserDropdownOpen(false)}
									>
										<Link
											href="/account"
											className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
											onClick={() => setIsUserDropdownOpen(false)}
										>
											<FiUser size={16} className="mr-3 text-gray-400" />
											View Account
										</Link>
										<button
											onClick={() => {
												logout();
												setIsUserDropdownOpen(false);
											}}
											className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left hover:cursor-pointer"
										>
											<FiLogOut size={16} className="mr-3 text-gray-400" />
											Sign Out
										</button>
									</div>
								)}
							</div>
						) : (
							<div className="flex items-center space-x-2 ml-4">
								<Button
									variant="secondary"
									size="small"
									onClick={() => handleAuthClick("login")}
								>
									Login
								</Button>
								<Button
									variant="primary"
									size="small"
									onClick={() => handleAuthClick("signup")}
								>
									Sign Up
								</Button>
							</div>
						)}
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
						{user ? (
							<div className="px-3 py-2">
								<div className="flex items-center space-x-2 p-3 bg-neutral/30 rounded-lg mb-3">
									{user.avatar ? (
										<img
											src={user.avatar}
											alt={user.name}
											className="w-8 h-8 rounded-full object-cover"
										/>
									) : (
										<FiUser size={20} className="text-primary" />
									)}
									<div>
										<p className="font-medium text-dark text-sm">{user.name}</p>
										<p className="text-xs text-dark/60">{user.email}</p>
									</div>
								</div>
								<div className="space-y-1">
									<Link
										href="/account"
										className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
										onClick={() => setMobileMenuOpen(false)}
									>
										<FiUser size={16} className="mr-3 text-gray-400" />
										View Account
									</Link>
									<button
										onClick={() => {
											logout();
											setMobileMenuOpen(false);
										}}
										className="w-full flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors text-left"
									>
										<FiLogOut size={16} className="mr-3 text-gray-400" />
										Sign Out
									</button>
								</div>
							</div>
						) : (
							<div className="px-3 space-y-2 mt-4">
								<Button
									variant="secondary"
									onClick={() => {
										handleAuthClick("login");
										setMobileMenuOpen(false);
									}}
									className="w-full"
								>
									Login
								</Button>
								<Button
									variant="primary"
									onClick={() => {
										handleAuthClick("signup");
										setMobileMenuOpen(false);
									}}
									className="w-full"
								>
									Sign Up
								</Button>
							</div>
						)}
					</div>
				</div>
			)}

			{/* Auth Modal */}
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
				defaultMode={authMode}
			/>
		</header>
	);
};

export default Header;

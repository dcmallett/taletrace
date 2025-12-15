"use client";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { FiX, FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";
import Button from "./Button";

interface AuthModalProps {
	isOpen: boolean;
	onClose: () => void;
	defaultMode?: "login" | "signup";
}

export default function AuthModal({
	isOpen,
	onClose,
	defaultMode = "login",
}: AuthModalProps) {
	const { login, signup, isLoading } = useAuth();
	const [mode, setMode] = useState<"login" | "signup">(defaultMode);
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [errors, setErrors] = useState<Record<string, string>>({});
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			// Reset form when modal opens
			setFormData({ email: "", password: "", name: "" });
			setErrors({});
			setMode(defaultMode);
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen, defaultMode]);

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (formData.password.length < 6) {
			newErrors.password = "Password must be at least 6 characters";
		}

		if (mode === "signup" && !formData.name) {
			newErrors.name = "Name is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) return;

		try {
			if (mode === "login") {
				await login(formData.email, formData.password);
			} else {
				await signup(formData.email, formData.password, formData.name);
			}
			onClose();
		} catch (error) {
			setErrors({ general: "Authentication failed. Please try again." });
		}
	};

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
				onClick={onClose}
			/>

			{/* Modal */}
			<div
				ref={modalRef}
				className="relative w-full max-w-md bg-light rounded-2xl shadow-2xl transform transition-all"
			>
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-neutral/20">
					<h2 className="text-2xl font-semibold text-dark">
						{mode === "login" ? "Welcome back" : "Create account"}
					</h2>
					<button
						onClick={onClose}
						className="p-2 text-dark/60 hover:text-dark hover:bg-neutral/20 rounded-lg transition-colors"
					>
						<FiX size={20} />
					</button>
				</div>

				{/* Form */}
				<form onSubmit={handleSubmit} className="p-6 space-y-4">
					{/* Name field (signup only) */}
					{mode === "signup" && (
						<div className="space-y-2">
							<label
								htmlFor="name"
								className="block text-sm font-medium text-dark"
							>
								Full Name
							</label>
							<div className="relative">
								<div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
									<FiUser size={18} />
								</div>
								<input
									id="name"
									type="text"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									className={`w-full pl-10 pr-4 py-3 bg-neutral/30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
										errors.name
											? "border-error"
											: "border-neutral hover:border-primary/50"
									}`}
									placeholder="Enter your full name"
								/>
							</div>
							{errors.name && (
								<p className="text-sm text-error">{errors.name}</p>
							)}
						</div>
					)}

					{/* Email field */}
					<div className="space-y-2">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-dark"
						>
							Email
						</label>
						<div className="relative">
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
								<FiMail size={18} />
							</div>
							<input
								id="email"
								type="email"
								value={formData.email}
								onChange={(e) => handleInputChange("email", e.target.value)}
								className={`w-full pl-10 pr-4 py-3 bg-neutral/30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
									errors.email
										? "border-error"
										: "border-neutral hover:border-primary/50"
								}`}
								placeholder="Enter your email"
							/>
						</div>
						{errors.email && (
							<p className="text-sm text-error">{errors.email}</p>
						)}
					</div>

					{/* Password field */}
					<div className="space-y-2">
						<label
							htmlFor="password"
							className="block text-sm font-medium text-dark"
						>
							Password
						</label>
						<div className="relative">
							<div className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/40">
								<FiLock size={18} />
							</div>
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								value={formData.password}
								onChange={(e) => handleInputChange("password", e.target.value)}
								className={`w-full pl-10 pr-12 py-3 bg-neutral/30 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
									errors.password
										? "border-error"
										: "border-neutral hover:border-primary/50"
								}`}
								placeholder="Enter your password"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
							>
								{showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
							</button>
						</div>
						{errors.password && (
							<p className="text-sm text-error">{errors.password}</p>
						)}
					</div>

					{/* General error */}
					{errors.general && (
						<div className="p-3 bg-error/10 border border-error/20 rounded-lg">
							<p className="text-sm text-error">{errors.general}</p>
						</div>
					)}

					{/* Demo credentials hint */}
					{mode === "login" && (
						<div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
							<p className="text-sm text-dark/70">
								<strong>Demo:</strong> Use email &quot;demo@taletrace.com&quot;
								or any email with any password
							</p>
						</div>
					)}

					{/* Submit button */}
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading
							? mode === "login"
								? "Signing in..."
								: "Creating account..."
							: mode === "login"
							? "Sign in"
							: "Create account"}
					</Button>

					{/* Mode toggle */}
					<div className="text-center pt-4">
						<p className="text-sm text-dark/60">
							{mode === "login"
								? "Don't have an account? "
								: "Already have an account? "}
							<button
								type="button"
								onClick={() => setMode(mode === "login" ? "signup" : "login")}
								className="text-primary font-medium hover:underline"
							>
								{mode === "login" ? "Sign up" : "Sign in"}
							</button>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}

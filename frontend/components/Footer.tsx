import Link from "next/link";
import { FaF, FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";

const Footer = () => {
	return (
		<footer className="bg-white border-t border-gray-200 mt-auto">
			<div className="px-4 md:px-8 lg:px-16 py-8">
				<div className="max-w-7xl mx-auto">
					{/* Brand Section */}
					<div className="text-center mb-8">
						<h3 className="text-2xl font-serif font-bold text-primary mb-2">
							TaleTrace
						</h3>
						<p className="font-sans text-gray-600 max-w-2xl mx-auto">
							Discover and share stories from around the world with TaleTrace.
						</p>
					</div>

					{/* Three Columns Layout */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
						{/* Column 1: Support */}
						<div>
							<h4 className="font-sans font-semibold text-dark mb-4 text-lg">
								Support
							</h4>
							<ul className="space-y-3">
								<li>
									<Link
										href="/help"
										className="font-sans text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Help Center
									</Link>
								</li>
								<li>
									<Link
										href="/privacy-policy"
										className="font-sans text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="/terms-of-service"
										className="font-sans text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="/contact"
										className="font-sans text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Contact Us
									</Link>
								</li>
							</ul>
						</div>

						{/* Column 2: Explore */}
						<div>
							<h4 className="font-sans font-semibold text-dark mb-4 text-lg">
								Explore
							</h4>
							<ul className="space-y-3">
								<li>
									<Link
										href="/"
										className="text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Discover Places
									</Link>
								</li>
								<li>
									<Link
										href="/tours"
										className="text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Create Tours
									</Link>
								</li>
								<li>
									<Link
										href="/assistant"
										className="text-gray-600 hover:text-primary transition-colors duration-200"
									>
										AI Assistant
									</Link>
								</li>
								<li>
									<Link
										href="/quiz"
										className="text-gray-600 hover:text-primary transition-colors duration-200"
									>
										Take Quiz
									</Link>
								</li>
								<li>
									<Link
										href="/about"
										className="text-gray-600 hover:text-primary transition-colors duration-200"
									>
										About Us
									</Link>
								</li>
							</ul>
						</div>

						{/* Column 3: Socials */}
						<div>
							<h4 className="font-sans font-semibold text-dark mb-4 text-lg">
								Follow Us
							</h4>
							<div className="flex justify-center md:justify-start gap-4">
								<Link
									href="/facebook"
									className="text-gray-600 hover:text-primary transition-colors duration-200 text-2xl"
									aria-label="Facebook"
								>
									<MdFacebook />
								</Link>
								<Link
									href="/twitter"
									className="text-gray-600 hover:text-primary transition-colors duration-200 text-2xl"
									aria-label="Twitter"
								>
									<FaXTwitter />
								</Link>
								<Link
									href="/instagram"
									className="text-gray-600 hover:text-primary transition-colors duration-200 text-2xl"
									aria-label="Instagram"
								>
									<FaInstagram />
								</Link>
								<Link
									href="/tiktok"
									className="text-gray-600 hover:text-primary transition-colors duration-200 text-2xl"
									aria-label="TikTok"
								>
									<FaTiktok />
								</Link>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
						<p className="text-gray-500 text-sm"></p>©{" "}
						{new Date().getFullYear()} TaleTrace. All rights reserved.
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

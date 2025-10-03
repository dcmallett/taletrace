import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Account() {
	return (
		// TODO: maybe split up cards into thier own components i.e profile card etc
		<div className="min-h-screen bg-stone-50">
			<div className="container mx-auto px-4 py-6">
				<div className="max-w-4xl mx-auto">
					{/* profile section */}
					<div className="mb-6">
						<Card className="p-4 md:p-6">
							<div className="flex items-center gap-4">
								<div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
									{/* TODO: ADD in Avatar */}
									DM
								</div>
								<div className="flex-1 min-w-0">
									<h1 className="text-xl md:text-2xl font-display font-bold text-dark">
										Dan Mallett
									</h1>
									<p className="font-sans text-gray-600 text-sm md:text-base">
										dan.mallett@example.com
									</p>
									<p className="font-sans text-xs md:text-sm text-gray-500">
										Member since September 2025
									</p>
								</div>
								<Button variant="secondary" className="hidden md:block">
									Edit Profile
								</Button>
							</div>
							<div className="mt-4 md:hidden">
								<Button variant="secondary" className="w-full">
									Edit Profile
								</Button>
							</div>
						</Card>
					</div>
					{/* <div className="mb-6 md:hidden">
						<Button variant="secondary" className="w-full">
							Edit Profile
						</Button>
					</div> */}

					<div className="mb-6">
						<Card className="p-4 md:p-6">
							<div className="md:flex md:items-center md:justify-between">
								<div className="mb-4 md:mb-0">
									<h2 className="text-lg font-display font-semibold text-dark">
										Usage This Month
									</h2>
									<p className="font-sans text-sm text-gray-600">
										27 of 100 stories unlocked
									</p>
								</div>
								<div className="flex-1 md:max-w-xs md:mx-6">
									<div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
										<div
											className="bg-primary h-full rounded-full transition-all duration-300 ease-in-out"
											style={{ width: "27%" }}
										></div>
									</div>
								</div>
							</div>
						</Card>
					</div>

					<div className="mb-6">
						<Card className="p-4 md:p-6">
							<div className="md:flex md:items-center md:justify-between">
								<div className="mb-4 md:mb-0">
									<h2 className="text-lg font-display font-semibold text-dark">
										Current Plan
									</h2>
									<p className="font-sans text-gray-600">
										Free plan - 100 stories/month
									</p>
									<p className="font-sans text-sm text-gray-500">
										Renews monthly
									</p>
								</div>
								<Button
									variant="primary"
									className="w-full md:w-auto"
									size="default"
								>
									Upgrade Plan
								</Button>
							</div>
						</Card>
					</div>

					{/* Saved locations */}
					<div className="mb-6">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-xl font-serif font-semibold text-dark">
								Saved Locations
							</h2>
							<span className="font-sans text-sm text-gray-500">12 saved</span>
						</div>
						{/* Card list */}
						<div className="space-y-4 max-h-96 overflow-y-auto">
							{[
								{
									name: "Historic Town Square",
									category: "Historic",
									saved: "2 days ago",
								},
								{
									name: "Riverside Park",
									category: "Nature",
									saved: "1 week ago",
								},
								{
									name: "Art District Gallery",
									category: "Culture",
									saved: "2 weeks ago",
								},
								{
									name: "Old Cathedral",
									category: "Religious",
									saved: "3 weeks ago",
								},
								{
									name: "Local Market",
									category: "Shopping",
									saved: "1 month ago",
								},
							].map((location, index) => (
								<Card key={index} className="p-4">
									<div className="flex items-center gap-4">
										<div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
										<div className="flex-1 min-w-0">
											<h3 className="font-display font-semibold text-dark truncate mb-1">
												{location.name}
											</h3>
											<span className="inline-block px-2 py-1 text-xs font-sans bg-secondary text-dark rounded-full mb-1">
												{location.category}
											</span>
											<p className="font-sans text-sm text-gray-500">
												Saved {location.saved}
											</p>
										</div>
										<div className="flex flex-col gap-2 md:flex-row">
											<Button variant="secondary" size="small">
												View
											</Button>
											<Button
												variant="icon"
												className="min-h-[32px] min-w-[32px]"
											>
												×
											</Button>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
					{/* ACCOUNT SETTINGS */}
					<div className="mb-6">
						<h2 className="text-xl font-serif font-semibold text-dark mb-4">
							Account Settings
						</h2>
						<div className="space-y-3">
							<Card>
								<Button
									variant="icon"
									className="w-full flex items-center justify-between text-left p-4"
								>
									<span className="font-sans text-dark">
										Notification Preferences
									</span>
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Button>
							</Card>

							<Card>
								<Button
									variant="icon"
									className="w-full flex items-center justify-between text-left p-4"
								>
									<span className="font-sans text-dark">Privacy & Data</span>
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Button>
							</Card>

							<Card>
								<Button
									variant="icon"
									className="w-full flex items-center justify-between text-left p-4"
								>
									<span className="font-sans text-dark">Help & Support</span>
									<svg
										className="w-5 h-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 5l7 7-7 7"
										/>
									</svg>
								</Button>
							</Card>
						</div>
					</div>
					{/* UPGRADE SECTION */}
					<div className="mb-20 md:mb-8">
						<Card className="bg-gradient-to-r from-accent/20 to-accent/10 p-6">
							<div className="md:flex md:items-center md:justify-between">
								<div className="mb-4 md:mb-0">
									<h3 className="font-display font-semibold text-dark mb-1">
										Unlock unlimited stories
									</h3>
									<p className="font-sans text-sm text-gray-600">
										Get premium access to all location stories and features.
									</p>
								</div>
								<Button
									variant="primary"
									size="default"
									className="w-full md:w-auto"
								>
									Upgrade Now
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>

			{/* MOBILE BOTTOM NAVIGATION */}
			<div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg border-t">
				<div className="flex items-center justify-around h-full px-4">
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-gray-500">Explore</span>
					</button>
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-gray-500">Tours</span>
					</button>
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-gray-500">Assistant</span>
					</button>
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-primary">Account</span>
					</button>
				</div>
			</div>
		</div>
	);
}

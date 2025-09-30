import Button from "@/components/Button";
import Card from "@/components/Card";
export default function Account() {
	return (
		// TODO: maybe split up cards into thier own components i.e profile card etc
		<div className="min-h-screen bg-stone-100">
			<div className="px-4 md:px-8 lg:px-16 py-4 md:py-6">
				<div className="max-w-4xl mx-auto">
					{/* profile section */}
					<div className="mb-6 md:h-[100px]">
						<Card className="md:h-full">
							<div className="flex items-center gap-4 h-full py-4 md:py-0 px-3">
								<div className="w-16 h-16 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
									{/* TODO: ADD in Avatar */}
									DM
								</div>
								<div className="flex-1 min-w-0">
									<h1 className="text-xl md:text-2xl font-bold text-dark">
										Dan Mallett
									</h1>
									<p className="font-sans text-gray-600">
										dan.mallett@example.com
									</p>
									<p className="font-sans text-sm text-gray-500">
										Member since September 2025
									</p>
								</div>
								<Button variant="secondary" className="hidden md:block">
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
						<Card className="md:h-[60px]">
							<div className="md:flex md:items-center md:justify-between h-full py-4 md:py-0">
								<div className="mb-3 md:mb-0">
									<h2 className="text-lg font-serif font-semibold text-dark px-4">
										Usage This Month
									</h2>
									<p className="font-sans text-sm text-gray-600 px-4">
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
						<Card className="md:h-[80px]">
							<div className="md:flex md:items-center md:justify-between h-full py-4 md:py-0">
								<div className="mb-4 md:mb-0 px-3">
									<h2 className="text-lg font-serif font-semibold text-dark">
										Current Plan
									</h2>
									<p className="font-sans text-gray-600">
										Free plan - 100 stories/month
									</p>
									<p className="font-sans text-sm text-gray-500">
										Renews monthly
									</p>
								</div>
								<Button variant="primary" className="mx-3" size="default">
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
								<Card key={index} className="md:h-[100px]">
									<div className="flex items-center gap-4 h-full py-3 md:py-0">
										<div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
										<div className="flex-1 min-w-0">
											<h3 className="font-serif font-semibold text-dark truncate">
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
												Remove
											</Button>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>
					{/* ACCOUNT SETTINGS */}
				</div>
			</div>
		</div>
	);
}

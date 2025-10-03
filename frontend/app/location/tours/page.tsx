import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Tours() {
	return (
		<div className="min-h-screen bg-stone-50">
			<div className="container mx-auto px-4 py-6">
				<div className="max-w-6xl mx-auto">
					<div className="mb-6">
						<Card className="p-4 md:p-6">
							<div className="md:flex md:items-center md:justify-between">
								<h1 className="text-2xl md:text-3xl font-display font-bold text-dark mb-4 md:mb-0">
									My Tours
								</h1>
								<Button
									variant="primary"
									size="default"
									className="w-full md:w-auto"
								>
									Create Tour
								</Button>
							</div>
						</Card>
					</div>

					<div className="mb-6">
						<Card className="h-48 md:h-[250px] overflow-hidden">
							<div className="w-full h-full bg-gray-200 flex items-center justify-center relative">
								<span className="text-gray-600 font-sans">Tour Route Map</span>
								<div className="absolute top-4 left-4 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
									1
								</div>
								<div className="absolute top-16 right-8 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
									2
								</div>
								<div className="absolute bottom-12 left-12 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
									3
								</div>
							</div>
						</Card>
					</div>

					{/* CURRENT TOUR STEPS SECTION */}
					<div className="mb-6">
						<h2 className="text-xl font-display font-semibold text-dark mb-4">
							Current Tour Steps
						</h2>
						<div className="space-y-3 mb-4">
							{[
								{
									number: 1,
									title: "Historic Downtown Plaza",
									duration: "30 mins",
								},
								{ number: 2, title: "Riverside Park", duration: "45 mins" },
								{ number: 3, title: "City Museum", duration: "1 hour" },
							].map((step) => (
								<Card key={step.number} className="p-4">
									<div className="flex items-center gap-4">
										<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
											{step.number}
										</div>
										<div className="flex-1 min-w-0">
											<h3 className="font-display font-medium text-dark truncate">
												{step.title}
											</h3>
											<span className="font-sans text-sm text-gray-600">
												{step.duration}
											</span>
										</div>
										<div className="flex gap-2">
											<Button
												variant="icon"
												size="icon"
												className="min-h-[32px] min-w-[32px]"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
													/>
												</svg>
											</Button>
											<Button
												variant="icon"
												size="icon"
												className="min-h-[32px] min-w-[32px]"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													/>
												</svg>
											</Button>
										</div>
									</div>
								</Card>
							))}

							{/* Add New Step button */}
							<Card className="border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200">
								<Button
									variant="icon"
									className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 p-4"
								>
									<svg
										className="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4v16m8-8H4"
										/>
									</svg>
									<span className="font-sans">Add Step</span>
								</Button>
							</Card>
						</div>
					</div>

					{/* Saved tours section */}
					<div className="mb-6">
						<h2 className="text-xl font-display font-semibold text-dark mb-4">
							My Saved Tours
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{[
								{ title: "City Highlights", steps: 5, duration: "2 hours" },
								{ title: "Art & Culture", steps: 4, duration: "1.5 hours" },
								{ title: "Nature Walk", steps: 6, duration: "3 hours" },
							].map((tour, index) => (
								<Card key={index} className="p-6 h-40">
									<div className="flex flex-col justify-between h-full">
										<div className="mb-4">
											<h3 className="font-display font-semibold text-dark mb-2">
												{tour.title}
											</h3>
											<p className="font-sans text-sm text-gray-600">
												{tour.steps} stops • {tour.duration}
											</p>
										</div>
										<div className="flex gap-2">
											<Button variant="primary" size="small" className="flex-1">
												Start Tour
											</Button>
											<Button
												variant="icon"
												size="icon"
												className="min-h-[32px] min-w-[32px]"
											>
												<svg
													className="w-4 h-4"
													fill="none"
													stroke="currentColor"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
													/>
												</svg>
											</Button>
										</div>
									</div>
								</Card>
							))}
						</div>
					</div>

					{/* CREATE TOUR CTA */}
					<div className="mb-20 md:mb-8">
						<Card className="bg-gradient-to-r from-accent/20 to-accent/10 p-6">
							<div className="md:flex md:items-center md:justify-between">
								<div className="mb-4 md:mb-0">
									<h3 className="font-display font-semibold text-dark mb-1">
										Ready to create your own tour?
									</h3>
									<p className="font-sans text-sm text-gray-600">
										Discover hidden gems and share your favorites with others
									</p>
								</div>
								<Button
									variant="primary"
									size="default"
									className="w-full md:w-auto"
								>
									Start Creating
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
						<span className="text-xs font-sans text-primary">Tours</span>
					</button>
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-gray-500">Assistant</span>
					</button>
					<button className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px]">
						<span className="text-xs font-sans text-gray-500">Account</span>
					</button>
				</div>
			</div>
		</div>
	);
}

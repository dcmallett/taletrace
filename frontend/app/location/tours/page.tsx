import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Tours() {
	return (
		<div className="min-h-screen bg-stone-100">
			<div className="px-4 md:px-8 lg:px-16 py-4 md:py-6">
				<div className="mb-6 md:h-[60px] md:flex md:items-center md:justify-between">
					<h1 className="text-2xl md:text-3xl font-serif font-bold text-dark mb-4 md:mb-0">
						My Tours
					</h1>
					<Button variant="primary" size="default" className="w-full md:w-auto">
						Create Tour
					</Button>
				</div>

				<div className="mb-6">
					<div className="h-48 md:h-[250px] bg-white rounded-2xl shadow-md border overflow-hidden">
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
					</div>
				</div>

				{/* CURRENT TOUR STEPS SECTION */}
				<div className="mb-6">
					<h2 className="text-xl font-serif font-semibold text-dark mb-4">
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
							<Card key={step.number} className="md:h-[50px]">
								<div className="flex items-center gap-4 h-full py-3 md:py-0">
									<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
										{step.number}
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-serif font-medium text-dark truncate">
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

						{/* Add New Step button desktop */}
						<Card className="md:h-[50px] border-2 border-dashed border-gray-300 hover:border-primary transition-colors duration-200">
							<Button className="w-full h-full flex items-center justify-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200 py-3 md:py-0">
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
							</Button>
						</Card>
					</div>
				</div>

				{/* SAVED LOCATIONS */}
			</div>
		</div>
	);
}

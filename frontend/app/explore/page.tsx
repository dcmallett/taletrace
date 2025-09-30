import Link from "next/link";
import Card from "@/components/Card";
import Search from "@/components/Search";

//TODO REDO
const featuredLocations = [
	{
		id: "historic-downtown-plaza",
		name: "Historic Downtown Plaza",
		description:
			"A beautiful historic plaza in the heart of the city with stunning architecture.",
		category: "Historic Site",
		rating: 4.8,
		reviews: 127,
		emoji: "🏛️",
	},
	{
		id: "central-park",
		name: "Central Park",
		description:
			"A sprawling urban oasis perfect for relaxation and recreation.",
		category: "Park",
		rating: 4.9,
		reviews: 2453,
		emoji: "🌲",
	},
	{
		id: "golden-gate-bridge",
		name: "Golden Gate Bridge",
		description: "Iconic suspension bridge and symbol of San Francisco.",
		category: "Landmark",
		rating: 4.7,
		reviews: 5621,
		emoji: "🌉",
	},
	{
		id: "times-square",
		name: "Times Square",
		description:
			"The bustling heart of NYC, known for bright lights and Broadway shows.",
		category: "Entertainment",
		rating: 4.3,
		reviews: 8934,
		emoji: "🎭",
	},
];

export default function Explore() {
	return (
		<div className="min-h-screen bg-stone-50">
			{/* Hero Section */}
			<div className="bg-primary text-light py-16">
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
						Explore Amazing Places
					</h1>
					<p className="font-sans text-xl text-secondary mb-8 max-w-2xl mx-auto">
						Discover fascinating locations, hidden gems, and popular
						destinations around the world.
					</p>
					<div className="max-w-2xl mx-auto">
						<Search placeholder="Search for places, landmarks, or attractions..." />
					</div>
				</div>
			</div>

			{/* Featured Locations */}
			<div className="container mx-auto px-4 py-12">
				<h2 className="font-display text-3xl font-bold text-primary mb-8 text-center">
					Featured Locations
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{featuredLocations.map((location) => (
						<Link
							key={location.id}
							href={`/location/location-detail/${location.id}`}
						>
							<Card className="group hover:scale-105 transition-all duration-300 cursor-pointer h-full">
								<div className="p-6">
									{/* Image placeholder */}
									<div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
										{location.emoji}
									</div>

									{/* Category badge */}
									<div className="text-center mb-3">
										<span className="bg-accent text-dark px-3 py-1 rounded-full text-xs font-medium">
											{location.category}
										</span>
									</div>

									{/* Title */}
									<h3 className="font-display text-xl font-semibold text-primary mb-2 text-center group-hover:text-accent transition-colors">
										{location.name}
									</h3>

									{/* Description */}
									<p className="font-sans text-gray-600 text-sm mb-4 text-center line-clamp-2">
										{location.description}
									</p>

									{/* Rating */}
									<div className="flex items-center justify-center text-sm text-gray-500">
										<span>⭐ {location.rating}</span>
										<span className="mx-2">•</span>
										<span>{location.reviews} reviews</span>
									</div>
								</div>
							</Card>
						</Link>
					))}
				</div>

				{/* More locations coming soon */}
				<div className="text-center mt-12">
					<Card className="p-8 max-w-md mx-auto">
						<div className="text-4xl mb-4">🔍</div>
						<h3 className="font-display text-xl font-semibold text-primary mb-2">
							More Locations Coming Soon
						</h3>
						<p className="font-sans text-gray-600 text-sm">
							We&apos;re adding new amazing places every week. Check back soon
							for more discoveries!
						</p>
					</Card>
				</div>
			</div>
		</div>
	);
}

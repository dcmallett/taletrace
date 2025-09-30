import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Map from "@/components/Map";

interface LocationDetailProps {
	params: {
		id: string;
	};
}

// Mock data for demonstration
interface LocationInfo {
	name: string;
	description: string;
	address: string;
	rating: number;
	reviews: number;
	category: string;
	images: string[];
	highlights: string[];
	story: string;
}

const locationData: Record<string, LocationInfo> = {
	"historic-downtown-plaza": {
		name: "Historic Downtown Plaza",
		description:
			"A beautiful historic plaza in the heart of the city, featuring stunning architecture and rich cultural heritage.",
		address: "123 Plaza Street, Downtown",
		rating: 4.8,
		reviews: 127,
		category: "Historic Site",
		images: ["🏛️", "🌳", "🎭"],
		highlights: [
			"18th century architecture",
			"Cultural events year-round",
			"Guided tours available",
			"Street performers and artists",
		],
		story:
			"Built in 1789, this plaza has been the heart of community life for over two centuries. Originally designed as a marketplace, it has evolved into a cultural hub where locals and visitors gather to experience the city's rich history.",
	},
	"central-park": {
		name: "Central Park",
		description:
			"A sprawling urban oasis perfect for relaxation, recreation, and connecting with nature.",
		address: "Central Park, New York, NY",
		rating: 4.9,
		reviews: 2453,
		category: "Park",
		images: ["🌲", "🦆", "🚶‍♀️"],
		highlights: [
			"843 acres of green space",
			"Multiple walking trails",
			"Boating and activities",
			"Seasonal events",
		],
		story:
			"Opened in 1857, Central Park was the first landscaped public park in the United States. It was designed by Frederick Law Olmsted and Calvert Vaux as a green escape from the bustling city life.",
	},
};

const LocationDetail = ({ params }: LocationDetailProps) => {
	const { id } = params;
	const location = locationData[id];

	// If location not found, show a default or 404-like message
	if (!location) {
		return (
			<div className="min-h-screen bg-stone-50 flex items-center justify-center">
				<div className="text-center">
					<h1 className="font-display text-4xl text-primary mb-4">
						Location Not Found
					</h1>
					<p className="font-sans text-gray-600 mb-6">
						The location &ldquo;{id}&rdquo; doesn&apos;t exist in our database.
					</p>
					<Link href="/explore">
						<Button>Back to Explore</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-stone-50">
			{/* Hero Section */}
			<div className="bg-primary text-light py-12">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="flex items-center gap-4 mb-4">
							<Link
								href="/explore"
								className="text-secondary hover:text-accent transition-colors"
							>
								← Back to Explore
							</Link>
						</div>
						<h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
							{location.name}
						</h1>
						<div className="flex items-center gap-4 text-secondary">
							<span className="bg-accent text-dark px-3 py-1 rounded-full text-sm font-medium">
								{location.category}
							</span>
							<span>
								⭐ {location.rating} ({location.reviews} reviews)
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Content Section */}
			<div className="container mx-auto px-4 py-12">
				<div className="max-w-4xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
						{/* Main Content */}
						<div className="lg:col-span-2 space-y-8">
							{/* Images */}
							<Card className="p-6">
								<div className="flex justify-center gap-4 text-6xl mb-4">
									{location.images.map((emoji: string, index: number) => (
										<span key={index}>{emoji}</span>
									))}
								</div>
								<p className="text-center text-gray-600 font-sans">
									Visual gallery coming soon
								</p>
							</Card>

							{/* Description */}
							<Card className="p-6">
								<h2 className="font-display text-2xl font-semibold text-primary mb-4">
									About This Place
								</h2>
								<p className="font-sans text-gray-700 leading-relaxed mb-4">
									{location.description}
								</p>
								<p className="font-sans text-gray-700 leading-relaxed">
									{location.story}
								</p>
							</Card>

							{/* Map */}
							<Card className="p-6">
								<h2 className="font-display text-2xl font-semibold text-primary mb-4">
									Location
								</h2>
								<p className="font-sans text-gray-600 mb-4">
									{location.address}
								</p>
								<Map height="300px" />
							</Card>
						</div>

						{/* Sidebar */}
						<div className="space-y-6">
							{/* Highlights */}
							<Card className="p-6">
								<h3 className="font-display text-xl font-semibold text-primary mb-4">
									Highlights
								</h3>
								<ul className="space-y-2">
									{location.highlights.map(
										(highlight: string, index: number) => (
											<li
												key={index}
												className="font-sans text-gray-700 flex items-center"
											>
												<span className="text-accent mr-2">✓</span>
												{highlight}
											</li>
										)
									)}
								</ul>
							</Card>

							{/* Actions */}
							<Card className="p-6">
								<h3 className="font-display text-xl font-semibold text-primary mb-4">
									Plan Your Visit
								</h3>
								<div className="space-y-3">
									<Button className="w-full">Add to Tour</Button>
									<Button variant="secondary" className="w-full">
										Save Location
									</Button>
									<Button variant="secondary" className="w-full">
										Share
									</Button>
								</div>
							</Card>

							{/* Quick Info */}
							<Card className="p-6">
								<h3 className="font-display text-xl font-semibold text-primary mb-4">
									Quick Info
								</h3>
								<div className="space-y-2 font-sans text-sm">
									<div className="flex justify-between">
										<span className="text-gray-600">Rating:</span>
										<span>⭐ {location.rating}/5</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Reviews:</span>
										<span>{location.reviews}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-600">Category:</span>
										<span>{location.category}</span>
									</div>
								</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LocationDetail;

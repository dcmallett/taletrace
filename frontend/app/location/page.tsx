import Link from "next/link";
import Card from "@/components/Card";
import Button from "@/components/Button";

export default function Location() {
	return (
		<div className="min-h-screen bg-stone-50">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
							Locations Hub
						</h1>
						<p className="font-sans text-gray-600 text-lg">
							Discover and manage your favorite places and travel destinations.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<Link href="/explore">
							<Card className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
								<div className="text-4xl mb-4">🗺️</div>
								<h3 className="font-display text-xl font-semibold text-primary mb-3">
									Explore Places
								</h3>
								<p className="font-sans text-gray-600 mb-4">
									Discover amazing locations and hidden gems around the world.
								</p>
								<Button variant="secondary" className="w-full">
									Start Exploring
								</Button>
							</Card>
						</Link>

						<Link href="/location/tours">
							<Card className="p-6 text-center hover:scale-105 transition-transform cursor-pointer">
								<div className="text-4xl mb-4">🎯</div>
								<h3 className="font-display text-xl font-semibold text-primary mb-3">
									Create Tours
								</h3>
								<p className="font-sans text-gray-600 mb-4">
									Design personalized tours and share your favorite routes.
								</p>
								<Button variant="secondary" className="w-full">
									Create Tours
								</Button>
							</Card>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

import Link from "next/link";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Search from "@/components/Search";

export default function Home() {
	return (
		<main className="min-h-screen">
			{/* Hero Section */}
			<section className="bg-primary text-light py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
						Discover Stories Around the World
					</h1>
					<p className="font-sans text-xl md:text-2xl mb-8 text-secondary max-w-3xl mx-auto">
						TaleTrace helps you explore fascinating places, create memorable
						tours, and connect with stories that matter.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
						<Link href="/explore">
							<Button variant="secondary" className="w-full sm:w-auto">
								Start Exploring
							</Button>
						</Link>
						<Link href="/assistant">
							<Button
								variant="primary"
								className="w-full sm:w-auto bg-accent text-dark hover:bg-accent/90"
							>
								Try AI Assistant
							</Button>
						</Link>
					</div>

					{/* Search Bar */}
					<div className="max-w-2xl mx-auto">
						<Search
							placeholder="Search for places, tours, or stories..."
							className="mb-4"
						/>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-stone-50">
				<div className="container mx-auto px-4">
					<h2 className="font-display text-3xl md:text-4xl font-bold text-center text-primary mb-12">
						What You Can Do
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<Card className="p-6 text-center hover:scale-105 transition-transform">
							<div className="text-4xl mb-4">🗺️</div>
							<h3 className="font-display text-xl font-semibold text-primary mb-3">
								Explore Places
							</h3>
							<p className="font-sans text-gray-600">
								Discover hidden gems and popular destinations with detailed
								stories and insights.
							</p>
						</Card>

						<Card className="p-6 text-center hover:scale-105 transition-transform">
							<div className="text-4xl mb-4">🎯</div>
							<h3 className="font-display text-xl font-semibold text-primary mb-3">
								Create Tours
							</h3>
							<p className="font-sans text-gray-600">
								Design personalized tours and share your favorite routes with
								others.
							</p>
						</Card>

						<Card className="p-6 text-center hover:scale-105 transition-transform">
							<div className="text-4xl mb-4">🤖</div>
							<h3 className="font-display text-xl font-semibold text-primary mb-3">
								AI Assistant
							</h3>
							<p className="font-sans text-gray-600">
								Get personalized recommendations and travel insights powered by
								AI.
							</p>
						</Card>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-secondary">
				<div className="container mx-auto px-4 text-center">
					<h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
						Ready to Start Your Journey?
					</h2>
					<p className="font-sans text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
						Join thousands of travelers who use TaleTrace to discover amazing
						places and create unforgettable experiences.
					</p>
					<Link href="/explore">
						<Button size="default" className="text-lg px-8 py-4">
							Get Started Now
						</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}

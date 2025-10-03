import Card from "@/components/Card";

export default function Assistant() {
	return (
		<div className="min-h-screen bg-stone-50">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-12">
						<h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
							AI Assistant
						</h1>
						<p className="font-sans text-gray-600 text-lg">
							Get personalized recommendations and travel insights powered by
							AI.
						</p>
					</div>

					<Card className="p-8 text-center">
						<div className="text-6xl mb-6">🤖</div>
						<h2 className="font-display text-2xl font-semibold text-primary mb-4">
							Coming Soon
						</h2>
						<p className="font-sans text-gray-600 max-w-2xl mx-auto">
							Our AI Assistant is being trained to provide you with the best
							travel recommendations, route planning, and location insights.
							Stay tuned for an intelligent travel companion!
						</p>
					</Card>
				</div>
			</div>
		</div>
	);
}

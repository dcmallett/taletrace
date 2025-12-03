"use client";
import React, { useState } from "react";

const AssistantPage: React.FC = () => {
	const [inputValue, setInputValue] = useState("");

	const mockMessages = [
		{
			type: "user",
			content: "What can you tell me about the historic downtown area?",
			timestamp: "2:30 PM",
		},
		{
			type: "assistant",
			content:
				"The historic downtown area is rich with stories dating back to the 1800s. I can help you discover hidden gems, plan walking routes, or explain the significance of specific landmarks. What interests you most - architecture, local legends, or perhaps the best photo spots?",
			timestamp: "2:31 PM",
		},
		{
			type: "user",
			content: "Tell me about the best photo spots",
			timestamp: "2:32 PM",
		},
		{
			type: "assistant",
			content:
				"Here are the top 5 photo spots in the historic downtown:\n\n1. **Town Square Fountain** - Golden hour lighting is spectacular\n2. **Old Cathedral Steps** - Perfect for architectural shots\n3. **River Bridge Overlook** - Panoramic city views\n4. **Vintage Street Lamps** - Great for evening photography\n5. **Historic Courthouse** - Beautiful stone facade\n\nWould you like me to create a photo walk tour connecting these locations?",
			timestamp: "2:33 PM",
		},
	];

	return (
		<div className="min-h-screen bg-stone-50 flex flex-col">
			<div className="flex-1 flex flex-col px-4 md:px-8 lg:px-16 py-4 md:py-6">
				<div className="mb-6">
					<h1 className="text-2xl md:text-3xl font-serif font-bold text-dark mb-2">
						AI Travel Assistant
					</h1>
					<p className="font-sans text-gray-600">
						Ask me anything about local history, attractions, or travel
						recommendations
					</p>
				</div>

				<div className="mb-6 md:h-[100px] md:flex md:items-center">
					<div className="w-full">
						<h2 className="text-sm font-sans font-medium text-gray-700 mb-3">
							Quick Suggestions:
						</h2>
						<div className="flex flex-wrap gap-2 md:gap-3">
							{[
								"Best walking routes",
								"Hidden local gems",
								"Photo opportunities",
								"Historical facts",
								"Restaurant recommendations",
							].map((suggestion, index) => (
								<button
									key={index}
									className="px-3 py-2 bg-white rounded-lg border border-gray-200 hover:border-primary/5 transition-all duration-200 ease-in-out"
									onClick={() => setInputValue(suggestion)}
								>
									<span className="font-sans text-sm text-gray-700">
										{suggestion}
									</span>
								</button>
							))}
						</div>
					</div>
				</div>
				{/* CHAT RESPONSE AREA EXPANDABLE SCROLLABLE */}
				<div className="flex-1 mb-4 md:mb-6 min-h-[400px]">
					<div className="h-full overflow-y-auto space-y-4 pr-2"></div>
				</div>
			</div>
		</div>
	);
};

export default AssistantPage;

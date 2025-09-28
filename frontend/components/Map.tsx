"use client";

import React from "react";

interface MapProps {
	className?: string;
	height?: string;
	center?: { lat: number; lng: number };
	zoom?: number;
}

const Map: React.FC<MapProps> = ({
	className = "",
	height = "400px",
	center = { lat: 40.7128, lng: -74.006 }, // Default to NYC
	zoom = 12,
}) => {
	return (
		<div
			className={`bg-light border border-neutral shadow-md rounded-[var(--radius-md)] flex items-center justify-center ${className}`}
			style={{ height }}
		>
			<div className="text-center p-8">
				<div className="text-4xl mb-4">🗺️</div>
				<h3 className="font-display text-xl text-primary mb-2">
					Interactive Map
				</h3>
				<p className="font-sans text-gray-600">
					Map component will be integrated here
					<br />
					<small className="text-xs text-gray-400">
						Center: {center.lat}, {center.lng} | Zoom: {zoom}
					</small>
				</p>
			</div>
		</div>
	);
};

export default Map;

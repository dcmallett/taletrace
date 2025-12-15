"use client";

import { useState } from "react";
import Image from "next/image";
import { useAuth } from "../../contexts/AuthContext";
import Button from "../../components/Button";
import Card from "../../components/Card";
import AuthModal from "../../components/AuthModal";
import {
	FiUser,
	FiMail,
	FiCalendar,
	FiSettings,
	FiHeart,
	FiMapPin,
	FiTrendingUp,
	FiEdit3,
	FiCamera,
	FiAward,
	FiBell,
	FiShield,
	FiEye,
	FiSave,
	FiX,
	FiLogOut,
	FiGrid,
	FiBookOpen,
	FiClock,
	FiStar,
	FiDownload,
	FiTrash2,
} from "react-icons/fi";

interface ProfileData {
	name: string;
	email: string;
	bio: string;
	location: string;
	website: string;
	notifications: {
		email: boolean;
		push: boolean;
		sms: boolean;
	};
	privacy: {
		profileVisible: boolean;
		locationSharing: boolean;
		activityTracking: boolean;
	};
}

interface QuizScore {
	category: string;
	score: number;
	totalQuizzes: number;
	bestStreak: number;
	lastPlayed: string;
}

interface SavedLocation {
	id: string;
	name: string;
	category: string;
	savedDate: string;
	image?: string;
	description: string;
}

export default function Account() {
	const { user, logout } = useAuth();
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [activeTab, setActiveTab] = useState("profile");
	const [isEditing, setIsEditing] = useState(false);

	const [profileData, setProfileData] = useState<ProfileData>({
		name: user?.name || "",
		email: user?.email || "",
		bio: "Passionate explorer discovering stories in every corner of the world. I love uncovering hidden gems and learning about the rich history behind every location.",
		location: "New York, NY",
		website: "https://example.com",
		notifications: {
			email: true,
			push: true,
			sms: false,
		},
		privacy: {
			profileVisible: true,
			locationSharing: false,
			activityTracking: true,
		},
	});

	// Mock data
	const quizScores: QuizScore[] = [
		{
			category: "History",
			score: 85,
			totalQuizzes: 12,
			bestStreak: 7,
			lastPlayed: "2 days ago",
		},
		{
			category: "Geography",
			score: 92,
			totalQuizzes: 8,
			bestStreak: 5,
			lastPlayed: "1 week ago",
		},
		{
			category: "Culture",
			score: 78,
			totalQuizzes: 15,
			bestStreak: 4,
			lastPlayed: "3 days ago",
		},
		{
			category: "Architecture",
			score: 88,
			totalQuizzes: 6,
			bestStreak: 6,
			lastPlayed: "5 days ago",
		},
	];

	const savedLocations: SavedLocation[] = [
		{
			id: "1",
			name: "Central Park",
			category: "Nature",
			savedDate: "2024-12-10",
			description: "A massive public park in the heart of Manhattan",
		},
		{
			id: "2",
			name: "Brooklyn Bridge",
			category: "Architecture",
			savedDate: "2024-12-08",
			description: "Iconic suspension bridge connecting Manhattan and Brooklyn",
		},
		{
			id: "3",
			name: "The High Line",
			category: "Culture",
			savedDate: "2024-12-05",
			description: "Elevated linear park built on former railway line",
		},
		{
			id: "4",
			name: "9/11 Memorial",
			category: "History",
			savedDate: "2024-12-01",
			description: "Memorial honoring victims of September 11 attacks",
		},
	];

	const handleProfileSave = () => {
		console.log("Saving profile:", profileData);
		setIsEditing(false);
	};

	const handleInputChange = (field: keyof ProfileData, value: string) => {
		setProfileData((prev) => ({ ...prev, [field]: value }));
	};

	const handleNestedInputChange = (
		category: keyof Pick<ProfileData, "notifications" | "privacy">,
		field: string,
		value: boolean
	) => {
		setProfileData((prev) => ({
			...prev,
			[category]: { ...prev[category], [field]: value },
		}));
	};

	if (!user) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
				<div className="flex items-center justify-center min-h-screen p-6">
					<Card className="w-full max-w-md p-8 text-center">
						<div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
							<FiUser size={32} className="text-white" />
						</div>
						<h1 className="text-2xl font-bold text-dark mb-3">
							Welcome to TaleTrace
						</h1>
						<p className="text-gray-600 mb-6">
							Sign in to access your profile, explore saved locations, track
							your quiz progress, and discover amazing stories.
						</p>
						<Button
							onClick={() => setIsAuthModalOpen(true)}
							className="w-full mb-4"
						>
							Sign In to Continue
						</Button>
						<p className="text-sm text-gray-500">
							New here? Sign up to start your journey of discovery.
						</p>
						<AuthModal
							isOpen={isAuthModalOpen}
							onClose={() => setIsAuthModalOpen(false)}
							defaultMode="login"
						/>
					</Card>
				</div>
			</div>
		);
	}

	const memberSince = new Date().toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
	});

	const getAverageScore = () => {
		const total = quizScores.reduce((sum, quiz) => sum + quiz.score, 0);
		return Math.round(total / quizScores.length);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
			<div className="container mx-auto px-4 py-6 max-w-6xl">
				{/* Header with Profile Summary */}
				<div className="mb-8">
					<Card className="overflow-hidden">
						{/* Cover Background with Overlay */}
						<div className="relative h-32 bg-gradient-to-r from-secondary via-accent to-secondary">
							<div className="absolute inset-0 bg-black/20"></div>
						</div>

						{/* Profile Content */}
						<div className="px-6 pb-6 -mt-16 relative">
							<div className="flex flex-col lg:flex-row gap-6 items-start">
								{/* Avatar */}
								<div className="relative">
									<div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
										{user.avatar ? (
											<Image
												src={user.avatar}
												alt={user.name}
												width={96}
												height={96}
												className="w-full h-full object-cover rounded-full"
											/>
										) : (
											user.name.charAt(0).toUpperCase()
										)}
									</div>
									{isEditing && (
										<button className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors shadow-md">
											<FiCamera size={16} />
										</button>
									)}
								</div>

								{/* Profile Info */}
								<div className="flex-1 pt-4 min-w-0">
									{isEditing ? (
										<div className="space-y-4">
											<input
												type="text"
												value={profileData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												className="text-2xl font-bold text-dark bg-white border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Your name"
											/>
											<input
												type="email"
												value={profileData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												className="text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Your email"
											/>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<input
													type="text"
													value={profileData.location}
													onChange={(e) =>
														handleInputChange("location", e.target.value)
													}
													className="text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
													placeholder="Location"
												/>
												<input
													type="url"
													value={profileData.website}
													onChange={(e) =>
														handleInputChange("website", e.target.value)
													}
													className="text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
													placeholder="Website"
												/>
											</div>
											<textarea
												value={profileData.bio}
												onChange={(e) =>
													handleInputChange("bio", e.target.value)
												}
												className="text-gray-600 bg-white border border-gray-200 rounded-lg px-4 py-2 w-full h-24 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
												placeholder="Tell us about yourself..."
											/>
										</div>
									) : (
										<div className="space-y-3">
											<h1 className="text-2xl md:text-3xl font-bold text-dark">
												{profileData.name}
											</h1>
											<div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
												<div className="flex items-center gap-1.5">
													<FiMail size={16} />
													<span>{profileData.email}</span>
												</div>
												<div className="flex items-center gap-1.5">
													<FiMapPin size={16} />
													<span>{profileData.location}</span>
												</div>
												<div className="flex items-center gap-1.5">
													<FiCalendar size={16} />
													<span>Joined {memberSince}</span>
												</div>
											</div>
											<p className="text-gray-700 leading-relaxed max-w-xl">
												{profileData.bio}
											</p>
										</div>
									)}
								</div>

								{/* Actions */}
								<div className="flex flex-col sm:flex-row gap-2 pt-4 self-start lg:self-center">
									{isEditing ? (
										<>
											<Button
												variant="primary"
												size="small"
												onClick={handleProfileSave}
												className="flex items-center justify-center gap-2 whitespace-nowrap"
											>
												<FiSave size={16} />
												Save Changes
											</Button>
											<Button
												variant="secondary"
												size="small"
												onClick={() => setIsEditing(false)}
												className="flex items-center justify-center gap-2"
											>
												<FiX size={16} />
												Cancel
											</Button>
										</>
									) : (
										<>
											<Button
												variant="primary"
												size="small"
												onClick={() => setIsEditing(true)}
												className="flex items-center justify-center gap-2 whitespace-nowrap"
											>
												<FiEdit3 size={16} />
												Edit Profile
											</Button>
											<Button
												variant="secondary"
												size="small"
												onClick={logout}
												className="flex items-center justify-center gap-2"
											>
												<FiLogOut size={16} />
												Sign Out
											</Button>
										</>
									)}
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Quick Stats */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					<Card className="p-4 text-center">
						<div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
							<FiBookOpen size={20} className="text-accent" />
						</div>
						<div className="text-2xl font-bold text-dark">
							{savedLocations.length}
						</div>
						<div className="text-sm text-gray-600">Saved Places</div>
					</Card>

					<Card className="p-4 text-center">
						<div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
							<FiAward size={20} className="text-primary" />
						</div>
						<div className="text-2xl font-bold text-dark">
							{getAverageScore()}%
						</div>
						<div className="text-sm text-gray-600">Avg Quiz Score</div>
					</Card>

					<Card className="p-4 text-center">
						<div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
							<FiTrendingUp size={20} className="text-primary" />
						</div>
						<div className="text-2xl font-bold text-dark">147</div>
						<div className="text-sm text-gray-600">Stories Read</div>
					</Card>

					<Card className="p-4 text-center">
						<div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-2">
							<FiClock size={20} className="text-accent" />
						</div>
						<div className="text-2xl font-bold text-dark">23h</div>
						<div className="text-sm text-gray-600">Time Exploring</div>
					</Card>
				</div>

				{/* Navigation Tabs */}
				<div className="mb-6">
					<div className="flex flex-wrap gap-2 p-1 bg-white rounded-lg shadow-sm border">
						{[
							{ id: "profile", label: "Profile", icon: FiUser },
							{ id: "locations", label: "Saved Locations", icon: FiMapPin },
							{ id: "quizzes", label: "Quiz Scores", icon: FiAward },
							{ id: "settings", label: "Settings", icon: FiSettings },
						].map((tab) => {
							const Icon = tab.icon;
							return (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
										activeTab === tab.id
											? "bg-primary text-white shadow-sm"
											: "text-gray-600 hover:text-primary hover:bg-primary/5"
									}`}
								>
									<Icon size={16} />
									<span className="hidden sm:inline">{tab.label}</span>
								</button>
							);
						})}
					</div>
				</div>

				{/* Tab Content */}
				<div className="pb-20 md:pb-8">
					{/* Profile Tab */}
					{activeTab === "profile" && (
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
							{/* Recent Activity */}
							<div className="lg:col-span-2">
								<Card className="p-6">
									<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
										<FiClock size={20} />
										Recent Activity
									</h3>
									<div className="space-y-4">
										{[
											{
												action: "Completed History quiz",
												location: "Central Park",
												time: "2 hours ago",
												score: 85,
											},
											{
												action: "Saved location",
												location: "Brooklyn Bridge",
												time: "1 day ago",
											},
											{
												action: "Unlocked story",
												location: "The High Line",
												time: "2 days ago",
											},
											{
												action: "Completed Geography quiz",
												location: "Times Square",
												time: "3 days ago",
												score: 92,
											},
										].map((activity, index) => (
											<div
												key={index}
												className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-b-0"
											>
												<div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
													{activity.score ? (
														<FiAward size={14} className="text-primary" />
													) : (
														<FiMapPin size={14} className="text-primary" />
													)}
												</div>
												<div className="flex-1">
													<p className="text-dark font-medium">
														{activity.action}
													</p>
													<p className="text-sm text-gray-600">
														{activity.location}
													</p>
													{activity.score && (
														<div className="flex items-center gap-2 mt-1">
															<div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
																Score: {activity.score}%
															</div>
														</div>
													)}
												</div>
												<span className="text-xs text-gray-500">
													{activity.time}
												</span>
											</div>
										))}
									</div>
								</Card>
							</div>

							{/* Achievements */}
							<div>
								<Card className="p-6">
									<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
										<FiStar size={20} />
										Achievements
									</h3>
									<div className="space-y-3">
										{[
											{
												title: "Explorer",
												description: "Saved 10+ locations",
												earned: true,
											},
											{
												title: "Quiz Master",
												description: "90% average score",
												earned: true,
											},
											{
												title: "Story Collector",
												description: "Read 100+ stories",
												earned: true,
											},
											{
												title: "Geography Expert",
												description: "Perfect geography quiz",
												earned: false,
											},
											{
												title: "History Buff",
												description: "Complete all history quizzes",
												earned: false,
											},
										].map((achievement, index) => (
											<div
												key={index}
												className={`flex items-center gap-3 p-3 rounded-lg ${
													achievement.earned ? "bg-accent/10" : "bg-gray-50"
												}`}
											>
												<div
													className={`w-8 h-8 rounded-full flex items-center justify-center ${
														achievement.earned
															? "bg-accent text-white"
															: "bg-gray-300 text-gray-600"
													}`}
												>
													<FiAward size={16} />
												</div>
												<div className="flex-1">
													<p
														className={`font-medium ${
															achievement.earned ? "text-dark" : "text-gray-500"
														}`}
													>
														{achievement.title}
													</p>
													<p className="text-xs text-gray-600">
														{achievement.description}
													</p>
												</div>
											</div>
										))}
									</div>
								</Card>
							</div>
						</div>
					)}

					{/* Saved Locations Tab */}
					{activeTab === "locations" && (
						<div>
							<div className="flex items-center justify-between mb-6">
								<h2 className="text-xl font-semibold text-dark">
									My Saved Locations
								</h2>
								<div className="text-sm text-gray-600">
									{savedLocations.length} locations saved
								</div>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{savedLocations.map((location) => (
									<Card
										key={location.id}
										className="overflow-hidden hover:shadow-lg transition-shadow"
									>
										<div className="h-40 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 flex items-center justify-center">
											<FiMapPin size={40} className="text-primary" />
										</div>
										<div className="p-4">
											<div className="flex items-start justify-between mb-2">
												<h3 className="font-semibold text-dark truncate">
													{location.name}
												</h3>
												<span className="text-xs bg-secondary/20 text-primary px-2 py-1 rounded-full ml-2 flex-shrink-0">
													{location.category}
												</span>
											</div>
											<p className="text-sm text-gray-600 mb-3 line-clamp-2">
												{location.description}
											</p>
											<div className="flex items-center justify-between">
												<span className="text-xs text-gray-500">
													Saved{" "}
													{new Date(location.savedDate).toLocaleDateString()}
												</span>
												<div className="flex gap-1">
													<Button variant="secondary" size="small">
														View
													</Button>
													<Button
														variant="icon"
														className="text-gray-400 hover:text-error"
													>
														<FiTrash2 size={14} />
													</Button>
												</div>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					)}

					{/* Quizzes Tab */}
					{activeTab === "quizzes" && (
						<div className="space-y-6">
							{/* Overall Stats */}
							<Card className="p-6">
								<h3 className="text-lg font-semibold text-dark mb-4">
									Quiz Performance Overview
								</h3>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">
											{getAverageScore()}%
										</div>
										<div className="text-sm text-gray-600">Average Score</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">
											{quizScores.reduce(
												(sum, quiz) => sum + quiz.totalQuizzes,
												0
											)}
										</div>
										<div className="text-sm text-gray-600">Total Quizzes</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">
											{Math.max(...quizScores.map((quiz) => quiz.bestStreak))}
										</div>
										<div className="text-sm text-gray-600">Best Streak</div>
									</div>
									<div className="text-center">
										<div className="text-3xl font-bold text-primary mb-1">
											{quizScores.filter((quiz) => quiz.score >= 90).length}
										</div>
										<div className="text-sm text-gray-600">90%+ Scores</div>
									</div>
								</div>
							</Card>

							{/* Category Breakdown */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{quizScores.map((quiz, index) => (
									<Card key={index} className="p-6">
										<div className="flex items-center justify-between mb-4">
											<h3 className="text-lg font-semibold text-dark">
												{quiz.category}
											</h3>
											<div className="flex items-center gap-2">
												<FiAward className="text-accent" size={20} />
												<span className="text-2xl font-bold text-primary">
													{quiz.score}%
												</span>
											</div>
										</div>

										<div className="space-y-3">
											<div className="flex justify-between text-sm">
												<span className="text-gray-600">Quizzes Completed</span>
												<span className="font-medium text-dark">
													{quiz.totalQuizzes}
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-gray-600">Best Streak</span>
												<span className="font-medium text-dark">
													{quiz.bestStreak} correct
												</span>
											</div>
											<div className="flex justify-between text-sm">
												<span className="text-gray-600">Last Played</span>
												<span className="font-medium text-dark">
													{quiz.lastPlayed}
												</span>
											</div>

											{/* Progress Bar */}
											<div className="w-full bg-gray-200 rounded-full h-2 mt-4">
												<div
													className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
													style={{ width: `${quiz.score}%` }}
												></div>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					)}

					{/* Settings Tab */}
					{activeTab === "settings" && (
						<div className="space-y-6">
							{/* Account Settings */}
							<Card className="p-6">
								<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
									<FiUser size={20} />
									Account Settings
								</h3>
								<div className="space-y-4">
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div>
											<label className="block text-sm font-medium text-dark mb-2">
												Display Name
											</label>
											<input
												type="text"
												value={profileData.name}
												onChange={(e) =>
													handleInputChange("name", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-dark mb-2">
												Email
											</label>
											<input
												type="email"
												value={profileData.email}
												onChange={(e) =>
													handleInputChange("email", e.target.value)
												}
												className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
											/>
										</div>
									</div>
								</div>
							</Card>

							{/* Notification Preferences */}
							<Card className="p-6">
								<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
									<FiBell size={20} />
									Notification Preferences
								</h3>
								<div className="space-y-4">
									{Object.entries(profileData.notifications).map(
										([key, value]) => (
											<div
												key={key}
												className="flex items-center justify-between py-2"
											>
												<div>
													<p className="font-medium text-dark">
														{key === "sms"
															? "SMS"
															: key.charAt(0).toUpperCase() + key.slice(1)}{" "}
														Notifications
													</p>
													<p className="text-sm text-gray-600">
														{key === "email" &&
															"Receive updates and stories via email"}
														{key === "push" &&
															"Get push notifications on your device"}
														{key === "sms" &&
															"Receive text messages for important updates"}
													</p>
												</div>
												<button
													onClick={() =>
														handleNestedInputChange(
															"notifications",
															key,
															!value
														)
													}
													className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
														value ? "bg-primary" : "bg-gray-300"
													}`}
												>
													<span
														className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
															value ? "translate-x-6" : "translate-x-1"
														}`}
													/>
												</button>
											</div>
										)
									)}
								</div>
							</Card>

							{/* Privacy Settings */}
							<Card className="p-6">
								<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
									<FiShield size={20} />
									Privacy & Security
								</h3>
								<div className="space-y-4">
									{Object.entries(profileData.privacy).map(([key, value]) => (
										<div
											key={key}
											className="flex items-center justify-between py-2"
										>
											<div>
												<p className="font-medium text-dark">
													{key === "profileVisible" && "Public Profile"}
													{key === "locationSharing" && "Location Sharing"}
													{key === "activityTracking" && "Activity Tracking"}
												</p>
												<p className="text-sm text-gray-600">
													{key === "profileVisible" &&
														"Allow others to find and view your profile"}
													{key === "locationSharing" &&
														"Share your location with other users"}
													{key === "activityTracking" &&
														"Track your activity for personalized recommendations"}
												</p>
											</div>
											<button
												onClick={() =>
													handleNestedInputChange("privacy", key, !value)
												}
												className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
													value ? "bg-primary" : "bg-gray-300"
												}`}
											>
												<span
													className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
														value ? "translate-x-6" : "translate-x-1"
													}`}
												/>
											</button>
										</div>
									))}
								</div>
							</Card>

							{/* Danger Zone */}
							<Card className="p-6 border-error/20">
								<h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
									<FiTrash2 size={20} className="text-error" />
									Danger Zone
								</h3>
								<div className="space-y-3">
									<Button
										variant="secondary"
										className="w-full justify-start hover:bg-gray-50"
									>
										<FiDownload size={16} className="mr-2" />
										Download My Data
									</Button>
									<Button
										variant="secondary"
										className="w-full justify-start text-error hover:bg-error/5 border-error/20"
									>
										<FiTrash2 size={16} className="mr-2" />
										Delete Account
									</Button>
								</div>
							</Card>
						</div>
					)}
				</div>
			</div>

			{/* Mobile Bottom Navigation */}
			<div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
				<div className="flex justify-around">
					{[
						{ href: "/explore", icon: FiGrid, label: "Explore" },
						{ href: "/location/tours", icon: FiMapPin, label: "Tours" },
						{ href: "/assistant", icon: FiUser, label: "Assistant" },
						{
							href: "/account",
							icon: FiSettings,
							label: "Account",
							active: true,
						},
					].map((item) => (
						<button
							key={item.href}
							className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
								item.active
									? "text-primary bg-primary/5"
									: "text-gray-500 hover:text-primary"
							}`}
						>
							<item.icon size={20} />
							<span className="text-xs mt-1">{item.label}</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";

interface Question {
	id: number;
	question: string;
	options: string[];
	correctAnswer: number;
	explanation: string;
	difficulty: "easy" | "medium" | "hard";
}

const quizQuestions: Question[] = [
	{
		id: 1,
		question:
			"Which ancient wonder of the world was located in Alexandria, Egypt?",
		options: [
			"The Colossus of Rhodes",
			"The Lighthouse of Alexandria",
			"The Hanging Gardens of Babylon",
			"The Temple of Artemis",
		],
		correctAnswer: 1,
		explanation:
			"The Lighthouse of Alexandria, also known as the Pharos of Alexandria, was one of the Seven Wonders of the Ancient World and guided ships safely to harbor for over 1,000 years.",
		difficulty: "medium",
	},
	{
		id: 2,
		question: "What is the highest mountain in Africa?",
		options: [
			"Mount Kenya",
			"Mount Stanley",
			"Mount Kilimanjaro",
			"Mount Elgon",
		],
		correctAnswer: 2,
		explanation:
			"Mount Kilimanjaro in Tanzania stands at 5,895 meters (19,341 feet) and is the highest peak in Africa. It's actually a stratovolcano with three cones.",
		difficulty: "easy",
	},
	{
		id: 3,
		question: "Which country has the most time zones?",
		options: ["United States", "Russia", "China", "France"],
		correctAnswer: 3,
		explanation:
			"France has the most time zones with 12, due to its overseas territories and departments scattered across the globe, including French Polynesia and New Caledonia.",
		difficulty: "hard",
	},
	{
		id: 4,
		question:
			"The ancient city of Petra is located in which modern-day country?",
		options: ["Syria", "Jordan", "Lebanon", "Israel"],
		correctAnswer: 1,
		explanation:
			"Petra, the famous archaeological site known for its rock-cut architecture, is located in southern Jordan. It was the capital city of the Nabataean Kingdom.",
		difficulty: "medium",
	},
	{
		id: 5,
		question: "Which European city is built on 14 islands?",
		options: ["Venice", "Amsterdam", "Stockholm", "Copenhagen"],
		correctAnswer: 2,
		explanation:
			"Stockholm, the capital of Sweden, is built on 14 islands connected by over 50 bridges, earning it the nickname 'Venice of the North'.",
		difficulty: "hard",
	},
];

export default function Quiz() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	const [score, setScore] = useState(0);
	const [quizCompleted, setQuizCompleted] = useState(false);
	const [answers, setAnswers] = useState<number[]>([]);

	// Timer functionality
	const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds per question
	const [timerActive, setTimerActive] = useState(true);
	const [questionStartTime, setQuestionStartTime] = useState(Date.now());
	const [timeTaken, setTimeTaken] = useState<number[]>([]);

	const handleTimeUp = useCallback(() => {
		const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
		setTimeTaken((prev) => [...prev, timeSpent]);
		setAnswers((prev) => [...prev, -1]); // -1 indicates no answer/timeout
		setShowExplanation(true);
		setTimerActive(false);
	}, [questionStartTime]);

	const resetTimer = () => {
		setTimeRemaining(30);
		setTimerActive(true);
		setQuestionStartTime(Date.now());
	};

	// Timer effect
	useEffect(() => {
		if (!timerActive || showExplanation || quizCompleted) return;

		const timer = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev <= 1) {
					// Time's up - auto-submit with no answer
					handleTimeUp();
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [timerActive, showExplanation, quizCompleted, handleTimeUp]);

	const handleAnswerSelect = (answerIndex: number) => {
		if (showExplanation) return;
		setSelectedAnswer(answerIndex);
	};

	const handleSubmitAnswer = () => {
		if (selectedAnswer === null) return;

		// Record time taken for this question
		const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
		setTimeTaken((prev) => [...prev, timeSpent]);

		const newAnswers = [...answers, selectedAnswer];
		setAnswers(newAnswers);

		if (selectedAnswer === quizQuestions[currentQuestion].correctAnswer) {
			setScore(score + 1);
		}
		setShowExplanation(true);
		setTimerActive(false);
	};

	const handleNextQuestion = () => {
		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
			setSelectedAnswer(null);
			setShowExplanation(false);
			resetTimer();
		} else {
			setQuizCompleted(true);
			setTimerActive(false);
			// Save quiz result to profile
			saveQuizResult();
		}
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setSelectedAnswer(null);
		setShowExplanation(false);
		setScore(0);
		setQuizCompleted(false);
		setAnswers([]);
		setTimeTaken([]);
		resetTimer();
	};

	// Profile integration functionality
	const saveQuizResult = () => {
		const result = {
			id: Date.now(),
			score,
			totalQuestions: quizQuestions.length,
			answers,
			timeTaken,
			completedAt: new Date().toISOString(),
			percentage: Math.round((score / quizQuestions.length) * 100),
			difficulty: "mixed" as const,
			category: "Travel Knowledge",
		};

		// Save to localStorage for now (can be enhanced with API later)
		try {
			const existingResults = JSON.parse(
				localStorage.getItem("quizResults") || "[]"
			);
			existingResults.push(result);
			localStorage.setItem("quizResults", JSON.stringify(existingResults));

			// Update user stats
			const userStats = JSON.parse(localStorage.getItem("userStats") || "{}");
			userStats.totalQuizzes = (userStats.totalQuizzes || 0) + 1;
			userStats.totalScore = (userStats.totalScore || 0) + score;
			userStats.averageScore = userStats.totalScore / userStats.totalQuizzes;
			userStats.bestScore = Math.max(userStats.bestScore || 0, score);
			userStats.lastQuizDate = new Date().toISOString();
			localStorage.setItem("userStats", JSON.stringify(userStats));
		} catch (error) {
			console.error("Failed to save quiz result:", error);
		}
	};

	const getUserStats = () => {
		try {
			return JSON.parse(localStorage.getItem("userStats") || "{}");
		} catch {
			return {};
		}
	};

	const getScoreMessage = () => {
		const percentage = (score / quizQuestions.length) * 100;
		if (percentage >= 80) return "Excellent! You're a true travel expert! 🌟";
		if (percentage >= 60)
			return "Great job! You know your way around the world! 🗺️";
		if (percentage >= 40) return "Not bad! Keep exploring and learning! ✈️";
		return "Keep discovering! Every journey teaches us something new! 🧭";
	};

	const getDifficultyColor = (difficulty: string) => {
		switch (difficulty) {
			case "easy":
				return "bg-green-100 text-green-800";
			case "medium":
				return "bg-accent/20 text-amber-800";
			case "hard":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	if (quizCompleted) {
		return (
			<div className="min-h-screen bg-stone-50">
				<div className="container mx-auto px-4 py-8">
					<div className="max-w-4xl mx-auto">
						<Card className="p-6 md:p-8 text-center">
							<div className="text-6xl mb-6">🎉</div>
							<h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
								Quiz Complete!
							</h1>
							<p className="font-sans text-xl text-gray-800 mb-6">
								You scored {score} out of {quizQuestions.length}
							</p>
							<div className="text-6xl mb-4">
								{score === quizQuestions.length
									? "💯"
									: score >= quizQuestions.length * 0.8
									? "🏆"
									: score >= quizQuestions.length * 0.6
									? "🥉"
									: "📚"}
							</div>
							<p className="font-sans text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
								{getScoreMessage()}
							</p>

							{/* User Stats Display */}
							{(() => {
								const stats = getUserStats();
								if (stats.totalQuizzes) {
									return (
										<div className="mb-8 max-w-2xl mx-auto">
											<div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
												<div className="text-center">
													<div className="text-2xl font-bold text-primary">
														{stats.totalQuizzes}
													</div>
													<div className="text-xs text-gray-600 font-sans">
														Total Quizzes
													</div>
												</div>
												<div className="text-center">
													<div className="text-2xl font-bold text-primary">
														{Math.round(stats.averageScore * 10) / 10}
													</div>
													<div className="text-xs text-gray-600 font-sans">
														Avg Score
													</div>
												</div>
												<div className="text-center">
													<div className="text-2xl font-bold text-primary">
														{stats.bestScore}
													</div>
													<div className="text-xs text-gray-600 font-sans">
														Best Score
													</div>
												</div>
												<div className="text-center">
													<div className="text-2xl font-bold text-primary">
														{Math.round(
															(stats.bestScore / quizQuestions.length) * 100
														)}
														%
													</div>
													<div className="text-xs text-gray-600 font-sans">
														Best %
													</div>
												</div>
											</div>
										</div>
									);
								}
								return null;
							})()}

							{/* Results Summary */}
							<div className="mb-8 max-w-2xl mx-auto">
								<h3 className="font-display text-xl font-semibold text-primary mb-4">
									Your Results
								</h3>
								<div className="space-y-3">
									{quizQuestions.map((question, index) => (
										<div
											key={question.id}
											className="flex items-center justify-between p-3 bg-white rounded-lg border"
										>
											<span className="font-sans text-sm text-gray-700 flex-1 text-left">
												Question {index + 1}
											</span>
											<span
												className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(
													question.difficulty
												)}`}
											>
												{question.difficulty}
											</span>
											<span className="ml-3 text-lg">
												{answers[index] === question.correctAnswer
													? "✅"
													: "❌"}
											</span>
										</div>
									))}
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<Button onClick={resetQuiz} className="px-8">
									Take Quiz Again
								</Button>
								<Button
									onClick={() => (window.location.href = "/explore")}
									variant="secondary"
									className="px-8"
								>
									Explore Destinations
								</Button>
							</div>
						</Card>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-stone-50">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
							Travel Knowledge Quiz
						</h1>
						<div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-600">
							<p className="font-sans">
								Question {currentQuestion + 1} of {quizQuestions.length}
							</p>
							<div className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full"></div>
							<p className="font-sans">
								Score: {score}/{currentQuestion + (showExplanation ? 1 : 0)}
							</p>
						</div>
					</div>

					{/* Progress Bar */}
					<div className="mb-8">
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
								style={{
									width: `${
										((currentQuestion + (showExplanation ? 1 : 0)) /
											quizQuestions.length) *
										100
									}%`,
								}}
							></div>
						</div>
					</div>

					{/* Timer */}
					{!quizCompleted && (
						<div className="mb-6 flex justify-center">
							<div
								className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
									timeRemaining <= 10
										? "border-red-500 bg-red-50 text-red-700 animate-pulse"
										: timeRemaining <= 20
										? "border-amber-500 bg-amber-50 text-amber-700"
										: "border-primary bg-primary/5 text-primary"
								}`}
							>
								<div className="flex items-center gap-2 font-mono font-semibold">
									<span className="text-lg">⏰</span>
									<span>{timeRemaining}s</span>
								</div>
							</div>
						</div>
					)}

					{/* Question Card */}
					<Card className="p-6 md:p-8 mb-6">
						<div className="flex items-center justify-between mb-6">
							<span
								className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
									quizQuestions[currentQuestion].difficulty
								)}`}
								aria-label={`Difficulty level: ${quizQuestions[currentQuestion].difficulty}`}
							>
								{quizQuestions[currentQuestion].difficulty}
							</span>
							<span className="text-4xl" role="img" aria-label="Globe emoji">
								🌍
							</span>
						</div>

						<h2
							id="current-question"
							className="font-display text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-relaxed"
							tabIndex={0}
						>
							{quizQuestions[currentQuestion].question}
						</h2>

						<div
							className="space-y-3 mb-8"
							role="radiogroup"
							aria-labelledby="current-question"
						>
							{quizQuestions[currentQuestion].options.map((option, index) => (
								<button
									key={index}
									onClick={() => handleAnswerSelect(index)}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleAnswerSelect(index);
										}
									}}
									disabled={showExplanation}
									role="radio"
									aria-checked={selectedAnswer === index}
									aria-label={`Option ${String.fromCharCode(
										65 + index
									)}: ${option}`}
									aria-describedby={
										showExplanation
											? `explanation-${currentQuestion}`
											: undefined
									}
									className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 font-sans focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
										selectedAnswer === index
											? showExplanation
												? index === quizQuestions[currentQuestion].correctAnswer
													? "border-green-500 bg-green-50 text-green-800"
													: "border-red-500 bg-red-50 text-red-800"
												: "border-primary bg-primary/5 text-primary"
											: showExplanation &&
											  index === quizQuestions[currentQuestion].correctAnswer
											? "border-green-500 bg-green-50 text-green-800"
											: "border-gray-200 hover:border-gray-300 text-gray-700"
									} ${
										showExplanation
											? "cursor-default"
											: "cursor-pointer hover:shadow-sm"
									}`}
								>
									<div className="flex items-center">
										<span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
											{String.fromCharCode(65 + index)}
										</span>
										<span>{option}</span>
										{showExplanation && (
											<span className="ml-auto">
												{index === quizQuestions[currentQuestion].correctAnswer
													? "✅"
													: selectedAnswer === index
													? "❌"
													: ""}
											</span>
										)}
									</div>
								</button>
							))}
						</div>

						{/* Explanation */}
						{showExplanation && (
							<div
								id={`explanation-${currentQuestion}`}
								className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6"
								role="region"
								aria-labelledby="explanation-heading"
								tabIndex={0}
							>
								<h3
									id="explanation-heading"
									className="font-display font-semibold text-blue-900 mb-2"
								>
									Explanation:
								</h3>
								<p className="font-sans text-blue-800 leading-relaxed">
									{quizQuestions[currentQuestion].explanation}
								</p>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex justify-center">
							{!showExplanation ? (
								<Button
									onClick={handleSubmitAnswer}
									disabled={selectedAnswer === null}
									className="px-8"
								>
									Submit Answer
								</Button>
							) : (
								<Button onClick={handleNextQuestion} className="px-8">
									{currentQuestion < quizQuestions.length - 1
										? "Next Question"
										: "View Results"}
								</Button>
							)}
						</div>
					</Card>

					{/* Quiz Info */}
					<Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
						<div className="text-center">
							<h3 className="font-display text-lg font-semibold text-primary mb-2">
								Test Your Travel Knowledge
							</h3>
							<p className="font-sans text-gray-600 text-sm">
								Discover fascinating facts about destinations, cultures, and
								geography from around the world. Each question comes with
								detailed explanations to enhance your learning experience.
							</p>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}

/* 
==============================================================================
FUTURE ENHANCEMENT NOTES - COMPREHENSIVE FEATURE ROADMAP
==============================================================================

🎯 TIMER & SCORING ENHANCEMENTS:
- Time-based bonus scoring (faster = more points)
- Difficulty-adjusted time limits (easy: 45s, medium: 30s, hard: 20s)
- Streak multipliers for consecutive correct answers
- Perfect completion bonuses (no timeouts)

🎮 GAMIFICATION FEATURES:
- Experience Points (XP) system with levels
- Achievement badges (e.g., "Speed Demon", "Perfect Score", "Geography Expert")
- Daily/weekly challenges with special rewards
- Streak counters and milestone celebrations
- Travel-themed ranks: Tourist → Explorer → Adventurer → Expert → Globe Master

📱 ENHANCED UI/UX:
- Question animations and transitions
- Sound effects for correct/incorrect answers
- Confetti animations for perfect scores
- Dark mode support with theme toggle
- Custom font size controls for accessibility
- Haptic feedback on mobile devices

🧠 ADAPTIVE LEARNING:
- Dynamic difficulty adjustment based on performance  
- Personalized question recommendations
- Weak area identification and targeted practice
- Learning path suggestions based on quiz performance
- Spaced repetition for missed questions

📊 ADVANCED ANALYTICS:
- Detailed performance dashboard with charts
- Progress tracking over time with trends
- Category-wise performance breakdown
- Time-to-answer analytics and improvement tracking
- Comparison with global averages

🌍 CONTENT EXPANSION:
- Multiple quiz categories:
  * Geography (capitals, landmarks, flags)
  * Culture & Customs (food, traditions, languages)
  * History & Architecture (monuments, civilizations)
  * Nature & Wildlife (national parks, animals, climate)
  * Adventure Sports (activities by region)
- Photo-based questions with image recognition
- Audio questions (language pronunciation, sounds)
- Video clip questions for cultural context

👥 SOCIAL & MULTIPLAYER:
- Real-time multiplayer quiz battles
- Create and join quiz rooms with friends
- Social sharing with custom result cards
- Friends leaderboard and challenges
- Team quiz mode for groups
- Quiz tournaments and competitions

🔧 TECHNICAL ENHANCEMENTS:
- Offline mode with sync when back online
- Progressive Web App (PWA) capabilities
- Push notifications for daily challenges
- Advanced caching for faster load times
- API integration for dynamic question loading
- Multi-language support with i18n

📚 STUDY & REFERENCE FEATURES:
- Study mode without time pressure
- Flashcard creation from quiz questions  
- Bookmark difficult questions for review
- Export quiz results to PDF
- Integration with travel planning tools
- Related destination information after each question

🎨 CUSTOMIZATION OPTIONS:
- Custom quiz themes and color schemes
- Personalized avatars and profiles
- Custom quiz creation tools for users
- Quiz difficulty preference settings
- Time limit customization options

🔐 USER MANAGEMENT:
- Full user authentication system
- Cloud sync for cross-device access
- Privacy settings for sharing preferences
- Data export and account management
- Parental controls for younger users

📈 ADVANCED FEATURES:
- AI-powered question generation
- Adaptive questioning based on travel interests
- Integration with travel booking platforms
- Virtual travel experiences as rewards
- AR features for location-based questions
- Machine learning for personalized content

🚀 PERFORMANCE OPTIMIZATIONS:
- Question preloading and caching
- Lazy loading for images and content
- Service worker for offline functionality
- CDN integration for global performance
- Database optimization for large question sets

==============================================================================
IMPLEMENTATION PRIORITY LEVELS:
==============================================================================

🟢 HIGH PRIORITY (Quick Wins):
- Timer improvements (bonus scoring)
- Basic achievement system
- Question categories
- Image-based questions
- Enhanced animations

🟡 MEDIUM PRIORITY (Moderate Effort):
- Multiplayer functionality
- Advanced analytics dashboard
- Study mode features
- Social sharing enhancements
- Offline capabilities

🔴 LOW PRIORITY (Complex Features):
- AI-powered content generation
- AR/VR integration  
- Advanced ML personalization
- Enterprise features
- Complex tournament systems

==============================================================================
*/

//TODO: I think after you took the quiz, it should display in your profile
//TODO: Potential for a leader board globally?
// Extra UI & tiny client-side helpers: save/share/leaderboard/suggestions
type QuizResult = {
	score: number;
	total: number;
	answers: number[];
	timestamp: string;
};

export function QuizExtras({
	score,
	total,
	answers,
}: {
	score: number;
	total: number;
	answers: number[];
}) {
	const [status, setStatus] = useState<string | null>(null);
	const [leaderboard, setLeaderboard] = useState<
		Array<{ name: string; score: number }>
	>([]);
	const [loadingBoard, setLoadingBoard] = useState(false);

	const saveResult = async () => {
		const result: QuizResult = {
			score,
			total,
			answers,
			timestamp: new Date().toISOString(),
		};

		// try local persistence first
		try {
			const existing = JSON.parse(
				localStorage.getItem("savedQuizResults") || "[]"
			);
			existing.push(result);
			localStorage.setItem("savedQuizResults", JSON.stringify(existing));
			setStatus("Saved locally to your browser.");
		} catch {
			setStatus("Failed to save locally.");
		}

		// attempt server save (no-op if no API)
		try {
			await fetch("/api/quiz/results", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(result),
			});
			setStatus("Saved to profile (if signed in).");
		} catch {
			// ignore server errors — local save still useful
		}
	};

	const shareResult = async () => {
		const text = `I scored ${score}/${total} on the Travel Knowledge Quiz! Try it out: ${location.origin}/quiz`;
		if (navigator.share) {
			try {
				await navigator.share({
					title: "Travel Quiz",
					text,
					url: `${location.origin}/quiz`,
				});
				setStatus("Shared via native share.");
				return;
			} catch {
				// fallthrough to copy
			}
		}
		try {
			await navigator.clipboard.writeText(text);
			setStatus("Result copied to clipboard.");
		} catch {
			setStatus(
				"Unable to share result. Copy this link: " + `${location.origin}/quiz`
			);
		}
	};

	const fetchLeaderboard = async () => {
		setLoadingBoard(true);
		setStatus(null);
		try {
			const res = await fetch("/api/leaderboard");
			if (!res.ok) throw new Error("no leaderboard");
			const data = (await res.json()) as Array<{ name: string; score: number }>;
			setLeaderboard(data.slice(0, 10));
		} catch {
			// fallback: build a tiny leaderboard from local saved results
			try {
				const saved = JSON.parse(
					localStorage.getItem("savedQuizResults") || "[]"
				) as QuizResult[];
				const aggregated = saved
					.map((r) => ({
						name: "You (local)",
						score: Math.round((r.score / r.total) * 100),
					}))
					.slice(-5)
					.reverse();
				setLeaderboard(aggregated);
				setStatus("Showing local leaderboard (no server data).");
			} catch {
				setStatus("No leaderboard available.");
			}
		} finally {
			setLoadingBoard(false);
		}
	};

	const recommended = (() => {
		// recommend up to 3 destinations based on answers that were correct
		try {
			const recs = quizQuestions
				.map((q, i) => ({ correct: q.options[q.correctAnswer], idx: i }))
				.filter((_, i) => answers[i] === quizQuestions[i].correctAnswer)
				.map((r) => r.correct);
			// unique and take 3
			return Array.from(new Set(recs)).slice(0, 3);
		} catch {
			return [];
		}
	})();

	return (
		<div className="mt-8 space-y-6">
			<div className="grid sm:grid-cols-3 gap-4">
				<button
					onClick={saveResult}
					className="px-4 py-3 bg-primary text-white rounded-md shadow-sm hover:opacity-95"
				>
					Save to Profile
				</button>

				<button
					onClick={shareResult}
					className="px-4 py-3 bg-secondary text-white rounded-md shadow-sm hover:opacity-95"
				>
					Share Result
				</button>

				<button
					onClick={fetchLeaderboard}
					className="px-4 py-3 border rounded-md shadow-sm hover:shadow-md"
					disabled={loadingBoard}
				>
					{loadingBoard ? "Loading..." : "View Leaderboard"}
				</button>
			</div>

			{status && (
				<div className="text-sm text-gray-700 bg-white p-3 rounded border">
					{status}
				</div>
			)}

			{recommended.length > 0 && (
				<div className="p-4 bg-white rounded border">
					<h4 className="font-display font-semibold text-primary mb-2">
						Destinations You Might Love
					</h4>
					<p className="text-sm text-gray-600 mb-3">
						Based on questions you answered well:
					</p>
					<ul className="list-disc list-inside space-y-1">
						{recommended.map((r, idx) => (
							<li key={idx} className="text-sm">
								{r}
							</li>
						))}
					</ul>
				</div>
			)}

			{leaderboard.length > 0 && (
				<div className="p-4 bg-white rounded border">
					<h4 className="font-display font-semibold text-primary mb-2">
						Leaderboard
					</h4>
					<ol className="space-y-2 text-sm">
						{leaderboard.map((entry, i) => (
							<li key={i} className="flex justify-between">
								<span>{entry.name}</span>
								<span className="font-mono">{entry.score}</span>
							</li>
						))}
					</ol>
				</div>
			)}
		</div>
	);
}

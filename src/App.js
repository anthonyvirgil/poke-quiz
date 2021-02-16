import './App.css';
import QuestionCard from './components/QuestionCard';
import { useState } from 'react';
import { createPokemonQuestions } from './pokeAPI';

const TOTAL_QUESTIONS = 10;

function App() {
	const [loading, setLoading] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [userAnswered, setUserAnswered] = useState(false);
	const [pokemonQuestions, setPokemonQuestions] = useState([]);

	const startQuiz = async () => {
		setLoading(true);
		const q = await createPokemonQuestions(TOTAL_QUESTIONS);
		setPokemonQuestions(q);
		setScore(0);
		setQuestionNumber(0);
		setUserAnswers([]);
		setUserAnswered(false);
		setLoading(false);
		setGameOver(false);
	};

	const checkAnswer = (event) => {
		const userAnswer = event.currentTarget.value;
		setUserAnswers([...userAnswers, userAnswer]);
		setUserAnswered(true);
		const correct =
			userAnswer === pokemonQuestions[questionNumber].answerPokemonName;
		if (correct) {
			setScore((prev) => prev + 1);
		}
		if (userAnswers + 1 === TOTAL_QUESTIONS) setGameOver(true);
	};

	const nextQuestion = () => {
		const nextQuestion = questionNumber + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		}
		setQuestionNumber(nextQuestion);
		setUserAnswered(false);
	};

	return (
		<>
			<div className="App text-white bg-gray-900 font-custom p-10 min-h-screen overflow-y-auto">
				<div className="flex flex-wrap justify-center items-center">
					<h1 className="text-3xl m-4 w-full">POKé QUIZ</h1>
					{!gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
						<p className="text-xl w-full">Score: {score}</p>
					)}
					{userAnswers.length === TOTAL_QUESTIONS && (
						<p className="text-xl w-full">
							Game Over! Your final score is {score}/{TOTAL_QUESTIONS}!
						</p>
					)}
					{(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
						<button
							className="w-44 mt-4 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800"
							onClick={startQuiz}
						>
							{userAnswers.length === TOTAL_QUESTIONS
								? 'Restart Quiz'
								: 'Start Quiz'}
						</button>
					)}
					{loading && (
						<p className="text-xl w-full mt-20">Loading Questions ... </p>
					)}
					{!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
						<QuestionCard
							answers={pokemonQuestions[questionNumber].answerArray}
							answerImage={pokemonQuestions[questionNumber].answerPokemonImage}
							actualAnswer={pokemonQuestions[questionNumber].answerPokemonName}
							questionNum={questionNumber + 1}
							totalQuestions={TOTAL_QUESTIONS}
							callback={checkAnswer}
							userAnswers={userAnswers}
							userAnswered={userAnswered}
						/>
					)}
					{!gameOver &&
						!loading &&
						userAnswers.length === questionNumber + 1 &&
						questionNumber !== TOTAL_QUESTIONS - 1 && (
							<button
								className="w-44 mt-2 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800"
								onClick={nextQuestion}
							>
								Next Question
							</button>
						)}
				</div>
			</div>
			<p className="w-full m-auto text-center text-white absolute bottom-2">
				Created by Anthony-Virgil Bermejo
			</p>
		</>
	);
}

export default App;

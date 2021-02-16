import './App.css';
import QuestionCard from './components/QuestionCard';
import { useState } from 'react';
import { fetchPokemonQuestion } from './pokeAPI';

const TOTAL_QUESTIONS = 20;

function App() {
	const [loading, setLoading] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [userAnswered, setUserAnswered] = useState(false);
	const [answerArray, setAnswerArray] = useState([]);
	const [answerPokemonImage, setAnswerPokemonImage] = useState(null);
	const [answerPokemonName, setAnswerPokemonName] = useState(null);

	const startQuiz = () => {
		setLoading(true);
		setPokemonQuestion();
		setScore(0);
		setQuestionNumber(0);
		setUserAnswers([]);
		setUserAnswered(false);
		setLoading(false);
		setGameOver(false);
	};

	const setPokemonQuestion = async () => {
		const question = await fetchPokemonQuestion();
		const { answerArray, answerPokemonName, answerPokemonImage } = question;
		setAnswerArray(answerArray);
		setAnswerPokemonImage(answerPokemonImage);
		setAnswerPokemonName(answerPokemonName);
	};

	const checkAnswer = (event) => {
		const userAnswer = event.currentTarget.value;
		setUserAnswers([...userAnswers, userAnswer]);
		setUserAnswered(true);
		const correct = userAnswer === answerPokemonName;
		if (correct) {
			setScore((prev) => prev + 1);
		}
		if (userAnswers + 1 === TOTAL_QUESTIONS) setGameOver(true);
	};

	const nextQuestion = () => {
		const nextQuestion = questionNumber + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setLoading(true);
			setPokemonQuestion();
			setLoading(false);
		}
		setQuestionNumber(nextQuestion);
		setUserAnswered(false);
	};

	return (
		<>
			<div className="App flex-col text-white bg-gray-900 font-custom p-5 min-h-screen overflow-y-auto justify-between">
				<div className="flex-grow-1">
					<h1 className="text-3xl m-4">POKé QUIZ</h1>
					{!gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
						<p className="text-xl">Score: {score}</p>
					)}
					{!gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
						<p className="text-xl p-4">
							Question: {questionNumber + 1} / {TOTAL_QUESTIONS}
						</p>
					)}
					{userAnswers.length === TOTAL_QUESTIONS && (
						<p className="text-xl">
							Game Over! Your final score is {score}/{questionNumber + 1}!
						</p>
					)}
					{(gameOver || userAnswers.length === TOTAL_QUESTIONS) && (
						<>
							<button
								className="w-44 mt-4 mr-1 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800"
								onClick={startQuiz}
							>
								{userAnswers.length === TOTAL_QUESTIONS
									? 'Restart Quiz'
									: 'Start Quiz'}
							</button>
						</>
					)}
					{loading && (
						<p className="text-xl w-full mt-20">Loading Questions ... </p>
					)}
					{!loading && !gameOver && userAnswers.length !== TOTAL_QUESTIONS && (
						<QuestionCard
							answers={answerArray}
							answerImage={answerPokemonImage}
							actualAnswer={answerPokemonName}
							questionNum={questionNumber + 1}
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
				<div className="mt-24">
					<p className="text-center text-white">
						API -{' '}
						<a href="https://pokeapi.co/" className="underline">
							PokéAPI
						</a>
					</p>
					<p className="text-center text-white">Created by @anthonyvirgil_</p>
				</div>
			</div>
		</>
	);
}

export default App;

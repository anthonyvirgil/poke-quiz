import './App.css';
import QuestionCard from './components/QuestionCard';
import Timer from './components/Timer';
import { useState } from 'react';
import { fetchPokemonQuestion } from './pokeAPI';

const quizTime = 60; // in seconds

function App() {
	const [loading, setLoading] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [firstGame, setFirstGame] = useState(true);
	const [userAnswered, setUserAnswered] = useState(false);
	const [answerArray, setAnswerArray] = useState([]);
	const [answerPokemonImage, setAnswerPokemonImage] = useState(null);
	const [answerPokemonName, setAnswerPokemonName] = useState(null);
	const [answerPokemonIndex, setAnswerPokemonIndex] = useState(null);

	const startQuiz = () => {
		setFirstGame(false);
		setLoading(true);
		setPokemonQuestion();
		setScore(0);
		setQuestionNumber(0);
		setUserAnswers([]);
		setUserAnswered(false);
		setLoading(false);
		setGameOver(false);
	};

	const setPokemonQuestion = () => {
		const question = fetchPokemonQuestion();
		const {
			answerArray,
			answerPokemonName,
			answerPokemonImage,
			answerPokemonIndex,
		} = question;
		setAnswerArray(answerArray);
		setAnswerPokemonImage(answerPokemonImage);
		setAnswerPokemonName(answerPokemonName);
		setAnswerPokemonIndex(answerPokemonIndex);
	};

	const checkAnswer = (event) => {
		const userAnswer = event.currentTarget.value;
		setUserAnswers([...userAnswers, userAnswer]);
		setUserAnswered(true);
		const correct = userAnswer === answerPokemonName;
		if (correct) {
			setScore((prev) => prev + 1);
		} else {
			if (score > highScore) setHighScore(score);
			setGameOver(true);
		}
	};

	const nextQuestion = () => {
		const nextQuestion = questionNumber + 1;
		setLoading(true);
		setPokemonQuestion();
		setLoading(false);
		setQuestionNumber(nextQuestion);
		setUserAnswered(false);
	};

	return (
		<>
			<div className="App flex flex-col text-white bg-gray-900 font-custom p-5 min-h-screen overflow-y-auto justify-between">
				<div className="">
					<h1 className="text-3xl m-4">POKé QUIZ</h1>
					{!gameOver && <p className="text-xl">Score: {score}</p>}
					{firstGame && (
						<p className="text-xl">
							Guess as many Pokémon as you can in 1 minute with no mistakes!
						</p>
					)}
					{gameOver && !firstGame && (
						<>
							<p className="mb-5 text-3xl">Game Over!</p>
							<div className="flex justify-center">
								<div className="mr-3">
									<p className="text-xl">Your Final Score Is</p>
									<p className="text-4xl">{score}</p>
								</div>
								<div className="ml-3">
									<p className="text-xl">Your High Score is </p>
									<p className="text-4xl">{highScore}</p>
								</div>
							</div>
						</>
					)}
					{gameOver && (
						<>
							<button
								className="w-44 mt-8 mr-1 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800"
								onClick={startQuiz}
							>
								{userAnswers.length !== 0 ? 'Restart Quiz' : 'Start Quiz'}
							</button>
						</>
					)}
					{!gameOver && <Timer seconds={quizTime} callback={setGameOver} />}
					{loading && (
						<p className="text-xl w-full mt-20">Loading Questions ... </p>
					)}
					{!loading && (
						<QuestionCard
							answers={answerArray}
							answerImage={answerPokemonImage}
							actualAnswer={answerPokemonName}
							questionNum={questionNumber + 1}
							callback={checkAnswer}
							userAnswers={userAnswers}
							userAnswered={userAnswered}
							pokemonIndex={answerPokemonIndex}
						/>
					)}
					{!gameOver && !loading && userAnswers.length === questionNumber + 1 && (
						<button
							className="w-44 mt-2 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800"
							onClick={nextQuestion}
						>
							Next Question
						</button>
					)}
				</div>
				<div className="mt-16 md:mt-0 text-center text-white">
					<p>
						<a
							className="underline"
							href="https://github.com/anthonyvirgil/poke-quiz/"
						>
							GitHub Repo Link
						</a>
					</p>
					<p>Created by @anthonyvirgil_</p>
				</div>
			</div>
		</>
	);
}

export default App;

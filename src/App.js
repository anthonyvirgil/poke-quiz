import './App.css';
import QuestionCard from './components/QuestionCard';
import Timer from './components/Timer';
import HighScoreForm from './components/HighScoreForm';
import HighScores from './components/HighScores';
import { useState, useEffect } from 'react';
import { fetchPokemonQuestion } from './pokeAPI';
import { useFireStore } from './hooks/useFirestore';

const QUIZ_TIME = 60; // in seconds
const MAX_NUM_HIGH_SCORES = 10;

function App() {
	const { docs } = useFireStore('highScores', MAX_NUM_HIGH_SCORES);
	const [loading, setLoading] = useState(false);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [lastHighScore, setLastHighScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [firstGame, setFirstGame] = useState(true);
	const [userAnswered, setUserAnswered] = useState(false);
	const [answerArray, setAnswerArray] = useState([]);
	const [answerPokemonImage, setAnswerPokemonImage] = useState(null);
	const [answerPokemonName, setAnswerPokemonName] = useState(null);
	const [answerPokemonIndex, setAnswerPokemonIndex] = useState(null);
	const [toggleHighScores, setToggleHighScores] = useState(false);
	const [toggleHighScoreForm, setToggleHighScoreForm] = useState(false);

	useEffect(() => {
		if (docs && docs.length > 0) {
			setLastHighScore(docs[docs.length - 1].highScore);
			setHighScore(docs[0].highScore);
		}
	}, [docs]);

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
		setToggleHighScores(false);
		setToggleHighScoreForm(false);
	};

	const onGameOver = (gameOver) => {
		setGameOver(gameOver);
		setUserAnswered(true);
		if (score >= lastHighScore) {
			setToggleHighScoreForm(true);
		}
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
			nextQuestion();
		} else {
			onGameOver(true);
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
					{firstGame && (
						<>
							<p className="text-xl">
								Guess as many Pokémon as you can in 1 minute with no mistakes!
							</p>
						</>
					)}
					{firstGame && !toggleHighScores && (
						<p className="text-xl mt-5">Top High Score: {highScore}</p>
					)}
					{gameOver && !firstGame && (
						<p className="mb-5 text-3xl">Game Over!</p>
					)}
					{!firstGame && (
						<div className="flex justify-center mb-5">
							<div className="mr-3">
								<p className="text-xl">Final Score</p>
								<p className="text-4xl">{score}</p>
							</div>
							<div className="ml-3">
								<p className="text-xl">Top High Score</p>
								<p className="text-4xl">
									{score > highScore ? score : highScore}
								</p>
							</div>
						</div>
					)}
					{gameOver &&
						!firstGame &&
						(score >= lastHighScore || toggleHighScoreForm) && (
							<HighScoreForm
								highScore={score}
								toggleHighScoreForm={setToggleHighScoreForm}
								setScore={setScore}
								setFirstGame={setFirstGame}
								numHighScores={MAX_NUM_HIGH_SCORES}
							/>
						)}
					{gameOver && toggleHighScores && (
						<HighScores
							numHighScores={MAX_NUM_HIGH_SCORES}
							setToggleHighScores={setToggleHighScores}
						/>
					)}
					{gameOver && (
						<>
							<button
								className="w-44 mt-8 mr-1 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800 focus:outline-none"
								onClick={startQuiz}
							>
								{firstGame ? 'Start Quiz' : 'Restart Quiz'}
							</button>
							{toggleHighScoreForm || score >= lastHighScore ? (
								''
							) : (
								<button
									className="w-44 mt-8 mr-1 py-3 px-9 bg-gray-700 border border-black rounded-xl hover:bg-gray-800 focus:outline-none"
									onClick={() => {
										setToggleHighScores(!toggleHighScores);
									}}
								>
									{toggleHighScores ? 'Close' : 'High Scores'}
								</button>
							)}
						</>
					)}
					{!gameOver && <Timer seconds={QUIZ_TIME} callback={onGameOver} />}
					{loading && (
						<p className="text-xl w-full mt-20">Loading Questions ... </p>
					)}
					{!firstGame &&
						!loading &&
						!toggleHighScores &&
						!toggleHighScoreForm && (
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
				</div>
				<div className="mt-5 md:mt-0 text-center text-white">
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

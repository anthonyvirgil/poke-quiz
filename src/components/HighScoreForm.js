import React, { useState } from 'react';
import HighScores from './HighScores';
import { projectFirestore } from '../firebase/config';

const HighScoreForm = ({
	highScore,
	toggleHighScoreForm,
	numHighScores,
	setFirstGame,
	setScore,
}) => {
	const [playerName, setPlayerName] = useState('');
	const [error, setError] = useState(null);

	// Handlers
	const handleSubmit = (e) => {
		e.preventDefault();
		// Add player + highscore to database
		if (playerName) {
			const collectionRef = projectFirestore.collection('highScores');
			collectionRef.add({ playerName, highScore });
			setPlayerName('');
			toggleHighScoreForm(false);
			setScore(0);
			setFirstGame(true);
		} else {
			setError('Please enter your name');
		}
	};

	return (
		<div className="mt-5 text-xl">
			<p>{error}</p>
			<p className="mb-5">Congratulations! You made the High Score board!</p>
			<HighScores numHighScores={numHighScores} />
			<p>Enter Your Name</p>
			<form onSubmit={handleSubmit}>
				<input
					type="input"
					value={playerName}
					onChange={(e) => {
						setPlayerName(e.target.value);
					}}
					className="text-black h-10 p-5 mt-2"
				/>
				{/* <button
					type="submit"
					className="py-1 bg-gray-700 shadow-xl focus:outline-none w-20 h-11  hover:bg-gray-800"
				>
					Add
				</button> */}
			</form>
		</div>
	);
};

export default HighScoreForm;

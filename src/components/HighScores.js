import React from 'react';
import { useFireStore } from '../hooks/useFirestore';

const HighScores = ({ numHighScores }) => {
	const { docs } = useFireStore('highScores', numHighScores);
	return (
		<div className="text-xl my-5">
			<h1 className="mb-3 text-2xl">High Scores</h1>
			{docs &&
				docs.map((doc) => (
					<div className="m-auto md:w-96 flex justify-between">
						<div className="text-center w-1/2">{doc.playerName}</div>
						<div className="text-center w-1/2">{doc.highScore}</div>
					</div>
				))}
			{!docs && <span>No High Scores</span>}
		</div>
	);
};

export default HighScores;

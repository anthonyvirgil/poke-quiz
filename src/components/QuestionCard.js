import React from 'react';

function QuestionCard({
	answers,
	answerImage,
	actualAnswer,
	questionNum,
	callback,
	userAnswers,
	userAnswered,
}) {
	return (
		<div className="w-full bg-gray-900 text-white">
			<img src={answerImage} alt="" className="mx-auto my-3 w-28 md:w-44"></img>
			<div className="w-full m-auto">
				<div className="w-full md:w-96 m-auto grid gap-2 grid-cols-2">
					{answers.map((answer, index) => (
						<button
							key={index}
							value={answer}
							disabled={userAnswered}
							onClick={(event) => {
								callback(event);
							}}
							className={`m-auto py-3 bg-gray-700 border shadow-xl border-black rounded-xl focus:outline-none w-32 hover:bg-gray-800 md:w-44 ${
								index % 2 === 0 ? 'mr-0' : 'ml-0'
							} ${
								userAnswered &&
								actualAnswer === answer &&
								'bg-green-600 hover:bg-green-600'
							} ${
								userAnswered &&
								userAnswers[questionNum - 1] === answer &&
								userAnswers[questionNum - 1] !== actualAnswer &&
								'bg-red-700 hover:bg-red-700'
							}`}
						>
							{answer}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

export default QuestionCard;

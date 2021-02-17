import { pokemonNames } from './pokemonNames';
const TOTAL_POKEMON_COUNT = 898;

export const createPokemonQuestions = (questionCount) => {
	let pokemonIndexes = [];
	for (let i = 0; i < questionCount; i++) {
		let question = fetchPokemonQuestion();
		pokemonIndexes.push(question);
	}
	return pokemonIndexes;
};

export const fetchPokemonQuestion = () => {
	const answerPokemonIndex = getRandomPokemonIndex();
	const getOtherPokemonIndexes = getRandomPokemonIndexes(answerPokemonIndex); // [2,5,120,720]

	const pokemonNameList = pokemonNames;
	const answerPokemonName = pokemonNameList[answerPokemonIndex - 1];
	const otherPokemonName = pokemonNameList[getOtherPokemonIndexes[0] - 1];
	const otherPokemonName2 = pokemonNameList[getOtherPokemonIndexes[1] - 1];
	const otherPokemonName3 = pokemonNameList[getOtherPokemonIndexes[2] - 1];

	const answerArray = [
		answerPokemonName,
		otherPokemonName,
		otherPokemonName2,
		otherPokemonName3,
	];

	const answerPokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${answerPokemonIndex}.png`;

	const question = {
		answerPokemonName: answerPokemonName,
		answerPokemonImage: answerPokemonImage,
		answerPokemonIndex: answerPokemonIndex,
		answerArray: shuffleArray(answerArray),
	};
	return question;
};

const getRandomPokemonIndexes = (answerPokemonIndex) => {
	let pokemonIndexes = [];

	for (let i = 0; i < 3; i++) {
		let uniqueIndex = false;
		do {
			const pokemonIndex = getRandomPokemonIndex();
			if (
				pokemonIndex !== answerPokemonIndex &&
				!pokemonIndexes.includes(pokemonIndex)
			) {
				pokemonIndexes.push(pokemonIndex);
				uniqueIndex = true;
			}
		} while (!uniqueIndex);
	}

	return pokemonIndexes;
};

// Returns 1 to 898 inclusive
const getRandomPokemonIndex = () => {
	const min = Math.ceil(1);
	const max = Math.floor(TOTAL_POKEMON_COUNT);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
	return [...array].sort(() => Math.random() - 0.5);
};

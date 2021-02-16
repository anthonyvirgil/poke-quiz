const TOTAL_POKEMON_COUNT = 898;

export const createPokemonQuestions = async (questionCount) => {
	let pokemonIndexes = [];
	for (let i = 0; i < questionCount; i++) {
		let q = await fetchPokemonQuestion();
		pokemonIndexes.push(q);
	}
	return pokemonIndexes;
};

export const fetchPokemonQuestion = async () => {
	const answerPokemonIndex = getRandomPokemonIndex();
	const getOtherPokemonIndexes = getRandomPokemon(answerPokemonIndex);
	const answerPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${answerPokemonIndex}`;
	const otherPokemonUrl = `https://pokeapi.co/api/v2/pokemon/${getOtherPokemonIndexes[0]}`;
	const otherPokemonUrl2 = `https://pokeapi.co/api/v2/pokemon/${getOtherPokemonIndexes[1]}`;
	const otherPokemonUrl3 = `https://pokeapi.co/api/v2/pokemon/${getOtherPokemonIndexes[2]}`;

	const answerPokemonData = await (await fetch(answerPokemonUrl)).json();
	const otherPokemonData = await (await fetch(otherPokemonUrl)).json();
	const otherPokemonData2 = await (await fetch(otherPokemonUrl2)).json();
	const otherPokemonData3 = await (await fetch(otherPokemonUrl3)).json();

	const answerArray = [
		capitalize(answerPokemonData.name),
		capitalize(otherPokemonData.name),
		capitalize(otherPokemonData2.name),
		capitalize(otherPokemonData3.name),
	];

	const question = {
		answerPokemonName: capitalize(answerPokemonData.name),
		answerPokemonImage: answerPokemonData.sprites.front_default,
		answerPokemonIndex: answerPokemonIndex,
		answerArray: shuffleArray(answerArray),
	};
	return question;
};

const getRandomPokemon = (answerPokemonIndex) => {
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

const getRandomPokemonIndex = () => {
	const min = Math.ceil(1);
	const max = Math.floor(TOTAL_POKEMON_COUNT);
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const shuffleArray = (array) => {
	return [...array].sort(() => Math.random() - 0.5);
};

const capitalize = (string) => {
	let name = string;
	if (string.indexOf('-') !== -1) {
		let subNames = string.split('-');
		for (let i = 0; i < subNames.length; i++) {
			subNames[i] = subNames[i].charAt(0).toUpperCase() + subNames[i].slice(1);
		}
		name = subNames.join('-');
	}
	return name.charAt(0).toUpperCase() + name.slice(1);
};

import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { wordleAnswersList } from "../wordLists";

interface SolutionState {
	exclude: string[];
	include: string[];
	letters: {
		[key: number]: {
			is: string | null;
			isnot: string[];
		};
	};
}

const WordleHelper: FC = () => {
	const [exclude, setExclude] = useState<string>("");
	const [include, setInclude] = useState<string>("");
	const [letters, setLetters] = useState<{
		[key: number]: { is: string | null; isnot: string };
	}>({
		1: { is: null, isnot: "" },
		2: { is: null, isnot: "" },
		3: { is: null, isnot: "" },
		4: { is: null, isnot: "" },
		5: { is: null, isnot: "" },
	});
	const [results, setResults] = useState<string[]>([]);

	const getPossibleWords = ({
		wordleAnswersList,
		solutionState,
	}: {
		wordleAnswersList: string[];
		solutionState: SolutionState;
	}) => {
		const { exclude, include, letters } = solutionState;

		const includesLetter = (word: string) =>
			include.every((letter) => word.includes(letter));
		const excludesLetter = (word: string) =>
			!exclude.some((letter) => word.includes(letter));

		const letterPatterns = Object.entries(letters).map(
			([position, { is, isnot }]) => {
				const pattern = new RegExp(
					`^.{${Number(position) - 1}}${
						is ? is : isnot.length > 0 ? `[^${isnot.join("")}]` : "."
					}.{${5 - Number(position)}}$`,
					"i"
				);
				return { pattern, position };
			}
		);

		const filteredWords = wordleAnswersList.filter((word) => {
			if (exclude.length && !excludesLetter(word)) return false;
			if (include.length && !includesLetter(word)) return false;
			return letterPatterns.every(({ pattern }) => pattern.test(word));
		});

		return filteredWords;
	};

	const handleSearch = () => {
		const solutionState: SolutionState = {
			exclude: exclude.split(""),
			include: include.split(""),
			letters: {
				1: { is: letters[1].is, isnot: letters[1].isnot.split("") },
				2: { is: letters[2].is, isnot: letters[2].isnot.split("") },
				3: { is: letters[3].is, isnot: letters[3].isnot.split("") },
				4: { is: letters[4].is, isnot: letters[4].isnot.split("") },
				5: { is: letters[5].is, isnot: letters[5].isnot.split("") },
			},
		};

		const possibleWords = getPossibleWords({
			wordleAnswersList,
			solutionState,
		});
		setResults(possibleWords);
	};

	const handleInputChange = (
		event: ChangeEvent<HTMLInputElement>,
		position: number,
		type: "is" | "isnot"
	) => {
		const value = event.target.value.toLowerCase();
		setLetters((prevLetters) => ({
			...prevLetters,
			[position]: {
				...prevLetters[position],
				[type]: value,
			},
		}));
	};

	useEffect(() => {
		const inputs = Array.from(document.querySelectorAll("input[type=text]"));
		inputs.forEach((input) =>
			input.addEventListener("input", (event) => {
				const target = event.target as HTMLInputElement;
				target.value = target.value.toLowerCase();
			})
		);
	}, []);

	return (
		<div className="container">
			<div className="form-container">
				<h1>Wordle Helper</h1>
				<div className="input-group">
					<label htmlFor="exclude">Exclude Letters</label>
					<input
						type="text"
						id="exclude"
						value={exclude}
						onChange={(e) => setExclude(e.target.value.toLowerCase())}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="include">Include Letters</label>
					<input
						type="text"
						id="include"
						value={include}
						onChange={(e) => setInclude(e.target.value.toLowerCase())}
					/>
				</div>
				{[1, 2, 3, 4, 5].map((position) => (
					<fieldset className="input-group" key={position}>
						<legend>Letter {position}</legend>
						<div className="input-row">
							<label htmlFor={`letters${position}`}>Is: </label>
							<input
								id={`letters${position}`}
								maxLength={1}
								onChange={(e) => handleInputChange(e, position, "is")}
								type="text"
								value={letters[position].is || ""}
							/>
						</div>
						<div className="input-row">
							<label htmlFor={`isnot${position}`}>Is Not: </label>
							<input
								id={`isnot${position}`}
								maxLength={25}
								onChange={(e) => handleInputChange(e, position, "isnot")}
								type="text"
								value={letters[position].isnot}
							/>
						</div>
					</fieldset>
				))}
				<button onClick={handleSearch}>Search</button>
			</div>
			<div className="results-container">
				<h2>
					Possible Words {results.length > 0 ? `(${results.length})` : ""}
				</h2>
				<div className="results">
					<ul id="results">
						{results.map((word, index) => (
							<li key={index}>{word}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default WordleHelper;

import "../assets/css/Character.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Character = ({ favCharacters, setFavCharacters }) => {
	const [character, setCharacter] = useState();
	const [isLoading, setIsLoading] = useState(true);

	const { characterId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://site--marvel-back--rmyq52z9hjqg.code.run/comics/${characterId}`
			);
			setCharacter(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div>
			<div>
				<img
					className="characterFond"
					src={`${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}`}
					alt=""
				/>
			</div>
			<div className="characterDescription">
				<div className="characterDescriptionText">
					<h2>{character.name}</h2>

					<p>{character.description}</p>
				</div>
			</div>
			<div className="characterDescriptionImg">
				<img
					src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
					alt=""
				/>
			</div>
			<div className="containerButtonFav">
				<button
					onClick={() => {
						const newFavoritesCharacters = [...favCharacters];
						const find = newFavoritesCharacters.find(
							(elem) =>
								elem.name === character.name &&
								elem.description === character.description
						);
						if (!find) {
							newFavoritesCharacters.push(character);
							setFavCharacters(newFavoritesCharacters);
							localStorage.setItem(
								"favCharacters",
								JSON.stringify(newFavoritesCharacters)
							);
							alert(`${character.name} à bien été ajouté à vos favoris.`);
						} else {
							alert(`${character.name} est déjà dans vos favoris.`);
						}
					}}
				>
					Ajouter aux Favoris
				</button>
			</div>
			<h1 className="titleSection">COMICS</h1>
			<section className="comicsCharacterPicture">
				{character &&
					character.comics.map((comic) => {
						const url = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;

						return (
							<div key={comic._id}>
								<img src={url} alt="" />
								<p>{comic.title}</p>
							</div>
						);
					})}
			</section>
		</div>
	);
};

export default Character;

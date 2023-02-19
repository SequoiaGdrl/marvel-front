import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ModalRemove from "../components/ModalRemove";

const Favorites = ({
	favComics,
	setFavComics,
	favCharacters,
	setFavCharacters,
}) => {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(false);
	const [description, setDescription] = useState("");
	const [deleted, setDeleted] = useState("");
	const [index, setIndex] = useState();
	console.log(deleted);
	return (
		<div>
			<ModalRemove
				visibleRemove={visible}
				description={description}
				setVisibleRemove={setVisible}
				favComics={favComics}
				setFavComics={setFavComics}
				favCharacters={favCharacters}
				setFavCharacters={setFavCharacters}
				index={index}
				deleted={deleted}
			/>
			<h1 className="titleSection">COMICS</h1>
			<section className="comicsPages">
				{favComics.map((comic, index) => {
					const url = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
					return (
						<div
							key={index}
							onClick={() => {
								setDeleted("comic");
								setDescription(comic.description);
								setVisible(!visible);
								setIndex(index);
							}}
						>
							<img src={url} alt="" />
							<p>{comic.title}</p>
						</div>
					);
				})}
			</section>
			<hr className="separator" />
			<h1 className="titleSection">CHARACTERS</h1>
			<section className="comicsPages">
				{favCharacters.map((character, index) => {
					const url = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
					return (
						<div
							key={index}
							onClick={() => {
								setDescription(character.description);
								setVisible(!visible);
								setIndex(index);
								setDeleted("character");
							}}
						>
							<img src={url} alt="" />
							<p>{character.name}</p>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default Favorites;

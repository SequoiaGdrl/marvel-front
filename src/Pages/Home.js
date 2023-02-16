import "../assets/css/Home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avengers from "../assets/img/avengers.jpg";

const Home = ({ comics, characters }) => {
	const navigate = useNavigate();
	return (
		<main>
			<img className="avengers" src={avengers} alt="" />
			<h1 className="titleSection">COMICS</h1>
			<section className="comicsPicture">
				{comics.map((comic) => {
					const url = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;

					return (
						<div key={comic._id}>
							<img src={url} alt="" />
							<p>{comic.title}</p>
						</div>
					);
				})}
			</section>
			<div className="containerButton">
				<button
					onClick={() => {
						navigate("/comics");
					}}
				>
					Voir plus
				</button>
			</div>
			<hr className="separator" />
			<h1 className="titleSection">CHARACTERS</h1>
			<section className="comicsPicture">
				{characters.map((character) => {
					const url = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`;

					return (
						<div key={character._id}>
							<img src={url} alt="" />
							<p>{character.name}</p>
						</div>
					);
				})}
			</section>
			<div className="containerButton">
				<button
					onClick={() => {
						navigate("/characters");
					}}
				>
					Voir plus
				</button>
			</div>
			<hr className="separator" />
		</main>
	);
};

export default Home;

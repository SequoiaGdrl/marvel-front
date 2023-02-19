import "../assets/css/Home.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import avengers from "../assets/img/avengers.jpg";
import { useState, useEffect } from "react";

import Modal from "../components/Modal";
import ModalRemove from "../components/ModalRemove";

const Home = ({ comics, characters, favComics, setFavComics }) => {
	const [visible, setVisible] = useState(false);
	const [visibleRemove, setvisibleRemove] = useState(false);
	const [description, setDescription] = useState("");
	const [comic, setComic] = useState();
	const [index, setIndex] = useState();
	const navigate = useNavigate();
	return (
		<main>
			<img className="avengers" src={avengers} alt="" />

			{/*----------------------------------COMICS----------------------------------*/}
			<h1 className="titleSection">COMICS</h1>
			<Modal
				visible={visible}
				setVisible={setVisible}
				comic={comic}
				favComics={favComics}
				setFavComics={setFavComics}
			/>
			<section className="comicsPicture">
				{comics.map((comic) => {
					const url = `${comic.thumbnail.path}/portrait_incredible.${comic.thumbnail.extension}`;

					return (
						<div
							key={comic._id}
							onClick={() => {
								setComic(comic);
								setVisible(!visible);
							}}
						>
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
			{/*----------------------------------COMICS----------------------------------*/}
			{/*----------------------------------CHARACTERS----------------------------------*/}
			<h1 className="titleSection">CHARACTERS</h1>
			<section className="comicsPicture">
				{characters.map((character) => {
					const url = `${character.thumbnail.path}/portrait_incredible.${character.thumbnail.extension}`;

					return (
						<div
							key={character._id}
							onClick={() => {
								navigate(`/character/${character._id}`);
							}}
						>
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
			<hr className="separatorLast" />
			{/*----------------------------------CHARACTERS----------------------------------*/}
		</main>
	);
};

export default Home;

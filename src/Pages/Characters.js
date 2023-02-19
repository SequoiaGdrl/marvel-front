import "../assets/css/Characters.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Characters = ({ favorites, setFavorites }) => {
	const navigate = useNavigate();
	const [characters, setCharacters] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [skip, setSkip] = useState(0);
	const [search, setSearch] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://site--marvel-back--rmyq52z9hjqg.code.run/characters"
			);

			setCharacters(response.data);
			console.log(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let filters = "";

			if (search !== "") {
				filters = `skip=${skip}&name=${search}`;
			} else {
				filters = `skip=${skip}`;
			}
			const response = await axios.get(
				`https://site--marvel-back--rmyq52z9hjqg.code.run/characters?${filters}`
			);
			setCharacters(response.data);
		};
		fetchData();
	}, [skip]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://site--marvel-back--rmyq52z9hjqg.code.run/characters?name=${search}`
			);
			setCharacters(response.data);
		};
		fetchData();
	}, [search]);

	return isLoading ? (
		<p>loading...</p>
	) : (
		<div style={{ marginTop: "10px" }}>
			<section className="sectionButton">
				<div className="searchBarPage">
					<div style={{ marginRight: 20 }}>
						<FontAwesomeIcon color="white" icon={faSearch} />
					</div>
					<div>
						<input
							placeholder="Search..."
							className="searchBarPageText"
							type="text"
							value={search}
							onChange={(event) => {
								setSearch(event.target.value);
							}}
						/>
					</div>
				</div>
				<div className="containerPageButton">
					{skip > 0 && (
						<button
							onClick={() => {
								setSkip(skip - 100);
							}}
						>
							Page Précedente
						</button>
					)}
					{characters.results.length > 0 && (
						<button
							onClick={() => {
								setSkip(skip + 100);
							}}
						>
							Page suivante
						</button>
					)}
				</div>
			</section>
			<section className="comicsPages">
				{characters &&
					characters.results.map((character) => {
						const url = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
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
		</div>
	);
};

export default Characters;

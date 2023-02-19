import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Comics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";

const Comics = ({ favComics, setFavComics }) => {
	const [comics, setComics] = useState();
	const [search, setSearch] = useState("");
	const [comic, setComic] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [skip, setSkip] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				"https://site--marvel-back--rmyq52z9hjqg.code.run/comics"
			);
			setComics(response.data);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			let filters = "";
			if (search !== "") {
				filters = `skip=${skip}&title=${search}`;
			} else {
				filters = `skip=${skip}`;
			}

			const response = await axios.get(
				`https://site--marvel-back--rmyq52z9hjqg.code.run/comics?${filters}`
			);
			setComics(response.data);
		};
		fetchData();
	}, [skip]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(
				`https://site--marvel-back--rmyq52z9hjqg.code.run/comics?title=${search}`
			);
			setComics(response.data);
		};
		fetchData();
	}, [search]);

	return isLoading ? (
		<p> loading... </p>
	) : (
		<div
			style={{
				marginTop: "10px",
			}}
		>
			<section className="sectionButton">
				<div className="searchBarPage">
					<div
						style={{
							marginRight: 20,
						}}
					>
						<FontAwesomeIcon color="white" icon={faSearch} />
					</div>
					<div>
						<input
							placeholder="Search..."
							className="searchBarPageText"
							value={search}
							type="text"
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
					<button
						onClick={() => {
							setSkip(skip + 100);
						}}
					>
						Page suivante
					</button>
				</div>
			</section>
			<Modal
				visible={visible}
				comic={comic}
				setVisible={setVisible}
				favComics={favComics}
				setFavComics={setFavComics}
			/>
			<section className="comicsPages">
				{comics &&
					comics.results
						.sort((a, b) => a - b)
						.map((comic) => {
							const url = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
							return (
								<div
									key={comic._id}
									onClick={() => {
										setComic(comic);
										setVisible(!visible);
									}}
								>
									<img src={url} alt="" />
									<p> {comic.title} </p>
								</div>
							);
						})}
			</section>
		</div>
	);
};

export default Comics;

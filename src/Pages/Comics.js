import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Comics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Comics = () => {
	const [comics, setComics] = useState();
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [skip, setSkip] = useState(0);
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
							className="searchBarText"
							type="text"
						/>
					</div>
				</div>
				<div className="containerButton">
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
				<div className="searchBarPage">
					<div style={{ marginRight: 20 }}>
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
			</section>
			<section className="comicsPages">
				{comics &&
					comics.results.map((comic) => {
						const url = `${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`;
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

export default Comics;

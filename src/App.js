import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";

import Footer from "./components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Comics from "./Pages/Comics";
import Home from "./Pages/Home";
import Characters from "./Pages/Characters";
import Character from "./Pages/Character";
import Favorites from "./Pages/Favorites";
function App() {
	const [comics, setComics] = useState();
	const [characters, setCharacters] = useState();
	const [favComics, setFavComics] = useState(
		JSON.parse(localStorage.getItem("favComics")) || []
	);
	const [favCharacters, setFavCharacters] = useState(
		JSON.parse(localStorage.getItem("favCharacters")) || []
	);

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"https://site--marvel-back--rmyq52z9hjqg.code.run/comics?limit=7"
				);

				setComics(response.data);

				const response2 = await axios.get(
					"https://site--marvel-back--rmyq52z9hjqg.code.run/characters?limit=7"
				);

				setCharacters(response2.data);

				setIsLoading(false);
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchData();
	}, []);
	return isLoading ? (
		<p>loading...</p>
	) : (
		<Router>
			<div className="body">
				<Header />
				<Routes>
					<Route
						path="/"
						element={
							<Home
								comics={comics.results}
								characters={characters.results}
								favComics={favComics}
								setFavComics={setFavComics}
							/>
						}
					/>
					<Route
						path="/comics"
						element={
							<Comics favComics={favComics} setFavComics={setFavComics} />
						}
					/>
					<Route path="/characters" element={<Characters />} />
					<Route
						path="/character/:characterId"
						element={
							<Character
								favCharacters={favCharacters}
								setFavCharacters={setFavCharacters}
							/>
						}
					/>
					<Route
						path="/favorites"
						element={
							<Favorites
								favComics={favComics}
								setFavComics={setFavComics}
								favCharacters={favCharacters}
								setFavCharacters={setFavCharacters}
							/>
						}
					/>
				</Routes>

				<Footer />
			</div>
		</Router>
	);
}

export default App;

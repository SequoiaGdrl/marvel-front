import "./assets/css/App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";

import Footer from "./components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import Comics from "./Pages/Comics";
import Home from "./Pages/Home";
import Characters from "./Pages/Characters";

function App() {
	const [comics, setComics] = useState();
	const [characters, setCharacters] = useState();
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
							<Home comics={comics.results} characters={characters.results} />
						}
					/>
					<Route path="/comics" element={<Comics />} />
					<Route path="/characters" element={<Characters />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;

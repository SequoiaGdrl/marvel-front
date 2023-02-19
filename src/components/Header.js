import "../assets/css/Header.css";
import { useState, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/img/logoSignIN.png";
const Header = () => {
	const navigate = useNavigate();
	return (
		<header>
			<section className="containerHeader">
				<div className="container1">
					<div className="buttonSignIn">
						<img
							style={{ width: 30, height: 25, marginRight: 7 }}
							src={logo}
							alt=""
						/>
						<button>SIGN IN | JOIN</button>
					</div>

					<div>
						<img
							onClick={() => navigate("/")}
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png"
							alt=""
						/>
					</div>

					<div className="searchBar">
						<div>
							<p style={{ color: "white", fontSize: 15, fontStyle: "italic" }}>
								Bienvenue sur mon site{" "}
								<span style={{ fontWeight: "800" }}>Avengers!</span>
							</p>
						</div>
					</div>
				</div>
			</section>
			<section className="containerHeader">
				<div className="container2">
					<button
						className="buttonNav"
						onClick={() => {
							navigate("/comics");
						}}
					>
						COMICS
					</button>
					<button
						className="buttonNav"
						onClick={() => {
							navigate("/characters");
						}}
					>
						CHARACTERS
					</button>
					<button
						className="buttonNav"
						onClick={() => {
							navigate("/favorites");
						}}
					>
						FAVORITES
					</button>
				</div>
			</section>
			<div></div>
		</header>
	);
};

export default Header;

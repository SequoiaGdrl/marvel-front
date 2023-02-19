import "../assets/css/Modal.css";

const ModalRemove = ({
	visibleRemove,
	description,
	setVisibleRemove,
	favComics,
	setFavComics,
	favCharacters,
	setFavCharacters,
	deleted,
	index,
}) => {
	return (
		visibleRemove && (
			<div className="modal">
				<div className="modal-content">
					<p className="description"> Description: </p> <p> {description} </p>
					<div className="containerButton">
						<button
							onClick={() => {
								setVisibleRemove(!visibleRemove);
							}}
						>
							Fermer
						</button>
						<button
							onClick={() => {
								if (deleted === "comic") {
									const newFavorites = [...favComics];
									newFavorites.splice(index, 1);
									setFavComics(newFavorites);
									localStorage.setItem(
										"favComics",
										JSON.stringify(newFavorites)
									);
								} else if (deleted === "character") {
									const newFavorites = [...favCharacters];
									newFavorites.splice(index, 1);
									setFavCharacters(newFavorites);
									localStorage.setItem(
										"favCharacters",
										JSON.stringify(newFavorites)
									);
								}
								setVisibleRemove(!visibleRemove);
							}}
						>
							Retirer des Favoris
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default ModalRemove;

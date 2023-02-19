import "../assets/css/Modal.css";

const Modal = ({ visible, comic, setVisible, favComics, setFavComics }) => {
	return (
		visible && (
			<div className="modal">
				<div className="modal-content">
					<p className="description"> Description: </p>
					<p> {comic.description} </p>
					<div className="containerButton">
						<button
							onClick={() => {
								setVisible(!visible);
							}}
						>
							Fermer
						</button>
						<button
							onClick={() => {
								const newFavorites = [...favComics];
								const find = newFavorites.find(
									(elem) =>
										elem.title === comic.title &&
										elem.description === comic.description
								);
								if (!find) {
									newFavorites.push(comic);
									setFavComics(newFavorites);
									localStorage.setItem(
										"favComics",
										JSON.stringify(newFavorites)
									);
									setVisible(!visible);
									alert(`${comic.title} à bien été ajouté à vos favoris.`);
								} else {
									alert(`${comic.title} est déjà dans vos favoris.`);
								}
							}}
						>
							Ajouter aux Favoris
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default Modal;

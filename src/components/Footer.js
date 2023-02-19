import "../assets/css/Footer.css";
import letterLogo from "../assets/img/logoSignature.png";

const Footer = () => {
	return (
		<footer>
			<img className="imgSignature" src={letterLogo} alt="" />
			<p className="signature"> By Séquoia Gendrel © 2023</p>
		</footer>
	);
};

export default Footer;

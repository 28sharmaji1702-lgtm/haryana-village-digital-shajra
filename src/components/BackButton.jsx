import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import "../styles/BackButton.css";

function BackButton() {

    const navigate = useNavigate();
    const location = useLocation();

    if (location.pathname === "/") return null;

    return (
        <button
            className="global-back-btn"
            onClick={() => {
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate("/");
                }
            }}
        >
            <FaArrowLeft />
        </button>
    );

}

export default BackButton;
import React from "react";

function ImagePopup(props) {
    return (
        <div
            className={`popup popup-img ${Object.keys(props.card).length !== 0 ? "popup_opened" : ""}`}
            id="popup-img">
            <div
                className="popup__content">  
                <button
                    className="popup__close-button popup__close-button_img"
                    type="button"
                    name="img"
                    onClick={props.onClose}></button>
                <img
                    src={props.card ? props.card.link : " "}
                    className="popup__img"
                    alt={props.card.name} />
                <p
                    className="popup__place">{props.card.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;

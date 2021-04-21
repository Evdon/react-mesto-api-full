import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner === currentUser._id;
    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : 'element__delete-button_hidden'}`
    );

    const isLiked = props.card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : 'element__like-button_disable'}`
    );

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleClick() {
        props.onCardClick(props.card);
      }

    return (
            <div
                className="element"
            >
                <button
                    className={cardDeleteButtonClassName}
                    type="button"
                    onClick={handleDeleteClick}
                ></button>
                <img
                    src={props.card.link}
                    className="element__img"
                    alt={props.card.name}
                    name="img"
                    onClick={handleClick}
                />
                <div
                    className="element__info-section"
                >
                    <p
                        className="element__description"
                    >{props.card.name}</p>
                    <div
                        className="element__like-container"
                    >
                        <button
                            className={cardLikeButtonClassName}
                            type="button"
                            onClick={handleLikeClick}
                        ></button>
                        <span
                            className="element__likes-count"
                        >{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
   );
}




export default Card;

import React from 'react';
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
            <main
                className="content">
                <section
                    className="profile">
                    <div
                        className="profile__info-container">
                        <section
                            className="profile__avatar-section">
                            <button
                                className="profile__avatar-button"
                                type="button"
                                name="edit"
                                onClick={props.onEditAvatar}></button>
                            <img src={currentUser.avatar} className="profile__avatar" alt="Аватар" />
                        </section>
                        <div
                            className="profile__info">
                            <div
                                className="profile__name-container">
                                <h1
                                    className="profile__name"
                                    id="name">{currentUser.name}</h1>
                                <button
                                    className="profile__edit-button"
                                    type="button"
                                    name="edit"
                                    onClick={props.onEditProfile}></button>
                            </div>
                            <p
                                className="profile__about"
                                id='about'>{currentUser.about}</p>
                        </div>
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        name="add"
                        onClick={props.onAddPlace}></button>
                </section>
                <section
                    className="elements"
                >
                    {props.cards.map((card) => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={props.onCardClick}
                                onCardLike={props.onCardLike}
                                onCardDelete={props.onCardDelete}
                            />
                        );
                    })}
                </section>
            </main>
   );
}



export default Main;

import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function AddPlacePopup(props) {
    const buttonText = "Создать";
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    function handlePlaceNameAdd(evt) {
        setPlaceName(evt.target.value)
    }

    function handlePlaceLinkAdd(evt) {
        setPlaceLink(evt.target.value)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink
        })
    }

    return (
        <PopupWithForm
            name="add"
            title="Новое место"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={placeName || ''}
                onChange={handlePlaceNameAdd}
                type="text"
                className="popup__input popup__input_type_place"
                id="place-input"
                name="name"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required 
            />
            <span
                className="popup__input-error"
                id="place-input-error"
            ></span>
            <input
                value={placeLink || ''}
                onChange={handlePlaceLinkAdd}
                type="url"
                className="popup__input popup__input_type_link"
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required 
            />
            <span
                className="popup__input-error"
                id="link-input-error"
            ></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
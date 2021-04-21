import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
    const buttonText = "Сохранить";
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const currentUser = useContext(CurrentUserContext);

      React.useEffect(() => {
          setName(currentUser.name);
          setDescription(currentUser.about);
        }, [currentUser]);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt){
        setDescription(evt.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={name || ""}
                onChange={handleNameChange}
                type="text"
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
            />
            <span
                className="popup__input-error"
                id="name-input-error"
            ></span>
            <input
                value={description || ""}
                onChange={handleDescriptionChange}
                type="text"
                className="popup__input popup__input_type_about"
                id="about-input"
                name="about"
                placeholder="Род занятий"
                minLength="2"
                maxLength="200"
                required
            />
            <span
                className="popup__input-error"
                id="about-input-error"
            ></span>
         </PopupWithForm>
    );
}

export default EditProfilePopup;

import PopupWithForm from "./PopupWithForm.js";
import React from "react";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();
    const buttonText = "Сохранить";

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
      } 

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            submitText={buttonText}
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={avatarRef}
                type="url"
                className="popup__input popup__input_type_avatar" 
                id="avatar-input"
                name="avatar"
                placeholder="Ссылка на картинку"
                required 
            />
            <span 
                className="popup__input-error"
                id="avatar-input-error"
            ></span>
        </PopupWithForm>
  );
}

export default EditAvatarPopup;
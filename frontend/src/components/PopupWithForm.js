import React from "react";

function PopupWithForm(props) {
  return (
    <div 
        className={`popup popup-${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
        <div 
            className="popup__container"
        >
            <form 
                className={`popup__form popup__form_type_${props.name}`}
                name={props.name}
                onSubmit={props.onSubmit}
                noValidate
            >
                <fieldset 
                    className="popup__fieldset"
                >  
                    <button
                        className={`popup__close-button popup__close-button_${props.name}`}
                        onClick={props.onClose}
                        type="button"
                    ></button>                        
                    <h2 className="popup__title">{props.title}</h2>
                        {props.children}
                    <button
                        className={`popup__submit-button popup__submit-button_type_${props.name}`}
                        type="submit"
                    >{props.submitText}</button>
                </fieldset>
            </form>    
        </div>
    </div>
  );
}

export default PopupWithForm;
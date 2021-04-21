import React from "react";
import imgFail from"../images/fail.png";
import imgSuccess from"../images/success.png";

function InfoTooltip(props) {
    const imgAccess = props.isSuccessReg ? imgSuccess : imgFail;
    const popupTitle = props.isSuccessReg ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз.";
    
    return(
        <div className={`popup popup__infoTooltip ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    className={`popup__close-button popup__close-button_${props.name}`}
                    onClick={props.onClose}
                    type="button"
                ></button>
                <img src={imgAccess} className="popup__img_infoTooltip" alt='Картинка доступа'/>
                <h2 className="popup__title">{popupTitle}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
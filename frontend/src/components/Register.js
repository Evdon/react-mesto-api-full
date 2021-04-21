import React from "react";
import { withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register(props) {
    function handleSubmit(password, email) {
        props.onRegister(password, email);
    }

    return (
        <AuthForm
            title="Регистрация"
            buttontxt="Зарегистрироваться"
            onSubmit={handleSubmit}
            link={true}
        />
    );
}

export default withRouter(Register);
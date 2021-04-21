import React from "react";
import { withRouter } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login(props) {
    function handleSubmit(password, email) {
        props.onLogin(password, email);
    }

    return (
        <AuthForm
            title="Вход"
            buttontxt="Войти"
            onSubmit={handleSubmit}
            isClearInput={props.isClearInput}
            link={false}
        />
    );
}

export default withRouter(Login);
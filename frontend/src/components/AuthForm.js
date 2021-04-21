import React from "react";
import { Link } from "react-router-dom";

function AuthForm(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(password, email);
    }

    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }

    function handleEmailChange(evt){
        setEmail(evt.target.value);
    }

    return (
        <section className="authForm">
            <h2 className="authForm__title">{props.title}</h2>
            <form 
                className="authForm__form"
                onSubmit={handleSubmit}
            >
                <label className="authForm__field">
                    <input
                        required
                        placeholder="Email"
                        className="authForm__input authForm__input_type_email"
                        id="email"
                        type="email"
                        name="email"
                        minLength="2"
                        maxLength="40"
                        value={email || ""}
                        onChange={handleEmailChange}
                    />
                    <span className="authForm__input-error" id="name-input-error"></span>
                </label>
                <label className="authForm__field">
                    <input
                        required
                        placeholder="пароль"
                        className="authForm__input authForm__input_type_password"
                        type="password"
                        name="password"
                        id="password"
                        minLength="2"
                        maxLength="40"
                        value={password || ""}
                        onChange={handlePasswordChange}
                    />
                    <span className="authForm__input-error" id="password-input-error"></span>
                </label>
                <button className="authForm__submit-button" type="submit">
                    {props.buttontxt}
                </button>
            </form>
                <p  className={props.link ? "authForm__signin" : "authForm__signin_disabled"}>
                    Уже зарегистрированы?
                    <Link to="sign-in" className="authForm__signin-link">
                        Войти
                    </Link>
                </p>
        </section>
    );
}

export default AuthForm;
import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";

import "../../styles/form/formError.css";

export default function ConnexionPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [touched, setTouched] = useState<{ login: boolean; password: boolean }>(
    { login: false, password: false },
  );

  const navigate = useNavigate();

  const isLoginEmpty = login.trim() === "";
  const isPasswordEmpty = password.trim() === "";

  const hasError = isLoginEmpty || isPasswordEmpty;

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");
    setTouched({ login: true, password: true });

    if (hasError) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
          isActive: false,
        }),
      });

      if (res.ok) {
        navigate("/homePage");
        return;
      }

      if (res.status === 401 || res.status === 403) {
        setErrorMessage("Login ou mot de passe incorrect");
        return;
      }

      setErrorMessage("Une erreur est survenue lors de la connexion");
    } catch (error) {
      setErrorMessage("Impossible de contacter le serveur");
    }
  }

  function handleClear() {
    setLogin("");
    setPassword("");
    setErrorMessage("");
  }

  return (
    <form className="formStyle3" onSubmit={handleSubmit}>
      <h1 className="titleFormStyle">Connexion</h1>

      <div className="inputsFormContainerStyle">
        <InputContainer
          inputLabelStyle={InputLabelStyle.style1}
          inputItemStyle={InputItemStyle.style1}
          labelName="Votre login"
          htmlFor="login"
          type="text"
          onChange={(e) => setLogin(e.target.value)}
          onBlur={() => setTouched((s) => ({ ...s, login: true }))}
          hasError={touched.login && isLoginEmpty}
        />

        <div className="errorSlot">
          {touched.login && isLoginEmpty && (
            <p className="formErrorMessageStyle">
              Merci de renseigner votre login
            </p>
          )}
        </div>

        <InputContainer
          inputLabelStyle={InputLabelStyle.style1}
          inputItemStyle={InputItemStyle.style1}
          labelName="Votre mot de passe"
          htmlFor="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((s) => ({ ...s, password: true }))}
          hasError={touched.password && isPasswordEmpty}
        />

        <div className="errorSlot">
          {touched.password && isPasswordEmpty && (
            <p className="formErrorMessageStyle">
              Merci de renseigner votre mot de passe
            </p>
          )}
        </div>

        <div className="errorSlot">
          {errorMessage && (
            <p className="formErrorMessageStyle">{errorMessage}</p>
          )}
        </div>

        <div className="buttonsContainerStyle">
          <NextButton
            type="submit"
            styleClassName="btnStyle10"
            mainClassName="SubmitBtn_AccountCreation"
            text="Valider"
          />
          <NextButton
            type="button"
            styleClassName="btnStyle11"
            mainClassName="SubmitBtn_AccountCreation"
            text="Effacer"
            onClick={handleClear}
          />
        </div>
      </div>
    </form>
  );
}
import InputContainer, { InputLabelStyle, InputItemStyle } from "../../components/InputContainer/InputContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";

export default function ConnexionPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    if (!login.trim() || !password.trim()) {
      setErrorMessage("Veuillez remplir tous les champs.");
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
        setErrorMessage("Login ou mot de passe incorrect.");
        return;
      }

      setErrorMessage("Une erreur est survenue lors de la connexion.");
    } catch (error) {
      setErrorMessage("Impossible de contacter le serveur.");
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
        />

        <InputContainer
          inputLabelStyle={InputLabelStyle.style1}
          inputItemStyle={InputItemStyle.style1}
          labelName="Votre mot de passe"
          htmlFor="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

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
import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
import "../../styles/form/inputsFormContainerStyle.css";
import "../../components/Button/NextButton/buttonsContainerStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/formError.css";

import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useToastStore } from "../../store/toastStore";

export default function AccountCreation() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [touched, setTouched] = useState<{
    login: boolean;
    email: boolean;
    password: boolean;
    passwordConfirmation: boolean;
  }>({
    login: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  });

  const [serverFieldErrors, setServerFieldErrors] = useState<{
    login: string;
    email: string;
  }>({
    login: "",
    email: "",
  });

  const showToast = useToastStore((state) => state.showToast);

  const isLoginEmpty = login.trim() === "";
  const isEmailEmpty = email.trim() === "";
  const isPasswordEmpty = password.trim() === "";
  const isPasswordConfirmationEmpty = passwordConfirmation.trim() === "";
  const passwordsMatch = password === passwordConfirmation;

  const hasClientError =
    isLoginEmpty ||
    isEmailEmpty ||
    isPasswordEmpty ||
    isPasswordConfirmationEmpty ||
    !passwordsMatch;

  function clearLoginError() {
    setServerFieldErrors((previousErrors) => ({
      ...previousErrors,
      login: "",
    }));
  }

  function clearEmailError() {
    setServerFieldErrors((previousErrors) => ({
      ...previousErrors,
      email: "",
    }));
  }
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setServerFieldErrors({
      login: "",
      email: "",
    });

    setTouched({
      login: true,
      email: true,
      password: true,
      passwordConfirmation: true,
    });

    if (hasClientError) {
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          email,
          password,
          isActive: false,
        }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        if (responseData.error === "LOGIN_ALREADY_USED") {
          setServerFieldErrors({
            login: responseData.message,
            email: "",
          });

          setTouched((previousTouched) => ({
            ...previousTouched,
            login: true,
          }));

          return;
        }

        if (responseData.error === "EMAIL_ALREADY_USED") {
          setServerFieldErrors({
            login: "",
            email: responseData.message,
          });

          setTouched((previousTouched) => ({
            ...previousTouched,
            email: true,
          }));

          return;
        }

        showToast(
          responseData.message ||
            "Une erreur est survenue lors de la création du compte.",
          "error",
        );

        return;
      }

      if (res.status === 201) {
        showToast("Création de compte réussie !", "success");
        navigate("/projectCreation");
      }
    } catch {
      showToast("Impossible de contacter le serveur.", "error");
    }
  }

  function handleClear() {
    setLogin("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    setServerFieldErrors({
      login: "",
      email: "",
    });

    setTouched({
      login: false,
      email: false,
      password: false,
      passwordConfirmation: false,
    });
  }

  return (
    <>
      {!isAuthenticated && (
        <form className="formStyle3" onSubmit={handleSubmit}>
          <h1 className="titleFormStyle">CREATION DE COMPTE</h1>

          <div className="inputsFormContainerStyle">
            <InputContainer
              inputLabelStyle={InputLabelStyle.style1}
              inputItemStyle={InputItemStyle.style1}
              labelName="Votre login de connexion"
              htmlFor="login"
              type="text"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                clearLoginError();
              }}
              onBlur={() => setTouched((s) => ({ ...s, login: true }))}
              hasError={
                (touched.login && isLoginEmpty) ||
                serverFieldErrors.login !== ""
              }
            />

            <div className="errorSlot">
              {touched.login && isLoginEmpty && (
                <p className="formErrorMessageStyle">
                  Merci de renseigner votre login
                </p>
              )}
              {serverFieldErrors.login && (
                <p className="formErrorMessageStyle">
                  {serverFieldErrors.login}
                </p>
              )}
            </div>

            <InputContainer
              inputLabelStyle={InputLabelStyle.style1}
              inputItemStyle={InputItemStyle.style1}
              labelName="Votre email"
              htmlFor="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearEmailError();
              }}
              onBlur={() => setTouched((s) => ({ ...s, email: true }))}
              hasError={
                (touched.email && isEmailEmpty) ||
                serverFieldErrors.email !== ""
              }
            />

            <div className="errorSlot">
              {touched.email && isEmailEmpty && (
                <p className="formErrorMessageStyle">
                  Merci de renseigner votre email
                </p>
              )}
              {serverFieldErrors.email && (
                <p className="formErrorMessageStyle">
                  {serverFieldErrors.email}
                </p>
              )}
            </div>

            <InputContainer
              inputLabelStyle={InputLabelStyle.style1}
              inputItemStyle={InputItemStyle.style1}
              labelName="Veuillez rentrer votre mot de passe"
              htmlFor="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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

            <InputContainer
              inputLabelStyle={InputLabelStyle.style1}
              inputItemStyle={InputItemStyle.style1}
              labelName="Confirmer votre mot de passe"
              htmlFor="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => {
                setPasswordConfirmation(e.target.value);
              }}
              onBlur={() =>
                setTouched((s) => ({ ...s, passwordConfirmation: true }))
              }
              hasError={
                touched.passwordConfirmation &&
                (isPasswordConfirmationEmpty || !passwordsMatch)
              }
            />

            <div className="errorSlot">
              {touched.passwordConfirmation && isPasswordConfirmationEmpty && (
                <p className="formErrorMessageStyle">
                  Merci de confirmer votre mot de passe
                </p>
              )}
              {touched.passwordConfirmation &&
                !isPasswordConfirmationEmpty &&
                !passwordsMatch && (
                  <p className="formErrorMessageStyle">
                    Les mots de passe ne correspondent pas
                  </p>
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
      )}
    </>
  );
}

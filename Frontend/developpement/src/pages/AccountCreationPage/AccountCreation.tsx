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
import { useToastStore } from "../../store/toastStore";
import { useEffect } from "react";
import { useStepStore } from "../../store/useStepStore";

export default function AccountCreation() {
  const navigate = useNavigate();

  const setActiveStep = useStepStore((state) => state.setActiveStep);

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

  const [serverPasswordError, setServerPasswordError] = useState("");

  const showToast = useToastStore((state) => state.showToast);

  const isLoginEmpty = login.trim() === "";
  const isEmailEmpty = email.trim() === "";
  const isPasswordEmpty = password.trim() === "";
  const isPasswordConfirmationEmpty = passwordConfirmation.trim() === "";
  const passwordsMatch = password === passwordConfirmation;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const isEmailInvalid = !isEmailEmpty && !emailRegex.test(email.trim());

  const passwordErrorMessages: Record<string, string> = {
    PASSWORD_TOO_SHORT: "- doit contenir au moins 8 caractères.",
    PASSWORD_MISSING_UPPERCASE: "- doit avoir au moins une majuscule.",
    PASSWORD_MISSING_LOWERCASE: "- doit avoir au moins une minuscule.",
    PASSWORD_MISSING_DIGIT: "- doit avoir au moins un chiffre.",
    PASSWORD_MISSING_SPECIAL_CHARACTER:
      "- doit avoir au moins un caractère spécial.",
    PASSWORD_CONTAINS_SPACE: "- ne doit pas contenir d'espace.",
  };

  const hasClientError =
    isLoginEmpty ||
    isEmailEmpty ||
    isEmailInvalid ||
    isPasswordEmpty ||
    isPasswordConfirmationEmpty ||
    !passwordsMatch;

  useEffect(() => {
    setActiveStep(1);
  }, [setActiveStep]);

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

    setServerPasswordError("");

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

        if (responseData.code === "INVALID_PASSWORD") {
          setServerPasswordError(responseData.message);

          setTouched((previousTouched) => ({
            ...previousTouched,
            password: true,
          }));

          const details =
            "Votre mot de passe : \n" +
            responseData.errors
              .map(
                (errorCode: string) =>
                  passwordErrorMessages[errorCode] || errorCode,
              )
              .join("\n");

          showToast(details, "error");
          console.log(
            responseData.errors.map(
              (errorCode: string) =>
                passwordErrorMessages[errorCode] || errorCode,
            ),
          );

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
        if (!responseData.id) {
          showToast(
            "Le compte a été créé, mais son identifiant est introuvable.",
            "error",
          );

          return;
        }

        sessionStorage.setItem("newAccountId", String(responseData.id));

        showToast("Création de compte réussie !", "success");

        handleClear();
        navigate("/projectCreation");
      }
    } catch (error) {
      console.error("Erreur création projet :", error);
      showToast("Impossible de contacter le serveur.", "error");
    }
  }

  function handleClear() {
    setLogin("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setServerPasswordError("");

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
      <form noValidate className="formStyle3" onSubmit={handleSubmit}>
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
              (touched.login && isLoginEmpty) || serverFieldErrors.login !== ""
            }
            hasAutoComplete={true}
            />

          <div className="errorSlot">
            {touched.login && isLoginEmpty && (
              <p className="formErrorMessageStyle">
                Merci de renseigner votre login
              </p>
            )}
            {serverFieldErrors.login && (
              <p className="formErrorMessageStyle">{serverFieldErrors.login}</p>
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
              (touched.email && (isEmailEmpty || isEmailInvalid)) ||
              serverFieldErrors.email !== ""
            }
            hasAutoComplete={true}
          />

          <div className="errorSlot">
            {touched.email && isEmailEmpty && (
              <p className="formErrorMessageStyle">
                Merci de renseigner votre email
              </p>
            )}

            {touched.email && !isEmailEmpty && isEmailInvalid && (
              <p className="formErrorMessageStyle">
                Merci de renseigner une adresse email valide
              </p>
            )}

            {serverFieldErrors.email && (
              <p className="formErrorMessageStyle">{serverFieldErrors.email}</p>
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
              setServerPasswordError("");
            }}
            onBlur={() => setTouched((s) => ({ ...s, password: true }))}
            hasError={
              (touched.password && isPasswordEmpty) ||
              serverPasswordError !== ""
            }
          />

          <div className="errorSlot">
            {touched.password && isPasswordEmpty && (
              <p className="formErrorMessageStyle">
                Merci de renseigner votre mot de passe
              </p>
            )}

            {serverPasswordError && (
              <p className="formErrorMessageStyle">{serverPasswordError}</p>
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
    </>
  );
}

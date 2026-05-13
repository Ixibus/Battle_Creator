import "../../styles/form/formStyle.css";
import "../../styles/form/titleFormStyle.css";
// import "../../styles/global/btnStyle.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import LoginButton from "./LoginButton";

import { useAuth0 } from "@auth0/auth0-react";
import NextButton from "../../components/Button/NextButton/NextButton";

export default function AccountCreation() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = document.querySelector("form");

  async function handlesubmit(e: any) {
    e.preventDefault();

    const inputDatas: FormData = new FormData(form!);

    const dataObj = Object.fromEntries(inputDatas.entries());
    Object.assign(dataObj, { isActive: false });

    const test = await fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    const body = await test.text();
    console.log(test.status, body);
  }

  return (
    <>
      {!isAuthenticated && (
        <form
          className="formStyle"
          onSubmit={(e) =>
            handlesubmit(e)
          }
        >
          <h1 className="titleFormStyle">CREATION DE COMPTE</h1>
          <InputContainer
            labelName="Votre login de connexion"
            htmlFor="login"
            type="text"
            onChange={(e) => setLogin(e.target.value)}
          />
          <InputContainer
            labelName="Votre email"
            htmlFor="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputContainer
            labelName="Veuillez rentrer votre mot de passe"
            htmlFor="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputContainer
            labelName="Confirmer votre mot de passe"
            htmlFor="passwordConfirmation"
            type="password"
          />
          <NextButton type="submit" styleClassName="btnStyle3" mainClassName="SubmitBtn_AccountCreation" text="Valider"/>
        </form>
      )}
    </>
  );
}

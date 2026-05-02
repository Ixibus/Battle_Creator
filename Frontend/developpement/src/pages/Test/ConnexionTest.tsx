import "../../styles/form/form.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
// import LoginButton from "./LoginButton";

import { useAuth0 } from "@auth0/auth0-react";

export default function ConnexionTest() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const form = document.querySelector("form");


  async function handlesubmitTester(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputDatas: FormData = new FormData(form!);

    const dataObj = Object.fromEntries(inputDatas.entries());
    Object.assign(dataObj, { isActive: false });

    const res = fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(dataObj),
    });

    (await res).ok && console.log("la connexion a marché");
    !(await res).ok && console.log("la connexion non authorisée" + " le status requête :" + (await res).ok)


  }

  return (
    <>
     {/* {isLoading && <div>Loading...</div>} */}
     {/* {error && <div>Error : {error.message}</div>} */}
      {!isAuthenticated && (
        <form className="form" onSubmit={(e) => handlesubmitTester(e)}>
          <h1>TEST CREATION DE COMPTE</h1>
          <InputContainer
            labelName="Votre login"
            htmlFor="login"
            type="text"
            onChange={(e) => setLogin(e.target.value)}
          />
          <InputContainer
            labelName="Votre mot de passe"
            htmlFor="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">valider</button>
        </form>
      )}
    </>
  );
}

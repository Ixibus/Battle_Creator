import "../../styles/form/form.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// import LoginButton from "./LoginButton";

export default function ConnexionTest() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const form = document.querySelector("form");

  async function handlesubmitTester(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputDatas: FormData = new FormData(form!);

    const dataObj = Object.fromEntries(inputDatas.entries());
    Object.assign(dataObj, { isActive: false });

    const res = fetch("http://localhost:8080/auth/login", {
      method: "POST",
      credentials : "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    console.log(dataObj);

    if ((await res).status === 200) {
      console.log("La connexion a marché");
      navigate("/homePage");
    }
    
    if (!(await res).ok) {
      console.log("Connexion non authorisée");
    }
    
    const response = (await res);
    console.log(response);

  }

  return (
    <>
      <form className="form" onSubmit={(e) => handlesubmitTester(e)}>
        <h1>CONNEXION</h1>
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
    </>
  );
}

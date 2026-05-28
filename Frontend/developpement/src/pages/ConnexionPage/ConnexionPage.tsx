import InputContainer, {InputLabelStyle, InputItemStyle} from "../../components/InputContainer/InputContainer";
import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import NextButton from "../../components/Button/NextButton/NextButton";
// import LoginButton from "./LoginButton";

export default function ConnexionPage() {
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });
    console.log(dataObj);

    if ((await res).status === 200) {
      console.log("la connexion a marché");
      navigate("/homePage");
    }

    if (!(await res).ok) {
      console.log("la connexion non authorisée");
    }

    const response = await res;
    console.log(response);
  }

  return (
    <>
      <form className="formStyle" onSubmit={(e) => handlesubmitTester(e)}>
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
          <div className="buttonsContainerStyle">
            <NextButton
              type="submit"
              styleClassName="btnStyle10"
              mainClassName="SubmitBtn_AccountCreation"
              text="Valider"
            />
            <NextButton
              type="submit"
              styleClassName="btnStyle11"
              mainClassName="SubmitBtn_AccountCreation"
              text="Effacer"
            />
          </div>
        </div>
      </form>
    </>
  );
}

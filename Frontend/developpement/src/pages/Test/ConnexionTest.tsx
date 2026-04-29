import "../../styles/form/form.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import { useState, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
// import LoginButton from "./LoginButton";

import { useAuth0 } from "@auth0/auth0-react";

export default function ConnexionTest() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = document.querySelector("form");

  // function handlesubmit(e : any, firstName : string, lastName : string, pseudo: string , password : string) {
  //   e.preventDefault();
  //   console.log(firstName, lastName, pseudo, password);
  // }

  // Avec "form!"" par défaut dans le paramètre, l'objet FormData sera rempli en clé/valeur avec :
  // la clé = la valeur de la propriété "name" de l'input enfant de <form>
  // la valeur = la valeur de la propriété "valeur" de cette input enfant susvisé

  const mutation = useMutation({
    mutationFn: async (dataObj: {
      email: string;
      login: string;
      isActive: boolean;
    }) => {
      const res = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataObj),
      });

      if (!res.ok) {
        console.log("réponse server pas ok");
      }

      if (res.ok) {
        console.log("réponse server ok");
      }

      return res.json();
    },
    onMutate : (variable) => {
      console.log(`onMutate (variable) : ${variable}`)
    },
    onError : (error, variable) => {
      console.log(`onError (error) : ${error.message}`);
      console.log(`onError (variable) : ${variable.login}`)
    },
    onSuccess : (data, variable) => {
      console.log(`onSuccess (data) : ${data.login}`);
      console.log(`onSuccess (variable) : ${variable.login}`);
    },
    onSettled : (data, error, variables, onMutateResult, context) => {
      console.log(`onSettled (onMutateResult) : ${onMutateResult}`);
      console.log(`onSettled (context) : ${context}`);
    }
  });

  async function handlesubmitTester(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const inputDatas: FormData = new FormData(form!);

    const dataObj = Object.fromEntries(inputDatas.entries());
    Object.assign(dataObj, { isActive: false });

    mutation.reset();

    mutation.mutate({
      email,
      login,
      isActive: false,
    });


    

    // console.log(dataResponse);

    // const body = await test.text();

    // affiche les logs à la suite du fetch()
    // console.log(test.status, body);
  }

  return (
    <>
      {/* {!isAuthenticated && <form className="form" onSubmit={(e) => handlesubmit(e, firstName, lastName, pseudo, password)}>
        <h1>CREATION DE COMPTE</h1>
        <InputContainer labelName="Votre prénom" htmlFor="firstname" type="text" onChange={(e) => setFirstName(e.target.value)}/>
        <InputContainer labelName="Votre nom" htmlFor="lastname" type="text" onChange={(e) => setLastName(e.target.value)}/>
        <InputContainer labelName="Votre pseudo de connexion" htmlFor="pseudoContainer" type="text" onChange={(e) => setPseudo(e.target.value)}/>
        <InputContainer labelName="Veuillez rentrer votre mot de passe" htmlFor="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <InputContainer labelName="Confirmer votre mot de passe" htmlFor="passwordConfirmation" type="password"/>
        <button type="submit">valider</button>
      </form>} */}
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
      {/* {!isAuthenticated && <LoginButton />} */}
    </>
  );
}

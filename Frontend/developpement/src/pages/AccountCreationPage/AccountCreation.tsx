import "../../styles/form/form.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import { useState } from "react";
import LoginButton from "./LoginButton";

import { useAuth0 } from '@auth0/auth0-react';

export default function AccountCreation() {
  const { isAuthenticated, isLoading, error } = useAuth0();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function handlesubmit(e : any, firstName : string, lastName : string, pseudo: string , password : string) {
  //   e.preventDefault();
  //   console.log(firstName, lastName, pseudo, password);
  // }

  const form = document.querySelector("form");
  function handlesubmitTester(e : any, email : string, pseudo: string) {
    e.preventDefault();
    // test.append("Le pseudo", pseudo);
    // test.append("Le mail", email);
    // console.log(test.getAll("Le pseudo"), test.getAll("Le mail"));
    
    // Avec "form!"" par défaut dans le paramètre, l'objet FormData sera rempli en clé/valeur avec :
    // la clé = la valeur de la propriété "name" de l'input enfant de <form>
    // la valeur = la valeur de la propriété "valeur" de cette input enfant susvisé
    const inputDatas = new FormData(form!);
    for (const el of inputDatas.entries()) {
      // el[0] = la clé; el[1] = sa valeur
      console.log(el[0] + ", "+ el[1]);
    }

    // console.log(test.entries());

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
      {!isAuthenticated && <form className="form" onSubmit={(e) => handlesubmitTester(e, email, pseudo)}>
        <h1>TEST CREATION DE COMPTE</h1>
        <InputContainer labelName="Votre email" htmlFor="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
        <InputContainer labelName="Votre pseudo" htmlFor="pseudo" type="text" onChange={(e) => setPseudo(e.target.value)}/>
                <button type="submit">valider</button>
      </form>}
      {!isAuthenticated &&<LoginButton/>}
    </>
  );
}



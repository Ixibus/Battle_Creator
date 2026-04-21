import "../../styles/form/form.css";
import InputContainer from "../../components/InputContainer/InputContainer";

export default function AccountCReation() {
  return (
    <>
      <div className="form">
        <h1>CREATION DE COMPTE</h1>
        <InputContainer labelName="Votre prénom" htmlFor="firstname" type="text"/>
        <InputContainer labelName="Votre nom" htmlFor="lastname" type="text" />
        <InputContainer labelName="Votre pseudo de connexion" htmlFor="pseudoContainer" type="text" />
        <InputContainer labelName="Veuillez rentrer votre mot de passe" htmlFor="password" type="password" />
        <InputContainer labelName="Confirmer votre mot de passe" htmlFor="passwordConfirmation" type="password" />
      </div>
    </>
  );
}

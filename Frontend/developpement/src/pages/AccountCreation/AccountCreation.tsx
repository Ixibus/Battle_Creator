import "./accountCreation.css";

export default function AccountCReation() {
  return (
    <>
      <div className="accountCreationContainer" id="">
        <h1>CREATION DE COMPTE</h1>
        <div className="inputContainer firstnameContainer">
          <label htmlFor="firstname">Votre Prénom</label>
          <input
            className="inputStyle"
            type="text"
            name="firstname"
            id="firstname"
          />
        </div>
        <div className="inputContainer lastnameContainer">
          <label htmlFor="lastname">Votre Nom</label>
          <input
            className="inputStyle"
            type="text"
            name="lastname"
            id="lastname"
          />
        </div>
        <div className="inputContainer pseudoConnexionContainer">
          <label htmlFor="pseudoContainer">Votre pseudo de connexion</label>
          <input
            className="inputStyle"
            type="text"
            name="pseudoContainer"
            id="pseudoContainer"
          />
        </div>
        <div className="inputContainer passwordContainer">
          <label htmlFor="password">veuillez rentrer votre mot de passe</label>
          <input
            className="inputStyle"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="inputContainer passwordConfirmationContainer">
          <label htmlFor="passwordConfirmation">
            confirmer votre mot de passe
          </label>
          <input
            className="inputStyle"
            type="password"
            name="passwordConfirmation"
            id="passwordConfirmation"
          />
        </div>
      </div>
    </>
  );
}

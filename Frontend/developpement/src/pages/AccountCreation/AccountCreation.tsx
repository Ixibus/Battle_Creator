import './accountCreation.css';

export default function AccountCReation() {
  return (
    <>
      <div className="container" id="">
        <h1>CREATION DE COMPTE</h1>
        <label htmlFor="firstname">Votre Prénom</label>
        <input type="text" name="firstname" id="firstname" />
        <label htmlFor="lastname">Votre Nom</label>
        <input type="text" name="lastname" id="lastname" />
        <label htmlFor="connexionPseudo">Votre pseudo de connexion</label>
        <input type="text" name="connexionPseudo" id="connexionPseudo" />
        <label htmlFor="password">veuillez rentrer votre mot de passe</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordConfirmation">
          confirmer votre mot de passe
        </label>
        <input
          type="password"
          name="passwordConfirmation"
          id="passwordConfirmation"
        />
      </div>
    </>
  );
}

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import AreaTextContainer from "../../components/InputContainer/AreaTextContainer";

async function handlesubmit(e: any) {
  e.preventDefault();
}

export default function ProjectCreation() {
  return (
    <>
      <form className="formStyle" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle">CREATION DE PROJET</h1>
        <InputContainer
          labelName="Veuillez entrer le nom du projet"
          htmlFor="projectName"
          type="text"
        />
        <AreaTextContainer
          htmlFor="projectionDescriptionContainer"
          labelName="Décriver votre projet"
          cols={35}
          rows={10}
        />
        <button type="submit" className="btnStyle3">
          Valider
        </button>
      </form>
    </>
  );
}

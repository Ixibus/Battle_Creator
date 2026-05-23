import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import InputContainer from "../../components/InputContainer/InputContainer";
import AreaTextContainer from "../../components/InputContainer/AreaTextContainer";
import NextButton from "../../components/Button/NextButton/NextButton";

async function handlesubmit(e: any) {
  e.preventDefault();
}

export default function ProjectCreation() {
  return (
    <>
      <form className="formStyle" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle">CREATION DE PROJET</h1>
        <div className="inputsFormContainerStyle">
          <InputContainer
            labelName="Veuillez entrer le nom du projet"
            htmlFor="projectName"
            type="text"
          />
          <AreaTextContainer
            htmlFor="projectionDescriptionContainer"
            labelName="Décrivez votre projet"
            cols={35}
            rows={10}
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

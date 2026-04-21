import '../../styles/form/form.css'
import '../../styles/global/inputBorderStyle.css'
import '../../styles/global/inputContainer.css'
import InputContainer from "../../components/InputContainer/InputContainer";

export default function ProjectCreation() {
  
  return (
    <>
      <div className="form">
        <InputContainer labelName="Veuillez entrer le nom du projet" htmlFor="projectName" type="text"
        />
        <label htmlFor="projectCreationTextArea">Décrivez votre projet</label>
        <textarea name="projectCreationTextArea" id="projectCreationTextArea" className='inputBorderStyle inputContainer' cols={35} rows={10}/>
      </div>
    </>
  );

}

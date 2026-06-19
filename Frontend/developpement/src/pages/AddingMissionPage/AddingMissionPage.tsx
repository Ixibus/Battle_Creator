import "./addingMissionPage.css";

import "../../styles/form/formStyle.css";
import "../../styles/global/btnStyle.css";
import "../../styles/form/titleFormStyle.css";
import InputContainer, {
  InputLabelStyle,
  InputItemStyle,
} from "../../components/InputContainer/InputContainer";
import AreaTextContainer, {
  AreaLabelStyle,
  AreaTextStyle,
} from "../../components/InputContainer/AreaTextContainer";
import NextButton from "../../components/Button/NextButton/NextButton";
import DateInputContainer from "../../components/InputContainer/DateInputContainer";

import { useNavigate } from "react-router-dom";

export default function AddingMissionPage() {
  const navigate = useNavigate();
  async function handlesubmit(e: any) {
    e.preventDefault();

    const res = fetch("http://localhost:8080/missions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataObj),
    });

    if ((await res).status !== 201) {
      console.log("insertion de mission échoué");
    }

    if ((await res).status === 201) {
      console.log("la missions a bien été créer en base de donnée !");
      // navigate("/missionPage");
    }
  }
  return (
    <div className="addingMissionPageStyle">
      <form className="formStyle2" onSubmit={(e) => handlesubmit(e)}>
        <h1 className="titleFormStyle4">AJOUTER UNE MISSION</h1>
        <div className="inputsFormContainerStyle">
          <InputContainer
            inputLabelStyle={InputLabelStyle.style3}
            labelName="Nom de la mission"
            inputItemStyle={InputItemStyle.style3}
            htmlFor="misionName"
            type="text"
          />
          <AreaTextContainer
            htmlFor="missionGoal"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Objectif de la mission"
            areaTextStyle={AreaTextStyle.style3}
            cols={35}
            rows={2}
          />
          <AreaTextContainer
            htmlFor="missionDescription"
            areaLabelStyle={AreaLabelStyle.style3}
            labelName="Description de la mission"
            areaTextStyle={AreaTextStyle.style2}
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
              nav={-1}
              type="button"
              styleClassName="btnStyle11"
              mainClassName="SubmitBtn_AccountCreation"
              text="Quitter"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

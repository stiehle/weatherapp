import { IconContext } from "react-icons";
import { CgPen } from "react-icons/cg";
// import { IconName } from "react-icons/cg";
import "./Multibutton.scss";

type multiButton = {
  editMode: boolean;
  // setCitiesEdit: React.Dispatch<boolean>;
  setCitiesEditMode(editMode: boolean): void;
  buttonText: string;
};

function Multibutton({ editMode, setCitiesEditMode, buttonText }: multiButton) {
  function buttonEdit() {
    if (editMode) {
      setCitiesEditMode(false);
    } else setCitiesEditMode(true);
  }

  return (
    <>
      <IconContext.Provider value={{ size: "25px" }}>
        <button onClick={buttonEdit} className="multiButton">
          <CgPen className="multiButton__icon" /> {buttonText}
        </button>
      </IconContext.Provider>
    </>
  );
}

export default Multibutton;

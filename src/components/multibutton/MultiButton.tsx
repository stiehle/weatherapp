// import { IconName } from "react-icons/cg";
import "./MultiButton.scss";
import IconButton from "../iconbutton/IconButton";

type multiButton = {
  citiesEdit: boolean;
  // setCitiesEdit: React.Dispatch<boolean>;
  setCitiesEditMode(editMode: boolean): void;
  showSearchWindow: boolean;
  setShowSearchWindow(showSearchWindow: boolean): void;
  setInputValue(inputValue: string): void;
};

function MultiButton({ showSearchWindow, setShowSearchWindow, citiesEdit, setCitiesEditMode, setInputValue }: multiButton) {
  function handleClick() {
    if (showSearchWindow) {
      setShowSearchWindow(false);
      setCitiesEditMode(false);
      setInputValue("");
    } else {
      if (citiesEdit) {
        setCitiesEditMode(false);
      } else setCitiesEditMode(true);
    }
  }

  return (
    <>
      {showSearchWindow ? (
        <>
          {setCitiesEditMode(false)}
          <IconButton buttonFunction={"cancel"} buttonClick={handleClick} buttonText={"Abbruch"} />
        </>
      ) : citiesEdit ? (
        <IconButton buttonFunction={"ok"} buttonClick={handleClick} buttonText={"OK"} />
      ) : (
        <IconButton buttonFunction={"edit"} buttonClick={handleClick} buttonText={"Bearbeiten"} />
      )}
    </>
  );
}

export default MultiButton;

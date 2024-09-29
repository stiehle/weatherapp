import "./MultiButton.scss";
import IconButton from "../iconbutton/IconButton";
import { useEffect } from "react";

type multiButton = {
  citiesEdit: boolean;

  setCitiesEditMode(editMode: boolean): void;
  showSearchWindow: boolean;
  setShowSearchWindow(showSearchWindow: boolean): void;
  setInputValue(inputValue: string): void;
};

function MultiButton({ showSearchWindow, setShowSearchWindow, citiesEdit, setCitiesEditMode, setInputValue }: multiButton) {
  useEffect(() => {
    setCitiesEditMode(false);
  }, [showSearchWindow]);

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
        <IconButton buttonFunction={"cancel"} buttonClick={handleClick} buttonText={"Abbruch"} />
      ) : citiesEdit ? (
        <IconButton buttonFunction={"ok"} buttonClick={handleClick} buttonText={"OK"} />
      ) : (
        <IconButton buttonFunction={"edit"} buttonClick={handleClick} buttonText={"Bearbeiten"} />
      )}
    </>
  );
}

export default MultiButton;

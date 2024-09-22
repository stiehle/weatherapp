import { IconContext } from "react-icons";
import { CgCheckO, CgCloseO, CgLink, CgPen, CgTrash } from "react-icons/cg";
import "./IconButton.scss";

type iconButton = {
  buttonFunction: string;
  buttonClick(): void;
  buttonText: string;
};

function IconButton({ buttonFunction, buttonClick, buttonText }: iconButton) {
  const iconStock = [
    {
      name: "edit",
      iconSymbol: <CgPen className="iconButton__icon--white" />,
      size: "25px",
    },
    {
      name: "cancel",
      iconSymbol: <CgCloseO className="iconButton__icon--red" />,
      size: "25px",
    },
    {
      name: "ok",
      iconSymbol: <CgCheckO className="iconButton__icon--green" />,
      size: "25px",
    },
    {
      name: "trash",
      iconSymbol: <CgTrash className="iconButton__icon--white" />,
      size: "18px",
    },
    {
      name: "link",
      iconSymbol: <CgLink className="iconButton__icon--black" />,
      size: "25px",
    },
  ];

  function selectIcon() {
    const icon = iconStock.find((iconName) => iconName.name === buttonFunction);
    // console.log(icon);

    return <>{icon && icon.iconSymbol}</>;
  }

  function selectIconSize() {
    const icon = iconStock.find((iconName) => iconName.name === buttonFunction);
    if (icon) {
      return icon.size;
    } else "25px";
  }

  return (
    // <IconContext.Provider value={{ size: "25px" }}>
    <>
      <IconContext.Provider value={{ className: "iconButton__icon", size: selectIconSize() }}>
        <button onClick={buttonClick} className="iconButton">
          {selectIcon()}
          {buttonText}
        </button>
      </IconContext.Provider>
    </>
  );
}

export default IconButton;

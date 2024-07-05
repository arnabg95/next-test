import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";

interface IProps {
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
}

export default function PasswordEye({ isShow, setIsShow }: IProps) {
  return (
    <span className="password-show-hide" style={{ cursor: "pointer" }}>
      <FontAwesomeIcon
        icon={isShow ? faEye : faEyeSlash}
        onClick={() => setIsShow((preV: boolean) => !preV)}
      />
    </span>
  );
}

import React from "react";

const RegisterButton = ({ checked }: { checked: boolean }) => {
  return (
    <button type="submit" className="btn w-100" disabled={!checked}>
      Sign Up
    </button>
  );
};

export default RegisterButton;

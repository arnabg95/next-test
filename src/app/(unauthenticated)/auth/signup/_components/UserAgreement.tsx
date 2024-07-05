import Link from "next/link";
import React from "react";

const UserAgreement = ({
  checked,
  setChecked,
}: {
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="filter-box" onClick={(e) => setChecked((prev) => !prev)}>
        <div className="form-check">
          <input
            className="form-check-input best-suit-checkbox"
            type="checkbox"
            id="casual-date"
            onChange={(e) => setChecked(e.target.checked)}
            checked={checked}
          />
          <label className="form-check-label">
            By clicking Continue to join or sign in, You agree to our
            <Link href="/user-agreement"> User Agreement</Link> and acknowledge that you
            understand the
            <Link href="/privacy-policy"> Privacy Policy</Link>.
          </label>
        </div>
      </div>
    </>
  );
};

export default UserAgreement;

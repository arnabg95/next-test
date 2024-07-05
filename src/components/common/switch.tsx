import { useState } from "react";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { fetchApi } from "@/http";
import { mutate } from "swr";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#2ECA45" : "#3f9fde",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function CustomizedSwitches({
  checked,
  value,
  url,
  type,
}: {
  checked: boolean;
  value: string;
  url: string;
  type: string;
}) {
  const [isChecked, setChecked] = useState<boolean>(checked);
  const handleClick = async () => {
    try {
      const body: any = {};
      if (type === "notification") {
        body["activity"] = { [value]: !checked };
      } else {
        body[value as keyof typeof body] = !checked;
      }
      // alert(JSON.stringify(body));
      await fetchApi(url, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });
      if (type === "notification") {
        mutate("notification-settings");
      } else {
        mutate("feed-settings");
      }
      setChecked((prev) => !prev);
    } catch (error) {
      console.log("Something Went Wrong");
    }
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} />}
        checked={isChecked}
        label=""
        onClick={handleClick}
      />
      {/* <div className="form-check form-switch">
        <input
          className="form-check-input"
          style={{cursor:'pointer'}}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          checked={isChecked}
          onChange={handleClick}
        />
      </div> */}
    </FormGroup>
  );
}

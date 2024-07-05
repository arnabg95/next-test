import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOutAlt,
  faTrashAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/lib";
import CustomModal from "./CustomModal";
import { fetchApi } from "@/http";
import { revalidatePath } from "next/cache";
import useSettingsStore from "@/store/useAuthStore";

type IProps = {
  name: string;
  email: string;
  img: string;
};

const modaldata = [
  {
    image: "/assets/images/sign-out.svg",
    title: "Are you sure you want to log out??",
    body: "",
    closeBtnText: "Stay Logged In",
    updateBtnText: "Log Out",
    type: "logout",
  },
  {
    image: "/assets/images/delete.png",
    title: "Are you sure you want to delete your account?",
    body: "This action is irreversible and will permanently delete all your data associated with this account.",
    closeBtnText: "Cancel",
    updateBtnText: "Delete",
    type: "delete",
  },
];

export default function HeaderProfile({ email, img, name }: IProps) {
  const { resetState } = useSettingsStore();
  const [show, setShow] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const open = Boolean(anchorEl);

  const handleCloseModal = () => setShow(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setType("delete");
    setAnchorEl(null);
    setShow(true);
  };

  const logoutUser = async () => {
    await logout();
    resetState();
  };

  const handleUpdate = async () => {
    const res = await fetchApi("profile/delete-profile", { method: "delete" });
    if (res) {
      await logout();
      revalidatePath("/");
    }
  };

  const navigateTo = (path: string) => router.push(path);

  return (
    <div className="profile-main-w">
      <Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <div className="header-profile-img">
                <Avatar sx={{ width: 60, height: 60 }}>
                  <Image
                    src={img ? img : "/assets/images/default-user.png"}
                    alt="profile-image"
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                </Avatar>
              </div>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={{ boxShadow: 0 }}
        >
          <div className="profile-list-wrap">
            <MenuItem className="profile-name-wrap" onClick={handleClose}>
              <div className="profile-photo">
                <Image
                  src={img ? img : "/assets/images/default-user.png"}
                  alt="profile-image"
                  width={50}
                  height={50}
                />
              </div>
              <div className="profile-name">
                <h3>{name}</h3>
                <p>{email}</p>
              </div>
            </MenuItem>

            <Divider />

            <div className="profile-list">
              <MenuItem
                className={pathname === "/profile" ? "active" : ""}
                onClick={() => navigateTo("/profile")}
              >
                <FontAwesomeIcon icon={faUser} />
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => navigateTo("/settings/feed")}
                className={pathname.includes("/settings") ? "active" : ""}
              >
                <FontAwesomeIcon icon={faCog} />
                Settings
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  setType("logout");
                  setShow(true);
                }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Log out
              </MenuItem>
              <MenuItem className="red-text" onClick={handleDelete}>
                <FontAwesomeIcon icon={faTrashAlt} />
                Delete Account
              </MenuItem>
            </div>
          </div>
        </Menu>
      </Fragment>

      <CustomModal
        show={show}
        handleClose={handleCloseModal}
        image={modaldata[type === "logout" ? 0 : 1].image}
        title={modaldata[type === "logout" ? 0 : 1].title}
        body={modaldata[type === "logout" ? 0 : 1].body}
        closeBtnText={modaldata[type === "logout" ? 0 : 1].closeBtnText}
        updateBtnText={modaldata[type === "logout" ? 0 : 1].updateBtnText}
        updateFn={type === "logout" ? logoutUser : handleUpdate}
        type={type}
      />
    </div>
  );
}

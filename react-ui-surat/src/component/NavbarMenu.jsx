import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import ImageLogo from "../assets/images/img-logo.png";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const NavbarMenu = () => {
  const navigate = useNavigate("");
  const [state, setState] = useState({
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/ajukan-surat">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Ajukan Surat" />
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItem>
          <Button
            className="w-full"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Masuk
          </Button>
        </ListItem>
        <ListItem>
          <Button
            className="w-full"
            variant="outlined"
            onClick={() => navigate("/register")}
          >
            Daftar
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="mx-2 laptop:container laptop:mx-auto flex justify-between items-center h-24 text-gray-800">
      <Link to="/">
        <div className="flex items-center rounded-md px-8 py-1">
          <img src={ImageLogo} alt={ImageLogo} className="h-16" />
          <p className="text-base text-center font-semibold p-2">
            Kabupaten <br /> Lumajang
          </p>
        </div>
      </Link>
      <ul className="hidden laptop:flex gap-8">
        <Link to="/">
          <li className="cursor-pointer py-1 hover:border-b-2">Beranda</li>
        </Link>
        <Link to="/ajukan-surat">
          <li className="cursor-pointer py-1 hover:border-b-2">Ajukan Surat</li>
        </Link>
        <li
          className="cursor-pointer py-1 hover:border-b-2"
          onClick={handleClick}
        >
          Pemerintahan
        </li>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => navigate("/pemerintahan/rt")}>
            Pengurus RT
          </MenuItem>
          <MenuItem onClick={() => navigate("/pemerintahan/rw")}>
            Pengurus RW
          </MenuItem>
          <MenuItem onClick={() => navigate("/pemerintahan/satlintas")}>
            Satlintas
          </MenuItem>
          <MenuItem onClick={() => navigate("/pemerintahan/tokoh-agama")}>
            Tokoh Agama
          </MenuItem>
          <MenuItem onClick={() => navigate("/pemerintahan/tokoh-masyarakat")}>
            Tokoh Masyarakat
          </MenuItem>
          <MenuItem onClick={() => navigate("/pemerintahan/pegawai-kelurahan")}>
            Pegawai Kelurahan
          </MenuItem>
        </Menu>
      </ul>
      <div className="gap-3 hidden laptop:flex align-middle">
        <Button variant="contained" onClick={() => navigate("/login")}>
          Masuk
        </Button>
        <Button variant="outlined" onClick={() => navigate("/register")}>
          Daftar
        </Button>
      </div>
      <div
        onClick={toggleDrawer("right", true)}
        className="block desktop:hidden laptop:hidden cursor-pointer mr-2"
      >
        <AiOutlineMenu size={20} />
      </div>
      <SwipeableDrawer
        anchor="right"
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
};

export default NavbarMenu;

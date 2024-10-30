import {
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useEffect, useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi } from "../../../lib/config";
import { Logout } from "@mui/icons-material";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();

  //** HANDLERS **/

  return (
    <div className="head">
      <div className="head1">
        <Stack className="head-icons">
          <Box>
            <IconButton
              component="a"
              href={"https://t.me/mfdev98"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to Telegram"
            >
              <img src="icons/telegram.svg" alt="" />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              component="a"
              href={"https://www.facebook.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to Telegram"
            >
              <img src="icons/facebook.svg" alt="" />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              component="a"
              href={"https://www.instagram.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to instagram"
            >
              <img src="icons/instagram.svg" alt="" />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              component="a"
              href={"https://www.twitter.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to twitter"
            >
              <img src="icons/twitter.svg" alt="" />
            </IconButton>
          </Box>
          <Box>
            <IconButton
              component="a"
              href={"https://www.youtube.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Go to youtube"
            >
              <img src="icons/youtube.svg" alt="" />
            </IconButton>
          </Box>
        </Stack>
      </div>
      <div className="home-navbar">
        <div className="navbar-container">
          <Stack className="menu">
            <Stack className="links">
              <Box className={"hover-line"}>
                <NavLink to="/" activeClassName={"underline"}>
                  Home
                </NavLink>
              </Box>
              <Box className={"hover-line"}>
                <NavLink to="/products" activeClassName={"underline"}>
                  Products
                </NavLink>
              </Box>
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/orders" activeClassName={"underline"}>
                    Orders
                  </NavLink>
                </Box>
              ) : null}
              {authMember ? (
                <Box className={"hover-line"}>
                  <NavLink to="/member-page" activeClassName={"underline"}>
                    MyPage
                  </NavLink>
                </Box>
              ) : null}
              <Box className={"hover-line"}>
                <NavLink to="/help" activeClassName={"underline"}>
                  Help
                </NavLink>
              </Box>

              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
                onClose={handleCloseLogout}
                onClick={handleCloseLogout}
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
                    "&:before": {
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
              >
                <MenuItem onClick={handleLogoutRequest}>
                  <ListItemIcon>
                    <Logout fontSize="small" style={{ color: "red" }} />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Stack>
            <Stack className="links2">
              {!authMember ? (
                <Box className={"hover-line"}>
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    variant="text"
                    onClick={() => setLoginOpen(true)}
                  >
                    Login
                  </Button>
                </Box>
              ) : (
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember?.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  aria-haspopup={"true"}
                  onClick={handleLogoutClick}
                />
              )}

              <Box className={"hover-line"}>
                {!authMember ? (
                  <Button
                    sx={{
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    variant={"text"}
                    onClick={() => setSignupOpen(true)}
                  >
                    Register
                  </Button>
                ) : null}
              </Box>
              <Basket
                cartItems={cartItems}
                onAdd={onAdd}
                onRemove={onRemove}
                onDelete={onDelete}
                onDeleteAll={onDeleteAll}
              />
            </Stack>
          </Stack>
          <Button className="orderNow" href="/products"></Button>
        </div>
      </div>
    </div>
  );
}

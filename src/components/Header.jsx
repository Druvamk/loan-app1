import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Switch,
  Box,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Divider,
  FormControlLabel,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const { darkMode, setDarkMode } = useContext(AppContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: "HOME", href: "/" },
    { label: "EXCHANGE RATES (LIVE)", href: "/exchange" },
    { label: "ABOUT", href: "/about" },
    { label: "ERROR PAGE", href: "/wrong-route" },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        background: darkMode
          ? "linear-gradient(90deg, #1c1c1c, #333)"
          : "linear-gradient(90deg, #1976d2, #42a5f5)",
        color: darkMode ? "#f0f0f0" : "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: 1,
        px: 2,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            flexGrow: 1,
          }}
        >
          Loan Calculator
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              size="large"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  backgroundColor: darkMode ? "#2d2d2d" : "#ffffff",
                  color: darkMode ? "#fff" : "#000",
                  mt: 1,
                  borderRadius: 2,
                },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  onClick={handleMenuClose}
                  sx={{
                    "&:hover": {
                      backgroundColor: darkMode
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.05)",
                    },
                  }}
                >
                  {item.label}
                </MenuItem>
              ))}
              <Divider />
              <MenuItem disableRipple>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  }
                  label="Dark Mode"
                />
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box display="flex" alignItems="center" gap={2}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.href}
                color="inherit"
                sx={{
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: "#ffffff26",
                    borderRadius: 1,
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                  size="small"
                />
              }
              label="Dark Mode"
              sx={{ color: "inherit" }}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

import {
  AppBar,
  Box,
  Button,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";

function Header({ darkMode, setDarkMode }) {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }} align="left">
            Loan Calculator
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit">HOME</Button>
            <Button color="inherit">EXCHANGE RATES (LIVE)</Button>
            <Button color="inherit">ABOUT</Button>
            <Button color="inherit">ERROR PAGE</Button>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;

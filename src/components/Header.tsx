import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button variant="text" color="inherit" onClick={handleClick}>
          Agro Dashboard
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

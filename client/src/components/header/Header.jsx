import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { headerWrapperStyle, typographyStyle } from "./headerMaterialStyles";

import "./header.css";

const Header = () => {
  return (
    <AppBar style={headerWrapperStyle} position="relative">
      <div className="header__content header__content--left">
        <Typography style={typographyStyle}>My-chat</Typography>
      </div>
    </AppBar>
  );
};

export default Header;

import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HeaderMenuItem from "./headerMenuItem";

import { headerText } from "../../constants";

import { connect } from "react-redux";
import { isAuth, language } from "../../redux/selectors";

const HeaderMenu = ({ language, auth }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigate = useNavigate();
    const location = useLocation();

    const navigateToHome = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }
    };

    const focusNavigate = () => {
        if (location.pathname !== "/") {
            navigate("/");
        }
        const faqGrid = document.getElementById("faq");
        faqGrid.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <>
            <MenuIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : "undefined"}
                onClick={handleClick}
                className="header__menu--item"
            />
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: 5,
                        border: "1px solid white",
                    },
                }}
                MenuListProps={{
                    style: {
                        borderBottom: "0.1px solid lightgray",
                        arialabelledby: "basic-button",
                    },
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    className="header__menu--mobile"
                >
                    <HeaderMenuItem
                        status="active"
                        text={headerText[language].menuItem1}
                        clickFunc={() => navigateToHome()}
                        size="mobile"
                    />
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    className="header__menu--mobile"
                >
                    <HeaderMenuItem
                        text={headerText[language].menuItem2}
                        clickFunc={() => focusNavigate()}
                        size="mobile"
                    />
                </MenuItem>
                {!auth ? (
                    <MenuItem
                        onClick={handleClose}
                        className="header__menu--mobile"
                    >
                        <HeaderMenuItem
                            text={headerText[language].menuItem3}
                            size="mobile"
                            clickFunc={() => navigate("/signin")}
                        />
                    </MenuItem>
                ) : (
                    <MenuItem
                        onClick={handleClose}
                        className="header__menu--mobile"
                    >
                        <HeaderMenuItem
                            text={headerText[language].menuItem4}
                            size="mobile"
                            clickFunc={() => navigate("/dashboard/account")}
                        />
                    </MenuItem>
                )}
            </Menu>
        </>
    );
};

const mapStateToProps = (state) => ({
    language: language(state),
    auth: isAuth(state),
});

export default connect(mapStateToProps, null)(HeaderMenu);

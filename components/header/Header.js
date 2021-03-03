import React, { useState, useContext } from "react";
import { Moon, Sun } from "@styled-icons/feather";
import Link from "next/link";

import style from "./style";
import SideNavigation from "../sideNavigation/SideNavigation";
import { ThemeContext } from "../themeProvider/ThemeProvider";
import Burger from "../burger/Burger";
import DropDown from "../dropDown/DropDown";

const Header = ({ className, title = "xxxx-buddy.io", items = {} }) => {
  const [state, setState] = useState(false);
  const { colorMode, setColorMode } = useContext(ThemeContext);

  return (
    <div className={className}>
      <div className={"menu"}>
        <div className={"title"}>{title}</div>
        <div className={"menu-items"}>
          {Object.entries(items).map(([title, value], key) => {
            return value.hasOwnProperty("subItems") ? (
              <DropDown label={title} value={value} />
            ) : (
              <Link key={key} href={value.href}>
                <a>{title}</a>
              </Link>
            );
          })}
        </div>
        <div className={"settings"}>
          {colorMode === "light" ? (
            <Sun onClick={() => setColorMode()} size={24} />
          ) : (
            <Moon onClick={() => setColorMode()} size={24} />
          )}
        </div>
        <div className={"hamburger"} onClick={() => setState(!state)}>
          <Burger opened={state} />
        </div>
        <SideNavigation opened={state} setState={setState} items={items} />
      </div>
    </div>
  );
};

export default style(Header);

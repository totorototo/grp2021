import React, { useContext } from "react";

import { ThemeContext } from "../themeProvider/ThemeProvider";

import style from "./style";
import { Moon, Sun } from "@styled-icons/feather";
import DropDown from "../dropDown/DropDown";

const SideNavigation = ({ className, opened, setState, items }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  return (
    <div className={`${className} ${opened ? "opened" : "closed"}`}>
      <div className={"side-menu"}>
        {Object.entries(items).map(([title, value], key) => {
          return (
            <a
              className={`${opened ? "opened" : "closed"}`}
              key={key}
              href={`#${title}`}
            >
              {title}
            </a>
          );
        })}
      </div>
      <div className={"command"}>
        {colorMode === "light" ? (
          <Sun onClick={() => setColorMode()} size={24} />
        ) : (
          <Moon onClick={() => setColorMode()} size={24} />
        )}
      </div>
    </div>
  );
};

export default style(SideNavigation);

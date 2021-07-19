import React, { useContext } from "react";

import { ThemeContext } from "../../technical/themeProvider/ThemeProvider";

import style from "./style";
import { Moon, Sun } from "@styled-icons/feather";
import Link from "next/link";

const SideNavigation = ({ className, opened, setState, items }) => {
  const { colorMode, setColorMode } = useContext(ThemeContext);

  return (
    <div className={`${className} ${opened ? "opened" : "closed"}`}>
      <div className={"side-menu"}>
        {Object.entries(items).map(([title, value], key) => {
          return (
            <Link key={key} href={value.href}>
              <a onClick={() => setState(false)}>{title}</a>
            </Link>
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

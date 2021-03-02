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
      {/*<div className={"wave-wrapper"}>*/}
      {/*  <svg viewBox="0 0 1440 74" className="wave">*/}
      {/*    <path d="M0,40L60,10L120,80L180,50L240,0L300,70L360,70L420,70L480,80L540,20L600,0L660,70L720,90L780,0L840,10L900,20L960,40L1020,30L1080,0L1140,30L1200,70L1260,60L1320,60L1380,0L1440,50L1440,100L1380,100L1320,100L1260,100L1200,100L1140,100L1080,100L1020,100L960,100L900,100L840,100L780,100L720,100L660,100L600,100L540,100L480,100L420,100L360,100L300,100L240,100L180,100L120,100L60,100L0,100Z" />*/}
      {/*  </svg>*/}
      {/*</div>*/}
    </div>
  );
};

export default style(Header);

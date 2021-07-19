import React from "react";
//import styled from "styled-components";

import style from "./style";
import { ChevronDown } from "@styled-icons/feather";
import Link from "next/link";

const DropDown = ({ className, label, value }) => {
  return (
    <div className={className}>
      <div className={"label"}>
        {label}
        <ChevronDown size={24} />
      </div>

      <div className={"menu-items-wrapper"}>
        <div className={"menu-items"}>
          {Object.values(value.subItems).some((item) =>
            item.hasOwnProperty("subItems")
          ) ? (
            <div className={"horizontal"}>
              {Object.entries(value.subItems).map(([title, value], key) => {
                return (
                  <div className={"horizontal-items"}>
                    <div>{title}</div>
                    {Object.entries(value.subItems).map(
                      ([title, value], key) => {
                        return (
                          <Link key={key} href={value.href}>
                            <a>{title}</a>
                          </Link>
                        );
                      }
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={"vertical"}>
              {Object.entries(value.subItems).map(([title, value], key) => {
                return (
                  <Link key={key} href={value.href}>
                    <a>{title}</a>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default style(DropDown);

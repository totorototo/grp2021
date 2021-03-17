import { LinearGradient } from "@vx/gradient";
import React from "react";

const Gradient = ({
  from = "#F4A301",
  to = "#F4A301",
  toOffset = "10%",
  ...restProps
}) => {
  return (
    <LinearGradient from={from} to={to} toOffset={toOffset} {...restProps} />
  );
};

export default Gradient;

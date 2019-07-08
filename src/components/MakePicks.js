import React from "react";
import ActionButton from "./Styled/ActionButton";
import Footer from "./Styled/Footer";
import chevron from "../img/Chevron.png";

const MakePicks = () => {
  return (
    <Footer>
      <ActionButton>
        <img src={chevron} alt="chevron" />
        Make Your Picks
        <span>5/16</span>
      </ActionButton>
    </Footer>
  );
};

export default MakePicks;

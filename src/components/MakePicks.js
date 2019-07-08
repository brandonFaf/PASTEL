import React from "react";
import ActionButton from "./Styled/ActionButton";
import MakePicksSection from "./Styled/MakePicksSection";
import chevron from "../img/Chevron.png";

const MakePicks = () => {
  return (
    <MakePicksSection>
      <ActionButton>
        <img src={chevron} alt="chevron" />
        Make Your Picks
        <span>5/16</span>
      </ActionButton>
    </MakePicksSection>
  );
};

export default MakePicks;

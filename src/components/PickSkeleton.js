import React from "react";
import { ProgressBar, BarVis, BarHome, PickPage } from "./Styled/Picker";
import styled from "styled-components";
import ActionButton from "./Styled/ActionButton";
import chevron from "../img/Chevron.png";
const PickSkeleton = () => {
  const weekNumbers = new Array(17).fill("1");

  return (
    <PickPage>
      <ActionButton small>
        <img src={chevron} className="down" alt="chevron" />
      </ActionButton>
      <GameContainer>
        {weekNumbers.map(x => (
          <ProgressBar>
            <BarVis percent={100} />
            <BarHome percent={0} />
          </ProgressBar>
        ))}
      </GameContainer>
    </PickPage>
  );
};

// const Container = styled.div`
// display
//   height: 100vh;
// `;
export const GameContainer = styled.div`
  padding: 0 5vw;
`;

export default PickSkeleton;

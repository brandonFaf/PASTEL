import React from "react";

import { WhoPickedContainer, PickGroup, Divider } from "./Styled/WhoPicked";

const WhoPicked = ({ pickedHome, pickedVis }) => {
  return (
    <WhoPickedContainer>
      <PickGroup>I picked VIS</PickGroup>
      <Divider />
      <PickGroup>I picked Home</PickGroup>
    </WhoPickedContainer>
  );
};

export default WhoPicked;

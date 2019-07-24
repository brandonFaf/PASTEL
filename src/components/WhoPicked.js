import React from "react";

import { WhoPickedContainer, PickGroup, Divider } from "./Styled/WhoPicked";
import { animated, useTransition } from "react-spring";

const WhoPicked = ({
  showUsers,
  data: { pickedVisTm = [], pickedHomeTm = [] }
}) => {
  const transitions = useTransition(showUsers, null, {
    from: { opacity: 0, height: "0vh" },
    enter: { opacity: 1, height: "15vh" },
    leave: { opacity: 0, height: "0vh" }
  });
  const meat = (
    <WhoPickedContainer>
      <PickGroup>
        {pickedVisTm.map((name, i) => (
          <div key={i}>{name}</div>
        ))}
      </PickGroup>
      <Divider />
      <PickGroup>
        {pickedHomeTm.map((name, i) => (
          <div key={i}>{name}</div>
        ))}
      </PickGroup>
    </WhoPickedContainer>
  );
  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              {meat}
            </animated.div>
          )
      )}
    </>
  );
};

export default WhoPicked;

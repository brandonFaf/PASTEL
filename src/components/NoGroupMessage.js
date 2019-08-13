import React from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { highlight } from "./Styled/colors";
const NoGroupMessage = () => {
  return (
    <Container>
      <div>
        You are not a part of any groups.
        <br />
        You may <L to="groups/join">Join a Group</L> or{" "}
        <L to="groups/create">Create a Group</L>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
const L = styled(Link)`
  color: ${highlight};
`;
export default NoGroupMessage;

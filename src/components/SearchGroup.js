import React from 'react'
import { GroupName, GroupPhoto } from './Styled/Groups'
import ProfilePhoto from './Styled/ProfilePhoto'
import styled from 'styled-components/macro'
const SearchGroup = ({ group, joinGroup }) => {
  return (
    <Group onClick={() => joinGroup(group, group.private)}>
      <GroupPhoto>
        <ProfilePhoto displayName={group.groupName} />
      </GroupPhoto>
      <GroupName>
        <div>
          {group.groupName}
        </div>
      </GroupName>
      <GroupDetail>
        <div>
          {group.members.length} Members
        </div>
        {group.private
          ? <span role="img" aria-label="private">
              🔐
            </span>
          : <span role="img" aria-label="public">
              🌎
            </span>}
      </GroupDetail>
    </Group>
  )
}

const Group = styled.div`
  display: grid;
  grid-template-areas: ". name" "photo name" "photo details";
  grid-template-columns: 10vw 60vw;
  grid-template-rows: 8px 20px 12px;
  grid-row-gap: 0;
  grid-column-gap: 10px;
`
const GroupDetail = styled.div`
  display: grid;
  grid-area: details;
  font-size: 10px;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 10px;
`

export default SearchGroup

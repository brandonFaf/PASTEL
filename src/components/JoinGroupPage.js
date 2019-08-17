import styled from 'styled-components/macro'
import React, { useState, useEffect } from 'react'
import JoinGroup from './JoinGroup'
import Passcode from './Passcode'
const JoinGroupPage = ({ user, history, setHeader }) => {
  const [joinStage, setJoinStage] = useState(true)
  const [group, setGroup] = useState({})
  const changeStage = g => {
    setJoinStage(!joinStage)
    setGroup(g)
  }
  useEffect(
    () => {
      setHeader('Join A Group')
    },
    [setHeader]
  )
  return (
    <JGP>
      {joinStage
        ? <JoinGroup user={user} history={history} changeStage={changeStage} />
        : <Passcode
            user={user}
            history={history}
            group={group}
            changeStage={changeStage}
          />}
    </JGP>
  )
}
const JGP = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export default JoinGroupPage

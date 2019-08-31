import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useContext
} from 'react';
import {
  loadGames,
  savePick,
  loadPicks,
  getTotalGames
} from '../data/firebaseGameAPI';
import { gamesReducer, gameActions } from '../data/reducers/gamesReducer';
import { PickPage, GameSection } from './Styled/Picker';
import GameContainer from './GameContainer';
import WeekSlider from './Styled/WeekSlider';
import PickSkeleton from './PickSkeleton';
import ActionButton from './Styled/ActionButton';
import chevron from '../img/Chevron.png';
import { animated, useSpring, useTransition } from 'react-spring';
import getCurrentWeek from '../helpers/getCurrentWeek';
import { getWeekScore } from '../data/firebaseUserAPI';
import { UserContext } from '../contexts/UserContext';
import animateScrollTo from 'animated-scroll-to';
import { HeaderGroupName } from './Styled/Header';

const currentWeek = getCurrentWeek();
const Picker = ({ user, history, setHeader }) => {
  const [state, dispatch] = useReducer(gamesReducer, { count: 0, games: {} });
  const [week, setWeek] = useState(getCurrentWeek());
  const { id: userId, displayName } = user;
  const [score, setScore] = useState();
  const { group } = useContext(UserContext);
  const [gameAnimationProps, start] = useSpring(() => ({
    opacity: 0,
    config: {
      duration: 500
    }
  }));
  const allGames = games => {
    if (Array.isArray(games)) {
      return games;
    }
    const { upcoming = [], completed = [], inProgress = [] } = games;
    return [...upcoming, ...completed, ...inProgress];
  };
  useEffect(() => {
    const getGames = async () => {
      const games = await loadGames(week);
      setTimeout(() => {
        dispatch({ type: gameActions.LOAD_GAMES, value: games });
        start({ opacity: 1, config: { duration: 500 } });
      }, 500);
    };
    getGames();
  }, [start, week]);
  useEffect(() => {
    const getPicks = async () => {
      const { userPicks, gamePicks } = await loadPicks(userId, week, group.id);
      setTimeout(() => {
        dispatch({ type: gameActions.USER_PICKS_LOADED, value: userPicks });
        dispatch({ type: gameActions.GAME_PICKS_LOADED, value: gamePicks });
      }, 500);
    };
    const getScores = async () => {
      const s = await getWeekScore(userId, week);
      setScore(s);
    };
    getScores();
    getPicks();
  }, [group, group.groupId, userId, week]);
  const totalGames = getTotalGames(week);
  const getHeaderValue = useCallback(() => {
    return (
      <>
        <div className="header-middle">
          <HeaderGroupName>
            <strong>{group.groupName}</strong>
          </HeaderGroupName>
          <div>
            {week < getCurrentWeek() ? (
              <>
                <span>{`Week ${week} Picks `}</span>
                <span>{`${score} PTS`}</span>
              </>
            ) : (
              `Make Your Picks ${state.count} / ${totalGames}`
            )}
          </div>
        </div>
      </>
    );
  }, [group.groupName, week, score, state.count, totalGames]);

  useEffect(() => {
    setHeader(getHeaderValue);
  }, [week, state.count, setHeader, getHeaderValue]);
  const weekBox = useCallback(
    node => {
      if (node) {
        console.log('here');
        animateScrollTo(((week - 1) * window.innerWidth) / 5, {
          element: node,
          horizontal: true,
          speed: 1
        });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [week]
  );
  const save = (gameId, selected, week) => () => {
    savePick({
      gameId,
      selected,
      userId,
      displayName,
      week,
      groupId: group.id
    });

    dispatch({ type: gameActions.SAVE_PICK, value: { gameId, selected } });
    console.log('save', selected);
  };
  const changeWeek = week => () => {
    setWeek(week);
    start({ opacity: 0, config: { duration: 500 } });
  };
  const weekNumbers = new Array(17).fill('1');
  const close = () => {
    setHeader(group.groupName);
    start({ opacity: 0, config: { duration: 500 } });
    history.push('/');
  };
  const transitions = useTransition(allGames(state.games).length === 0, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 500 }
  });
  return (
    <>
      <PickPage>
        <ActionButton small onClick={close}>
          <img src={chevron} className="down" alt="chevron" />
        </ActionButton>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <PickSkeleton />
              </animated.div>
            )
        )}
        {state.games.upcoming && state.games.upcoming.length > 0 && (
          <GameSection>
            <div className="title">Upcoming</div>
            {state.games.upcoming.map(game => (
              <animated.div style={gameAnimationProps} key={game.id}>
                <GameContainer game={game} save={save} />
              </animated.div>
            ))}
          </GameSection>
        )}
        {state.games.inProgress && state.games.inProgress.length > 0 && (
          <GameSection>
            <div className="title">In Progress</div>
            {state.games.inProgress.map(game => (
              <GameContainer game={game} save={save} key={game.id} />
            ))}
          </GameSection>
        )}
        {state.games.completed && state.games.completed.length > 0 && (
          <GameSection>
            <div className="title">Completed</div>
            {state.games.completed.map(game => (
              <GameContainer game={game} save={save} key={game.id} />
            ))}
          </GameSection>
        )}
      </PickPage>
      {allGames(state.games).length > 0 && (
        <WeekSlider ref={weekBox}>
          {weekNumbers.map((x, i) => {
            let cn = i + 1 === week ? 'active' : '';
            cn += i + 1 === currentWeek ? ' current' : '';
            return (
              <div key={i} className={cn} onClick={changeWeek(i + 1)}>
                <div>{i + 1 === week && 'WEEK'}</div>
                {i + 1}
              </div>
            );
          })}
        </WeekSlider>
      )}
    </>
  );
};

export default Picker;

import React, { createContext } from 'react';
import { loadUser } from '../data/firebaseUserAPI';
import { getGroup } from '../data/firebaseGroupAPI';
import LogRocket from 'logrocket';
export const UserContext = createContext();

export default class UserStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      group: undefined,
      pickCount: 0,
      allGroups: [],
      setUser: this.setUser,
      setPhotoURL: this.setPhotoURL,
      setGroup: this.setGroup,
      setAllGroups: this.setAllGroups,
      setPickCount: this.setPickCount
    };
  }
  setAllGroups = allGroups => {
    this.setState({ allGroups });
  };
  setPickCount = pickCount => {
    this.setState({ pickCount });
  };
  setGroup = group => {
    localStorage.setItem('group', JSON.stringify(group));
    this.setState({ group });
  };

  setPhotoURL = photoURL => {
    if (this.state.user) {
      this.setState(state => {
        const user = { ...state.user, photoURL };
        return { ...state, user };
      });
    }
  };
  setUser = async uid => {
    if (!uid) {
      this.setState({ user: null });
      return;
    }
    const userSnap = await loadUser(uid);
    const user = userSnap.data();
    if (user) {
      user.score = user.score || {};
      user.weekScores = user.weekScores || {};
      user.groups = user.groups || [];
      const savedGroup = localStorage.getItem('group');
      const groupId = savedGroup
        ? JSON.parse(savedGroup).id
        : user.groups
        ? user.groups.sort((a, b) => (a < b ? -1 : 1))[0]
        : '';
      LogRocket.identify(uid, {
        name: user.displayName,
        email: user.email
      });
      let group;
      if (groupId) {
        group = await getGroup(groupId);
      }

      this.setState({ user: { ...user, id: userSnap.id }, group });
    }
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

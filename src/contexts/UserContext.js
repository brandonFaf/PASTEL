import React, { createContext } from 'react';
import { loadUser } from '../data/firebaseUserAPI';
import { getGroup } from '../data/firebaseGroupAPI';
export const UserContext = createContext();

export default class UserStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      group: undefined,
      allGroups: [],
      setUser: this.setUser,
      setPhotoURL: this.setPhotoURL,
      setGroup: this.setGroup,
      setAllGroups: this.setAllGroups
    };
  }
  setAllGroups = allGroups => {
    this.setState({ allGroups });
  };
  setGroup = group => {
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
    const groupId = user.groups
      ? user.groups.sort((a, b) => (a < b ? -1 : 1))[0]
      : '';
    let group;
    if (groupId) {
      group = await getGroup(groupId);
    }

    this.setState({ user: { ...user, id: userSnap.id }, group });
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

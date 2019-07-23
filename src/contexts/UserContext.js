import React, { createContext } from "react";
import { loadUser } from "../data/firebaseUserAPI";
export const UserContext = createContext();

export default class UserStore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      setUser: this.setUser,
      setPhotoURL: this.setPhotoURL
    };
  }
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

    this.setState({ user: { ...user, id: userSnap.id } });
  };

  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

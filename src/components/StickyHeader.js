import React, { Component } from 'react';
import Header from './Header';

export default class StickyHeader extends Component {
  render() {
    return <Header {...this.props} />;
  }
}

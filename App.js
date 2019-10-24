/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import AppContainer from './app/utils/navigator/navigation';
import { useScreens } from 'react-native-screens';

useScreens();

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}
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
import {Provider} from 'mobx-react';
import DriveStore from './app/utils/db/DriveStore';

useScreens();

export default class App extends Component {
  render() {
    return (
      <Provider DriveStore={DriveStore}>
        <AppContainer />
      </Provider>
    );  
  }
}
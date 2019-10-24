import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import DashBoard from '../../components/Dashboard';
import DriveDetails from '../../components/DriveDetails';

const DriveStack = createStackNavigator({
    DriveDetails: {screen: DriveDetails, 
    navigationOptions: {
      header: null
    }}
})

const MainNavigator = createSwitchNavigator({
    Home: {screen: DashBoard},
    DriveDetails: DriveStack,  
  });
  
  const App = createAppContainer(MainNavigator);
  
  export default App;